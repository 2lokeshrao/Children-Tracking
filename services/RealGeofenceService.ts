import * as Location from 'expo-location';
import { supabase } from './SupabaseClient';
import NotificationService from './NotificationService';

interface Geofence {
  id: string;
  name: string;
  type: 'safe' | 'unsafe';
  latitude: number;
  longitude: number;
  radius: number; // in meters
  isActive: boolean;
}

interface GeofenceEvent {
  geofenceId: string;
  geofenceName: string;
  type: 'entered' | 'exited';
  timestamp: Date;
}

class RealGeofenceService {
  private geofences: Map<string, Geofence> = new Map();
  private lastKnownPositions: Map<string, { lat: number; lng: number; inside: Set<string> }> = new Map();

  /**
   * Create a new geofence
   */
  async createGeofence(
    parentId: string,
    deviceId: string,
    name: string,
    type: 'safe' | 'unsafe',
    latitude: number,
    longitude: number,
    radius: number
  ): Promise<Geofence | null> {
    try {
      const { data, error } = await supabase
        .from('geofences')
        .insert({
          parent_id: parentId,
          device_id: deviceId,
          name,
          type,
          coordinates: {
            type: 'Point',
            coordinates: [longitude, latitude],
          },
          radius,
          is_active: true,
        })
        .select()
        .single();

      if (error) {
        console.error('Error creating geofence:', error);
        return null;
      }

      const geofence: Geofence = {
        id: data.id,
        name: data.name,
        type: data.type,
        latitude,
        longitude,
        radius: data.radius,
        isActive: data.is_active,
      };

      this.geofences.set(geofence.id, geofence);
      return geofence;
    } catch (error) {
      console.error('Error in createGeofence:', error);
      return null;
    }
  }

  /**
   * Get all geofences for a device
   */
  async getGeofences(deviceId: string): Promise<Geofence[]> {
    try {
      const { data, error } = await supabase
        .from('geofences')
        .select('*')
        .eq('device_id', deviceId)
        .eq('is_active', true);

      if (error) {
        console.error('Error fetching geofences:', error);
        return [];
      }

      const geofences: Geofence[] = (data || []).map((item: any) => {
        const coords = item.coordinates.coordinates;
        return {
          id: item.id,
          name: item.name,
          type: item.type,
          latitude: coords[1],
          longitude: coords[0],
          radius: item.radius,
          isActive: item.is_active,
        };
      });

      // Update local cache
      geofences.forEach(gf => this.geofences.set(gf.id, gf));

      return geofences;
    } catch (error) {
      console.error('Error in getGeofences:', error);
      return [];
    }
  }

  /**
   * Update geofence
   */
  async updateGeofence(geofenceId: string, updates: Partial<Geofence>): Promise<boolean> {
    try {
      const updateData: any = {};

      if (updates.name) updateData.name = updates.name;
      if (updates.type) updateData.type = updates.type;
      if (updates.radius) updateData.radius = updates.radius;
      if (updates.isActive !== undefined) updateData.is_active = updates.isActive;

      if (updates.latitude && updates.longitude) {
        updateData.coordinates = {
          type: 'Point',
          coordinates: [updates.longitude, updates.latitude],
        };
      }

      const { error } = await supabase
        .from('geofences')
        .update(updateData)
        .eq('id', geofenceId);

      if (error) {
        console.error('Error updating geofence:', error);
        return false;
      }

      // Update local cache
      const existing = this.geofences.get(geofenceId);
      if (existing) {
        this.geofences.set(geofenceId, { ...existing, ...updates });
      }

      return true;
    } catch (error) {
      console.error('Error in updateGeofence:', error);
      return false;
    }
  }

  /**
   * Delete geofence
   */
  async deleteGeofence(geofenceId: string): Promise<boolean> {
    try {
      const { error } = await supabase
        .from('geofences')
        .update({ is_active: false })
        .eq('id', geofenceId);

      if (error) {
        console.error('Error deleting geofence:', error);
        return false;
      }

      this.geofences.delete(geofenceId);
      return true;
    } catch (error) {
      console.error('Error in deleteGeofence:', error);
      return false;
    }
  }

  /**
   * Check if location is inside geofence
   */
  isInsideGeofence(
    latitude: number,
    longitude: number,
    geofence: Geofence
  ): boolean {
    const distance = this.calculateDistance(
      latitude,
      longitude,
      geofence.latitude,
      geofence.longitude
    );

    return distance <= geofence.radius;
  }

  /**
   * Check location against all geofences
   */
  async checkGeofences(
    deviceId: string,
    deviceName: string,
    latitude: number,
    longitude: number
  ): Promise<GeofenceEvent[]> {
    const events: GeofenceEvent[] = [];

    // Get last known position
    const lastPos = this.lastKnownPositions.get(deviceId) || {
      lat: latitude,
      lng: longitude,
      inside: new Set<string>(),
    };

    // Get all geofences for this device
    const geofences = Array.from(this.geofences.values());

    for (const geofence of geofences) {
      const isInside = this.isInsideGeofence(latitude, longitude, geofence);
      const wasInside = lastPos.inside.has(geofence.id);

      // Entered geofence
      if (isInside && !wasInside) {
        events.push({
          geofenceId: geofence.id,
          geofenceName: geofence.name,
          type: 'entered',
          timestamp: new Date(),
        });

        lastPos.inside.add(geofence.id);

        // Send notification
        await NotificationService.sendGeofenceAlert(
          deviceName,
          geofence.name,
          'entered'
        );
      }

      // Exited geofence
      if (!isInside && wasInside) {
        events.push({
          geofenceId: geofence.id,
          geofenceName: geofence.name,
          type: 'exited',
          timestamp: new Date(),
        });

        lastPos.inside.delete(geofence.id);

        // Send notification
        await NotificationService.sendGeofenceAlert(
          deviceName,
          geofence.name,
          'exited'
        );
      }
    }

    // Update last known position
    lastPos.lat = latitude;
    lastPos.lng = longitude;
    this.lastKnownPositions.set(deviceId, lastPos);

    return events;
  }

  /**
   * Calculate distance between two coordinates (Haversine formula)
   */
  private calculateDistance(
    lat1: number,
    lon1: number,
    lat2: number,
    lon2: number
  ): number {
    const R = 6371e3; // Earth's radius in meters
    const φ1 = (lat1 * Math.PI) / 180;
    const φ2 = (lat2 * Math.PI) / 180;
    const Δφ = ((lat2 - lat1) * Math.PI) / 180;
    const Δλ = ((lon2 - lon1) * Math.PI) / 180;

    const a =
      Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
      Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) * Math.sin(Δλ / 2);

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    return R * c; // Distance in meters
  }

  /**
   * Get geofence statistics
   */
  async getGeofenceStats(deviceId: string, days: number = 7): Promise<any> {
    // This would query historical geofence events from database
    // For now, returning mock data
    return {
      totalGeofences: this.geofences.size,
      safeZones: Array.from(this.geofences.values()).filter(g => g.type === 'safe').length,
      unsafeZones: Array.from(this.geofences.values()).filter(g => g.type === 'unsafe').length,
    };
  }
}

export default new RealGeofenceService();
