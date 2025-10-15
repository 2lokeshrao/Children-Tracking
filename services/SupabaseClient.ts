import { createClient } from '@supabase/supabase-js';
import Constants from 'expo-constants';

// Get environment variables
const supabaseUrl = Constants.expoConfig?.extra?.supabaseUrl || process.env.SUPABASE_URL || '';
const supabaseAnonKey = Constants.expoConfig?.extra?.supabaseAnonKey || process.env.SUPABASE_ANON_KEY || '';

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn('⚠️ Supabase credentials not found. Please configure .env file.');
}

// Create Supabase client
export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});

// Database Types
export interface Database {
  public: {
    Tables: {
      users: {
        Row: {
          id: string;
          email: string;
          name: string;
          role: 'parent' | 'child';
          two_factor_enabled: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: Omit<Database['public']['Tables']['users']['Row'], 'id' | 'created_at' | 'updated_at'>;
        Update: Partial<Database['public']['Tables']['users']['Insert']>;
      };
      devices: {
        Row: {
          id: string;
          parent_id: string;
          child_id: string;
          device_name: string;
          link_code: string;
          link_code_expires_at: string;
          is_active: boolean;
          created_at: string;
        };
      };
      locations: {
        Row: {
          id: string;
          device_id: string;
          latitude: number;
          longitude: number;
          accuracy: number;
          timestamp: string;
          created_at: string;
        };
      };
      geofences: {
        Row: {
          id: string;
          parent_id: string;
          device_id: string;
          name: string;
          type: 'safe' | 'unsafe';
          coordinates: any; // GeoJSON
          radius: number;
          is_active: boolean;
          created_at: string;
        };
      };
      sos_alerts: {
        Row: {
          id: string;
          device_id: string;
          child_id: string;
          latitude: number;
          longitude: number;
          timestamp: string;
          is_resolved: boolean;
          created_at: string;
        };
      };
    };
  };
}

export default supabase;
