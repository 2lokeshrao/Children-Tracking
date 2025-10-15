import * as Notifications from 'expo-notifications';
import { Platform } from 'react-native';

// Configure notification handler
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
  }),
});

interface NotificationData {
  type: 'sos' | 'geofence' | 'screen_time' | 'general';
  deviceId?: string;
  message: string;
  data?: any;
}

class NotificationService {
  private expoPushToken: string | null = null;

  /**
   * Initialize notification service and request permissions
   */
  async initialize(): Promise<boolean> {
    try {
      const { status: existingStatus } = await Notifications.getPermissionsAsync();
      let finalStatus = existingStatus;

      if (existingStatus !== 'granted') {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
      }

      if (finalStatus !== 'granted') {
        console.error('Notification permission not granted');
        return false;
      }

      // Get push token for remote notifications
      if (Platform.OS !== 'web') {
        const token = await Notifications.getExpoPushTokenAsync({
          projectId: 'your-project-id', // Replace with your Expo project ID
        });
        this.expoPushToken = token.data;
        console.log('Expo Push Token:', this.expoPushToken);
      }

      // Configure notification channel for Android
      if (Platform.OS === 'android') {
        await Notifications.setNotificationChannelAsync('default', {
          name: 'default',
          importance: Notifications.AndroidImportance.MAX,
          vibrationPattern: [0, 250, 250, 250],
          lightColor: '#FF231F7C',
        });

        // SOS Alert Channel
        await Notifications.setNotificationChannelAsync('sos', {
          name: 'SOS Alerts',
          importance: Notifications.AndroidImportance.MAX,
          vibrationPattern: [0, 500, 250, 500],
          lightColor: '#FF0000',
          sound: 'default',
        });

        // Geofence Alert Channel
        await Notifications.setNotificationChannelAsync('geofence', {
          name: 'Geofence Alerts',
          importance: Notifications.AndroidImportance.HIGH,
          vibrationPattern: [0, 250, 250, 250],
          lightColor: '#FFA500',
        });
      }

      return true;
    } catch (error) {
      console.error('Error initializing notifications:', error);
      return false;
    }
  }

  /**
   * Send local notification
   */
  async sendLocalNotification(notification: NotificationData): Promise<string | null> {
    try {
      const notificationId = await Notifications.scheduleNotificationAsync({
        content: {
          title: this.getNotificationTitle(notification.type),
          body: notification.message,
          data: notification.data || {},
          sound: notification.type === 'sos' ? 'default' : undefined,
          priority: notification.type === 'sos' ? 'high' : 'default',
        },
        trigger: null, // Send immediately
      });

      return notificationId;
    } catch (error) {
      console.error('Error sending local notification:', error);
      return null;
    }
  }

  /**
   * Send SOS alert notification
   */
  async sendSOSAlert(deviceName: string, location: { latitude: number; longitude: number }): Promise<void> {
    await this.sendLocalNotification({
      type: 'sos',
      message: `🚨 EMERGENCY! ${deviceName} has sent an SOS alert from ${location.latitude.toFixed(4)}, ${location.longitude.toFixed(4)}`,
      data: {
        type: 'sos',
        location,
      },
    });
  }

  /**
   * Send geofence alert notification
   */
  async sendGeofenceAlert(deviceName: string, geofenceName: string, type: 'entered' | 'exited'): Promise<void> {
    const action = type === 'entered' ? 'entered' : 'left';
    await this.sendLocalNotification({
      type: 'geofence',
      message: `📍 ${deviceName} has ${action} ${geofenceName}`,
      data: {
        type: 'geofence',
        geofenceName,
        action: type,
      },
    });
  }

  /**
   * Send screen time alert notification
   */
  async sendScreenTimeAlert(deviceName: string, remainingMinutes: number): Promise<void> {
    await this.sendLocalNotification({
      type: 'screen_time',
      message: `⏰ ${deviceName} has ${remainingMinutes} minutes of screen time remaining`,
      data: {
        type: 'screen_time',
        remainingMinutes,
      },
    });
  }

  /**
   * Cancel all notifications
   */
  async cancelAllNotifications(): Promise<void> {
    await Notifications.cancelAllScheduledNotificationsAsync();
  }

  /**
   * Cancel specific notification
   */
  async cancelNotification(notificationId: string): Promise<void> {
    await Notifications.cancelScheduledNotificationAsync(notificationId);
  }

  /**
   * Get notification title based on type
   */
  private getNotificationTitle(type: NotificationData['type']): string {
    switch (type) {
      case 'sos':
        return '🚨 SOS ALERT';
      case 'geofence':
        return '📍 Geofence Alert';
      case 'screen_time':
        return '⏰ Screen Time Alert';
      default:
        return 'Guardian View';
    }
  }

  /**
   * Get push token
   */
  getPushToken(): string | null {
    return this.expoPushToken;
  }

  /**
   * Add notification received listener
   */
  addNotificationReceivedListener(callback: (notification: Notifications.Notification) => void) {
    return Notifications.addNotificationReceivedListener(callback);
  }

  /**
   * Add notification response listener (when user taps notification)
   */
  addNotificationResponseListener(callback: (response: Notifications.NotificationResponse) => void) {
    return Notifications.addNotificationResponseReceivedListener(callback);
  }
}

export default new NotificationService();
