# Database Setup Guide

## Supabase Database Schema

### 1. Create Tables

Run these SQL commands in your Supabase SQL Editor:

```sql
-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Users table
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  email TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  role TEXT NOT NULL CHECK (role IN ('parent', 'child')),
  two_factor_enabled BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Devices table
CREATE TABLE devices (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  parent_id UUID REFERENCES users(id) ON DELETE CASCADE,
  child_id UUID REFERENCES users(id) ON DELETE CASCADE,
  device_name TEXT NOT NULL,
  link_code TEXT,
  link_code_expires_at TIMESTAMP WITH TIME ZONE,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Locations table
CREATE TABLE locations (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  device_id UUID REFERENCES devices(id) ON DELETE CASCADE,
  latitude DOUBLE PRECISION NOT NULL,
  longitude DOUBLE PRECISION NOT NULL,
  accuracy DOUBLE PRECISION,
  timestamp TIMESTAMP WITH TIME ZONE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Geofences table
CREATE TABLE geofences (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  parent_id UUID REFERENCES users(id) ON DELETE CASCADE,
  device_id UUID REFERENCES devices(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  type TEXT NOT NULL CHECK (type IN ('safe', 'unsafe')),
  coordinates JSONB NOT NULL,
  radius DOUBLE PRECISION NOT NULL,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- SOS Alerts table
CREATE TABLE sos_alerts (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  device_id UUID REFERENCES devices(id) ON DELETE CASCADE,
  child_id UUID REFERENCES users(id) ON DELETE CASCADE,
  latitude DOUBLE PRECISION NOT NULL,
  longitude DOUBLE PRECISION NOT NULL,
  timestamp TIMESTAMP WITH TIME ZONE NOT NULL,
  is_resolved BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Screen Time table
CREATE TABLE screen_time_limits (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  device_id UUID REFERENCES devices(id) ON DELETE CASCADE,
  daily_limit_minutes INTEGER NOT NULL,
  block_start_time TIME,
  block_end_time TIME,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- App Usage table
CREATE TABLE app_usage (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  device_id UUID REFERENCES devices(id) ON DELETE CASCADE,
  app_name TEXT NOT NULL,
  package_name TEXT NOT NULL,
  usage_minutes INTEGER NOT NULL,
  date DATE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

### 2. Create Indexes

```sql
-- Indexes for better query performance
CREATE INDEX idx_locations_device_timestamp ON locations(device_id, timestamp DESC);
CREATE INDEX idx_devices_parent ON devices(parent_id);
CREATE INDEX idx_devices_child ON devices(child_id);
CREATE INDEX idx_geofences_device ON geofences(device_id);
CREATE INDEX idx_sos_alerts_device ON sos_alerts(device_id);
CREATE INDEX idx_app_usage_device_date ON app_usage(device_id, date DESC);
```

### 3. Enable Row Level Security (RLS)

```sql
-- Enable RLS on all tables
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE devices ENABLE ROW LEVEL SECURITY;
ALTER TABLE locations ENABLE ROW LEVEL SECURITY;
ALTER TABLE geofences ENABLE ROW LEVEL SECURITY;
ALTER TABLE sos_alerts ENABLE ROW LEVEL SECURITY;
ALTER TABLE screen_time_limits ENABLE ROW LEVEL SECURITY;
ALTER TABLE app_usage ENABLE ROW LEVEL SECURITY;

-- Users can read their own data
CREATE POLICY "Users can read own data" ON users
  FOR SELECT USING (auth.uid() = id);

-- Parents can read their linked devices
CREATE POLICY "Parents can read their devices" ON devices
  FOR SELECT USING (auth.uid() = parent_id);

-- Children can read devices they're linked to
CREATE POLICY "Children can read their devices" ON devices
  FOR SELECT USING (auth.uid() = child_id);

-- Parents can read locations of their devices
CREATE POLICY "Parents can read device locations" ON locations
  FOR SELECT USING (
    device_id IN (
      SELECT id FROM devices WHERE parent_id = auth.uid()
    )
  );

-- Parents can manage geofences
CREATE POLICY "Parents can manage geofences" ON geofences
  FOR ALL USING (parent_id = auth.uid());

-- Parents can read SOS alerts
CREATE POLICY "Parents can read SOS alerts" ON sos_alerts
  FOR SELECT USING (
    device_id IN (
      SELECT id FROM devices WHERE parent_id = auth.uid()
    )
  );

-- Children can create SOS alerts
CREATE POLICY "Children can create SOS alerts" ON sos_alerts
  FOR INSERT WITH CHECK (child_id = auth.uid());
```

### 4. Create Real-time Subscriptions

```sql
-- Enable real-time for critical tables
ALTER PUBLICATION supabase_realtime ADD TABLE locations;
ALTER PUBLICATION supabase_realtime ADD TABLE sos_alerts;
ALTER PUBLICATION supabase_realtime ADD TABLE geofences;
```

### 5. Create Functions

```sql
-- Function to generate link code
CREATE OR REPLACE FUNCTION generate_link_code()
RETURNS TEXT AS $$
DECLARE
  code TEXT;
BEGIN
  code := LPAD(FLOOR(RANDOM() * 1000000)::TEXT, 6, '0');
  RETURN code;
END;
$$ LANGUAGE plpgsql;

-- Function to clean old locations (keep last 7 days)
CREATE OR REPLACE FUNCTION cleanup_old_locations()
RETURNS void AS $$
BEGIN
  DELETE FROM locations 
  WHERE created_at < NOW() - INTERVAL '7 days';
END;
$$ LANGUAGE plpgsql;

-- Schedule cleanup (run daily)
SELECT cron.schedule(
  'cleanup-old-locations',
  '0 2 * * *', -- Run at 2 AM daily
  'SELECT cleanup_old_locations();'
);
```

## Environment Setup

1. Create `.env` file in project root:

```env
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_ANON_KEY=your-anon-key-here
```

2. Update `app.json`:

```json
{
  "expo": {
    "extra": {
      "supabaseUrl": "https://your-project.supabase.co",
      "supabaseAnonKey": "your-anon-key-here"
    }
  }
}
```

## Testing the Setup

Run these queries to verify:

```sql
-- Check tables
SELECT table_name FROM information_schema.tables 
WHERE table_schema = 'public';

-- Check RLS policies
SELECT tablename, policyname FROM pg_policies;

-- Test insert
INSERT INTO users (email, name, role) 
VALUES ('test@example.com', 'Test User', 'parent');
```

## Next Steps

1. ✅ Create Supabase project
2. ✅ Run SQL commands above
3. ✅ Get API keys from Supabase dashboard
4. ✅ Update `.env` file
5. ✅ Test authentication
6. ✅ Test location tracking
