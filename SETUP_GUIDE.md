# Complete Setup Guide - Children Tracking App

## 📋 Prerequisites

- Node.js 18+ installed
- npm or yarn
- Expo CLI
- Supabase account
- Android Studio (for Android) or Xcode (for iOS)

## 🚀 Step-by-Step Setup

### 1. Clone & Install Dependencies

```bash
git clone https://github.com/2lokeshrao/Children-Tracking.git
cd Children-Tracking
npm install
```

### 2. Install Missing Packages

```bash
# Core location & notifications
npm install expo-location expo-task-manager expo-notifications

# Maps
npm install react-native-maps

# Security & Storage
npm install expo-crypto expo-secure-store @react-native-async-storage/async-storage

# State Management
npm install zustand

# Environment Variables
npm install react-native-dotenv

# Audio (optional - for future feature)
npm install expo-av
```

### 3. Setup Supabase

1. Go to [supabase.com](https://supabase.com)
2. Create new project
3. Go to Settings > API
4. Copy your `URL` and `anon/public` key

### 4. Configure Environment

Create `.env` file:

```env
SUPABASE_URL=https://xxxxx.supabase.co
SUPABASE_ANON_KEY=your-anon-key-here
```

Update `app.json`:

```json
{
  "expo": {
    "name": "Guardian View",
    "slug": "guardian-view",
    "extra": {
      "supabaseUrl": "https://xxxxx.supabase.co",
      "supabaseAnonKey": "your-anon-key-here"
    },
    "android": {
      "permissions": [
        "ACCESS_FINE_LOCATION",
        "ACCESS_COARSE_LOCATION",
        "ACCESS_BACKGROUND_LOCATION",
        "FOREGROUND_SERVICE",
        "POST_NOTIFICATIONS"
      ]
    },
    "ios": {
      "infoPlist": {
        "NSLocationWhenInUseUsageDescription": "We need your location to keep you safe",
        "NSLocationAlwaysAndWhenInUseUsageDescription": "We need your location to track you for safety",
        "UIBackgroundModes": ["location"]
      }
    }
  }
}
```

### 5. Setup Database

Follow instructions in `DATABASE_SETUP.md`:

1. Open Supabase SQL Editor
2. Run all SQL commands from the file
3. Verify tables are created

### 6. Update Package.json Scripts

Add to `package.json`:

```json
{
  "scripts": {
    "start": "expo start",
    "android": "expo start --android",
    "ios": "expo start --ios",
    "web": "expo start --web",
    "prebuild": "expo prebuild",
    "build:android": "eas build --platform android",
    "build:ios": "eas build --platform ios"
  }
}
```

### 7. Configure Babel

Update `babel.config.js`:

```javascript
module.exports = function(api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      ['module:react-native-dotenv', {
        moduleName: '@env',
        path: '.env',
      }],
    ],
  };
};
```

### 8. Run the App

```bash
# Start development server
npm start

# Run on Android
npm run android

# Run on iOS
npm run ios
```

## 🔧 Configuration Checklist

- [ ] Supabase project created
- [ ] Database tables created
- [ ] Environment variables configured
- [ ] Permissions added to app.json
- [ ] Dependencies installed
- [ ] App runs without errors

## 📱 Testing

### Test Location Tracking

1. Open parent app
2. Create account
3. Generate link code
4. Open child app
5. Enter link code
6. Grant location permissions
7. Check dashboard for location updates

### Test Geofencing

1. Create a geofence on map
2. Move device in/out of zone
3. Check for notifications

### Test SOS

1. Open child app
2. Press SOS button
3. Check parent receives alert

## 🐛 Common Issues

### Issue: "Supabase credentials not found"
**Solution**: Check `.env` file and `app.json` configuration

### Issue: "Location permission denied"
**Solution**: Go to device settings and grant location permissions

### Issue: "Notifications not working"
**Solution**: Grant notification permissions in device settings

### Issue: "Maps not showing"
**Solution**: 
- Android: Add Google Maps API key
- iOS: Maps work by default

### Issue: "Background tracking not working"
**Solution**: 
- Android: Disable battery optimization
- iOS: Enable "Always" location permission

## 📚 Additional Resources

- [Expo Location Docs](https://docs.expo.dev/versions/latest/sdk/location/)
- [Supabase Docs](https://supabase.com/docs)
- [React Native Maps](https://github.com/react-native-maps/react-native-maps)

## 🔐 Security Notes

1. Never commit `.env` file to git
2. Use environment variables for all secrets
3. Enable RLS on Supabase tables
4. Implement proper authentication
5. Encrypt sensitive data

## 📝 Next Steps

1. ✅ Complete setup
2. ✅ Test all features
3. ⏳ Add custom branding
4. ⏳ Implement analytics
5. ⏳ Add more features
6. ⏳ Deploy to app stores

## 🆘 Support

For issues, create a GitHub issue or contact the maintainer.
