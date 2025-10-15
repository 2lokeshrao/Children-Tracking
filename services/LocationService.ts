import { Location } from '../types';

class LocationService {
  private locationHistory: Map<string, Location[]> = new Map();

  async getCurrentLocation(deviceId: string): Promise<Location> {
    // Simulate getting current location
    const location: Location = {
      latitude: 37.7749 + (Math.random() - 0.5) * 0.1,
      longitude: -122.4194 + (Math.random() - 0.5) * 0.1,
      timestamp: new Date(),
      accuracy: 10 + Math.random() * 20,
    };
    
    this.addToHistory(deviceId, location);
    return location;
  }

  async getLocationHistory(deviceId: string, hours: number = 24): Promise<Location[]> {
    const history = this.locationHistory.get(deviceId) || [];
    const cutoff = new Date(Date.now() - hours * 60 * 60 * 1000);
    return history.filter(loc => loc.timestamp >= cutoff);
  }

  private addToHistory(deviceId: string, location: Location): void {
    const history = this.locationHistory.get(deviceId) || [];
    history.push(location);
    
    // Keep only last 100 locations
    if (history.length > 100) {
      history.shift();
    }
    
    this.locationHistory.set(deviceId, history);
  }

  async startTracking(deviceId: string): Promise<void> {
    // Start location tracking
    console.log(`Started tracking device: ${deviceId}`);
  }

  async stopTracking(deviceId: string): Promise<void> {
    console.log(`Stopped tracking device: ${deviceId}`);
  }
}

export default new LocationService();
