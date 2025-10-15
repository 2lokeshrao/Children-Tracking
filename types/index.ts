export interface User {
  id: string;
  email: string;
  name: string;
  role: 'parent' | 'child';
  twoFactorEnabled?: boolean;
  createdAt: Date;
}

export interface ChildDevice {
  id: string;
  childName: string;
  deviceId: string;
  linkedAt: Date;
  lastLocation?: Location;
  isOnline: boolean;
  batteryLevel?: number;
  avatar?: string;
  consentGiven: boolean;
}

export interface Location {
  latitude: number;
  longitude: number;
  timestamp: Date;
  accuracy?: number;
}

export interface Geofence {
  id: string;
  name: string;
  type: 'safe' | 'unsafe';
  latitude: number;
  longitude: number;
  radius: number;
  alertOnEntry: boolean;
  alertOnExit: boolean;
}

export interface AppUsage {
  appName: string;
  packageName: string;
  timeSpent: number;
  lastUsed: Date;
  icon?: string;
}

export interface ScreenTimeLimit {
  dailyLimit: number;
  blockTimes: BlockTime[];
  appRestrictions: AppRestriction[];
}

export interface BlockTime {
  id: string;
  name: string;
  startTime: string;
  endTime: string;
  days: number[];
}

export interface AppRestriction {
  packageName: string;
  appName: string;
  timeLimit?: number;
  blocked: boolean;
}

export interface SOSAlert {
  id: string;
  childDeviceId: string;
  location: Location;
  timestamp: Date;
  acknowledged: boolean;
}
