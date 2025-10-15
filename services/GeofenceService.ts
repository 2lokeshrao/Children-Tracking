import { Geofence, Location } from '../types';

class GeofenceService {
  private geofences: Map<string, Geofence[]> = new Map();

  async createGeofence(parentId: string, geofence: Omit<Geofence, 'id'>): Promise<Geofence> {
    const newGeofence: Geofence = {
      ...geofence,
      id: Math.random().toString(36).substr(2, 9),
    };
    
    const fences = this.geofences.get(parentId) || [];
    fences.push(newGeofence);
    this.geofences.set(parentId, fences);
    
    return newGeofence;
  }

  getGeofences(parentId: string): Geofence[] {
    return this.geofences.get(parentId) || [];
  }

  async updateGeofence(parentId: string, geofenceId: string, updates: Partial<Geofence>): Promise<Geofence> {
    const fences = this.geofences.get(parentId) || [];
    const index = fences.findIndex(f => f.id === geofenceId);
    
    if (index === -1) throw new Error('Geofence not found');
    
    fences[index] = { ...fences[index], ...updates };
    this.geofences.set(parentId, fences);
    
    return fences[index];
  }

  async deleteGeofence(parentId: string, geofenceId: string): Promise<void> {
    const fences = this.geofences.get(parentId) || [];
    const filtered = fences.filter(f => f.id !== geofenceId);
    this.geofences.set(parentId, filtered);
  }

  checkGeofenceViolation(location: Location, geofence: Geofence): boolean {
    const distance = this.calculateDistance(
      location.latitude,
      location.longitude,
      geofence.latitude,
      geofence.longitude
    );
    
    return distance <= geofence.radius;
  }

  private calculateDistance(lat1: number, lon1: number, lat2: number, lon2: number): number {
    const R = 6371e3; // Earth radius in meters
    const φ1 = lat1 * Math.PI / 180;
    const φ2 = lat2 * Math.PI / 180;
    const Δφ = (lat2 - lat1) * Math.PI / 180;
    const Δλ = (lon2 - lon1) * Math.PI / 180;

    const a = Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
              Math.cos(φ1) * Math.cos(φ2) *
              Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    return R * c;
  }
}

export default new GeofenceService();
