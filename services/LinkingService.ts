import { ChildDevice } from '../types';

class LinkingService {
  private linkingCodes: Map<string, { parentId: string; expiresAt: Date }> = new Map();
  private linkedDevices: Map<string, ChildDevice[]> = new Map();

  generateLinkingCode(parentId: string): { code: string; qrData: string } {
    const code = Math.floor(100000 + Math.random() * 900000).toString();
    const expiresAt = new Date(Date.now() + 15 * 60 * 1000); // 15 minutes
    
    this.linkingCodes.set(code, { parentId, expiresAt });
    
    const qrData = JSON.stringify({
      code,
      parentId,
      appType: 'guardian-view',
      version: '1.0.0',
    });
    
    return { code, qrData };
  }

  async linkDevice(code: string, childName: string, deviceId: string): Promise<ChildDevice> {
    const linkData = this.linkingCodes.get(code);
    
    if (!linkData) {
      throw new Error('Invalid linking code');
    }
    
    if (linkData.expiresAt < new Date()) {
      this.linkingCodes.delete(code);
      throw new Error('Linking code expired');
    }
    
    const device: ChildDevice = {
      id: Math.random().toString(36).substr(2, 9),
      childName,
      deviceId,
      linkedAt: new Date(),
      isOnline: true,
      batteryLevel: 85,
      consentGiven: true,
      avatar: undefined,
    };
    
    const devices = this.linkedDevices.get(linkData.parentId) || [];
    devices.push(device);
    this.linkedDevices.set(linkData.parentId, devices);
    
    this.linkingCodes.delete(code);
    
    return device;
  }

  getLinkedDevices(parentId: string): ChildDevice[] {
    return this.linkedDevices.get(parentId) || [];
  }

  async unlinkDevice(parentId: string, deviceId: string): Promise<void> {
    const devices = this.linkedDevices.get(parentId) || [];
    const filtered = devices.filter(d => d.id !== deviceId);
    this.linkedDevices.set(parentId, filtered);
  }
}

export default new LinkingService();
