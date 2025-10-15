import * as SecureStore from 'expo-secure-store';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Platform } from 'react-native';

/**
 * Secure Storage Service
 * Uses expo-secure-store for sensitive data (iOS Keychain, Android Keystore)
 * Falls back to AsyncStorage for non-sensitive data or web platform
 */
class SecureStorageService {
  /**
   * Save data securely
   */
  async saveSecure(key: string, value: string): Promise<boolean> {
    try {
      if (Platform.OS === 'web') {
        // Web doesn't support SecureStore, use AsyncStorage
        await AsyncStorage.setItem(key, value);
      } else {
        await SecureStore.setItemAsync(key, value);
      }
      return true;
    } catch (error) {
      console.error(`Error saving secure data for key ${key}:`, error);
      return false;
    }
  }

  /**
   * Get secure data
   */
  async getSecure(key: string): Promise<string | null> {
    try {
      if (Platform.OS === 'web') {
        return await AsyncStorage.getItem(key);
      } else {
        return await SecureStore.getItemAsync(key);
      }
    } catch (error) {
      console.error(`Error getting secure data for key ${key}:`, error);
      return null;
    }
  }

  /**
   * Delete secure data
   */
  async deleteSecure(key: string): Promise<boolean> {
    try {
      if (Platform.OS === 'web') {
        await AsyncStorage.removeItem(key);
      } else {
        await SecureStore.deleteItemAsync(key);
      }
      return true;
    } catch (error) {
      console.error(`Error deleting secure data for key ${key}:`, error);
      return false;
    }
  }

  /**
   * Save auth token
   */
  async saveAuthToken(token: string): Promise<boolean> {
    return await this.saveSecure('auth_token', token);
  }

  /**
   * Get auth token
   */
  async getAuthToken(): Promise<string | null> {
    return await this.getSecure('auth_token');
  }

  /**
   * Delete auth token
   */
  async deleteAuthToken(): Promise<boolean> {
    return await this.deleteSecure('auth_token');
  }

  /**
   * Save user data
   */
  async saveUserData(userData: any): Promise<boolean> {
    return await this.saveSecure('user_data', JSON.stringify(userData));
  }

  /**
   * Get user data
   */
  async getUserData(): Promise<any | null> {
    const data = await this.getSecure('user_data');
    if (data) {
      try {
        return JSON.parse(data);
      } catch (error) {
        console.error('Error parsing user data:', error);
        return null;
      }
    }
    return null;
  }

  /**
   * Delete user data
   */
  async deleteUserData(): Promise<boolean> {
    return await this.deleteSecure('user_data');
  }

  /**
   * Save device ID
   */
  async saveDeviceId(deviceId: string): Promise<boolean> {
    return await this.saveSecure('device_id', deviceId);
  }

  /**
   * Get device ID
   */
  async getDeviceId(): Promise<string | null> {
    return await this.getSecure('device_id');
  }

  /**
   * Clear all secure data
   */
  async clearAll(): Promise<boolean> {
    try {
      await this.deleteAuthToken();
      await this.deleteUserData();
      await this.deleteSecure('device_id');
      return true;
    } catch (error) {
      console.error('Error clearing all secure data:', error);
      return false;
    }
  }

  /**
   * Save non-sensitive data (uses AsyncStorage)
   */
  async save(key: string, value: string): Promise<boolean> {
    try {
      await AsyncStorage.setItem(key, value);
      return true;
    } catch (error) {
      console.error(`Error saving data for key ${key}:`, error);
      return false;
    }
  }

  /**
   * Get non-sensitive data
   */
  async get(key: string): Promise<string | null> {
    try {
      return await AsyncStorage.getItem(key);
    } catch (error) {
      console.error(`Error getting data for key ${key}:`, error);
      return null;
    }
  }

  /**
   * Delete non-sensitive data
   */
  async delete(key: string): Promise<boolean> {
    try {
      await AsyncStorage.removeItem(key);
      return true;
    } catch (error) {
      console.error(`Error deleting data for key ${key}:`, error);
      return false;
    }
  }
}

export default new SecureStorageService();
