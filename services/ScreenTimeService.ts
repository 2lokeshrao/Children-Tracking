import { ScreenTimeLimit, BlockTime, AppRestriction, AppUsage } from '../types';

class ScreenTimeService {
  private limits: Map<string, ScreenTimeLimit> = new Map();
  private usageData: Map<string, AppUsage[]> = new Map();

  async setDailyLimit(deviceId: string, minutes: number): Promise<void> {
    const limit = this.limits.get(deviceId) || { dailyLimit: 0, blockTimes: [], appRestrictions: [] };
    limit.dailyLimit = minutes;
    this.limits.set(deviceId, limit);
  }

  async addBlockTime(deviceId: string, blockTime: Omit<BlockTime, 'id'>): Promise<BlockTime> {
    const limit = this.limits.get(deviceId) || { dailyLimit: 0, blockTimes: [], appRestrictions: [] };
    const newBlock: BlockTime = {
      ...blockTime,
      id: Math.random().toString(36).substr(2, 9),
    };
    limit.blockTimes.push(newBlock);
    this.limits.set(deviceId, limit);
    return newBlock;
  }

  async setAppRestriction(deviceId: string, restriction: AppRestriction): Promise<void> {
    const limit = this.limits.get(deviceId) || { dailyLimit: 0, blockTimes: [], appRestrictions: [] };
    const index = limit.appRestrictions.findIndex(r => r.packageName === restriction.packageName);
    
    if (index >= 0) {
      limit.appRestrictions[index] = restriction;
    } else {
      limit.appRestrictions.push(restriction);
    }
    
    this.limits.set(deviceId, limit);
  }

  getScreenTimeLimit(deviceId: string): ScreenTimeLimit {
    return this.limits.get(deviceId) || { dailyLimit: 0, blockTimes: [], appRestrictions: [] };
  }

  async getAppUsage(deviceId: string, days: number = 1): Promise<AppUsage[]> {
    return this.usageData.get(deviceId) || this.generateMockUsage();
  }

  private generateMockUsage(): AppUsage[] {
    const apps = ['Instagram', 'TikTok', 'YouTube', 'WhatsApp', 'Snapchat', 'Chrome', 'Games', 'Netflix'];
    return apps.map(app => ({
      appName: app,
      packageName: `com.${app.toLowerCase()}`,
      timeSpent: Math.floor(Math.random() * 180),
      lastUsed: new Date(Date.now() - Math.random() * 86400000),
    }));
  }
}

export default new ScreenTimeService();
