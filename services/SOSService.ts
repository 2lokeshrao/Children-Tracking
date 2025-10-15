import { SOSAlert, Location } from '../types';

class SOSService {
  private alerts: Map<string, SOSAlert[]> = new Map();
  private listeners: Map<string, (alert: SOSAlert) => void> = new Map();

  async sendSOSAlert(childDeviceId: string, location: Location): Promise<SOSAlert> {
    const alert: SOSAlert = {
      id: Math.random().toString(36).substr(2, 9),
      childDeviceId,
      location,
      timestamp: new Date(),
      acknowledged: false,
    };
    
    const deviceAlerts = this.alerts.get(childDeviceId) || [];
    deviceAlerts.push(alert);
    this.alerts.set(childDeviceId, deviceAlerts);
    
    // Notify all listeners
    this.listeners.forEach(listener => listener(alert));
    
    return alert;
  }

  getAlerts(parentId: string): SOSAlert[] {
    const allAlerts: SOSAlert[] = [];
    this.alerts.forEach(alerts => allAlerts.push(...alerts));
    return allAlerts.sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime());
  }

  async acknowledgeAlert(alertId: string): Promise<void> {
    this.alerts.forEach(alerts => {
      const alert = alerts.find(a => a.id === alertId);
      if (alert) alert.acknowledged = true;
    });
  }

  subscribeToAlerts(parentId: string, callback: (alert: SOSAlert) => void): () => void {
    this.listeners.set(parentId, callback);
    return () => this.listeners.delete(parentId);
  }
}

export default new SOSService();
