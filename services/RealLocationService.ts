import * as Location from 'expo-location';
import * as TaskManager from 'expo-task-manager';
import { supabase } from './SupabaseClient';

const LOCATION_TASK_NAME = 'background-location-task';

interface LocationData {
  latitude: number;
  longitude: number;
  accuracy: number;
  timestamp: Date;
}

class RealLocationService {
  private isTracking: boolean = false;
  private locationSubscription: Location.LocationSubscription | null = null;

  /**
   * Request location permissions
   */
  async requestPermissions(): Promise<boolean> {
    try {
      const { status: foregroundStatus } = await Location.requestForegroundPermissionsAsync();
      
      if (foregroundStatus !== 'granted') {
        console.error('Foreground location permission denied');
        return false;
      }

      const { status: backgroundStatus } = await Location.requestBackgroundPermissionsAsync();
      
      if (backgroundStatus !== 'granted') {
        console.warn('Background location permission denied');
        // Still return true as foreground is granted
      }

      return true;
    } catch (error) {
      console.error('Error requesting location permissions:', error);
      return false;
    }
  }

  /**
   * Get current location
   */
  async getCurrentLocation(): Promise<LocationData | null> {
    try {
      const hasPermission = await this.requestPermissions();
      if (!hasPermission) {
        throw new Error('Location permission not granted');
      }

      const location = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.High,
      });

      return {
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        accuracy: location.coords.accuracy || 0,
        timestamp: new Date(location.timestamp),
      };
    } catch (error) {
      console.error('Error getting current location:', error);
      return null;
    }
  }

  /**
   * Start foreground location tracking
   */
  async startForegroundTracking(deviceId: string, callback: (location: LocationData) => void): Promise<boolean> {
    try {
      const hasPermission = await this.requestPermissions();
      if (!hasPermission) {
        return false;
      }

      this.locationSubscription = await Location.watchPositionAsync(
        {
          accuracy: Location.Accuracy.High,
          timeInterval: 30000, // Update every 30 seconds
          distanceInterval: 50, // Update every 50 meters
        },
        (location) => {
          const locationData: LocationData = {
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
            accuracy: location.coords.accuracy || 0,
            timestamp: new Date(location.timestamp),
          };

          callback(locationData);
          this.saveLocationToDatabase(deviceId, locationData);
        }
      );

      this.isTracking = true;
      return true;
    } catch (error) {
      console.error('Error starting foreground tracking:', error);
      return false;
    }
  }

  /**
   * Start background location tracking
   */
  async startBackgroundTracking(deviceId: string): Promise<boolean> {
    try {
      const hasPermission = await this.requestPermissions();
      if (!hasPermission) {
        return false;
      }

      // Define background task
      TaskManager.defineTask(LOCATION_TASK_NAME, async ({ data, error }) => {
        if (error) {
          console.error('Background location task error:', error);
          return;
        }

        if (data) {
          const { locations } = data as any;
          const location = locations[0];

          if (location) {
            const locationData: LocationData = {
              latitude: location.coords.latitude,
              longitude: location.coords.longitude,
              accuracy: location.coords.accuracy || 0,
              timestamp: new Date(location.timestamp),
            };

            await this.saveLocationToDatabase(deviceId, locationData);
          }
        }
      });

      // Start background location updates
      await Location.startLocationUpdatesAsync(LOCATION_TASK_NAME, {
        accuracy: Location.Accuracy.Balanced,
        timeInterval: 60000, // Update every 1 minute
        distanceInterval: 100, // Update every 100 meters
        foregroundService: {
          notificationTitle: 'Guardian View',
          notificationBody: 'Tracking location for safety',
        },
      });

      this.isTracking = true;
      return true;
    } catch (error) {
      console.error('Error starting background tracking:', error);
      return false;
    }
  }

  /**
   * Stop location tracking
   */
  async stopTracking(): Promise<void> {
    try {
      // Stop foreground tracking
      if (this.locationSubscription) {
        this.locationSubscription.remove();
        this.locationSubscription = null;
      }

      // Stop background tracking
      const isTaskDefined = await TaskManager.isTaskDefined(LOCATION_TASK_NAME);
      if (isTaskDefined) {
        await Location.stopLocationUpdatesAsync(LOCATION_TASK_NAME);
      }

      this.isTracking = false;
    } catch (error) {
      console.error('Error stopping tracking:', error);
    }
  }

  /**
   * Save location to database
   */
  private async saveLocationToDatabase(deviceId: string, location: LocationData): Promise<void> {
    try {
      const { error } = await supabase.from('locations').insert({
        device_id: deviceId,
        latitude: location.latitude,
        longitude: location.longitude,
        accuracy: location.accuracy,
        timestamp: location.timestamp.toISOString(),
      });

      if (error) {
        console.error('Error saving location to database:', error);
      }
    } catch (error) {
      console.error('Error in saveLocationToDatabase:', error);
    }
  }

  /**
   * Get location history from database
   */
  async getLocationHistory(deviceId: string, hours: number = 24): Promise<LocationData[]> {
    try {
      const cutoffTime = new Date(Date.now() - hours * 60 * 60 * 1000);

      const { data, error } = await supabase
        .from('locations')
        .select('*')
        .eq('device_id', deviceId)
        .gte('timestamp', cutoffTime.toISOString())
        .order('timestamp', { ascending: false })
        .limit(100);

      if (error) {
        console.error('Error fetching location history:', error);
        return [];
      }

      return (data || []).map((loc: any) => ({
        latitude: loc.latitude,
        longitude: loc.longitude,
        accuracy: loc.accuracy,
        timestamp: new Date(loc.timestamp),
      }));
    } catch (error) {
      console.error('Error in getLocationHistory:', error);
      return [];
    }
  }

  /**
   * Check if tracking is active
   */
  isTrackingActive(): boolean {
    return this.isTracking;
  }
}

export default new RealLocationService();
