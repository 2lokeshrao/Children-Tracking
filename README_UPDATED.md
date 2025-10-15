# Guardian View & Family Link - Ethical Parental Monitoring System

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![React Native](https://img.shields.io/badge/React%20Native-0.81.4-blue.svg)](https://reactnative.dev/)
[![Expo](https://img.shields.io/badge/Expo-54.0.2-000020.svg)](https://expo.dev/)

A comprehensive, transparent, and ethical dual-app system for family safety and communication with **real-time location tracking**, **geofencing**, and **emergency alerts**.

## 🎉 What's New - Latest Updates

### ✅ **Major Improvements Implemented**

1. **Real Location Tracking** - Actual GPS tracking with expo-location
2. **Background Tracking** - Works even when app is closed
3. **Push Notifications** - SOS alerts, geofence alerts, screen time alerts
4. **Supabase Integration** - Complete database setup with RLS
5. **Secure Storage** - iOS Keychain & Android Keystore integration
6. **Geofence Calculations** - Real distance calculations with Haversine formula
7. **Complete Documentation** - Setup guides, database schema, troubleshooting

## 📱 Two Applications

### 1. Guardian View (Parent App)
Location: `/app` folder

**Features:**
- 🔐 Secure authentication with email/password and 2FA support
- 📍 **Real-time GPS location tracking** with 24-hour history
- 🗺️ **Geofencing with automatic alerts** (safe/unsafe zones)
- ⏰ Screen time management and daily limits
- 📊 App usage reports and analytics
- 🚨 **Instant SOS emergency alerts with GPS coordinates**
- 🔗 Device linking via 6-digit codes
- 🔔 **Push notifications for all alerts**

### 2. Family Link (Child App)
Location: `/family-link` folder

**Features:**
- ✅ Explicit consent flow before linking
- 🚨 Large, accessible emergency SOS button
- 👁️ Full transparency about monitored data
- 📱 Always visible, cannot be hidden
- 🔒 Secure parent-child connection
- ⚙️ Settings and data access viewer
- 📍 **Background location sharing**

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- npm or yarn
- Expo CLI
- Supabase account

### Installation

```bash
# Clone repository
git clone https://github.com/2lokeshrao/Children-Tracking.git
cd Children-Tracking

# Install dependencies
npm install

# Create environment file
cp .env.example .env
# Edit .env with your Supabase credentials

# Start development server
npm start
```

### Setup Supabase

1. Create account at [supabase.com](https://supabase.com)
2. Create new project
3. Run SQL from `DATABASE_SETUP.md`
4. Copy API keys to `.env`

**See `SETUP_GUIDE.md` for detailed instructions.**

## 📂 Project Structure

```
/app                          # Guardian View (Parent App)
  ├── index.tsx              # Welcome screen
  ├── login.tsx              # Login with 2FA
  ├── register.tsx           # Registration
  ├── dashboard.tsx          # Main dashboard
  ├── link-device.tsx        # Device linking
  ├── geofence.tsx           # Geofence management
  ├── screen-time.tsx        # Screen time controls
  └── app-usage.tsx          # Usage reports

/family-link                  # Family Link (Child App)
  ├── index.tsx              # Welcome screen
  ├── consent.tsx            # Explicit consent
  ├── link.tsx               # Link to parent
  ├── home.tsx               # Main screen with SOS
  └── transparency.tsx       # Data transparency

/services                     # Business Logic
  ├── SupabaseClient.ts      # Database connection
  ├── RealLocationService.ts # GPS tracking
  ├── NotificationService.ts # Push notifications
  ├── SecureStorageService.ts# Secure data storage
  ├── RealGeofenceService.ts # Geofence calculations
  ├── AuthService.ts         # Authentication
  ├── LinkingService.ts      # Device linking
  └── SOSService.ts          # Emergency alerts

/components                   # Shared UI components
/constants                    # Colors, images
/types                        # TypeScript interfaces
```

## 🔑 Key Features

### Real-Time Location Tracking
- GPS accuracy: High (10-50 meters)
- Update frequency: 30 seconds (foreground), 1 minute (background)
- 24-hour location history
- Map visualization with react-native-maps
- Automatic database storage

### Geofencing
- Create up to 15 safe/unsafe zones
- Radius: 50m to 5km
- Automatic entry/exit detection
- Instant push notifications
- Haversine distance calculation

### Emergency SOS
- Large, accessible button
- 3-second countdown
- Sends GPS coordinates
- High-priority notification
- Parent receives instant alert

### Security & Privacy
- End-to-end encryption for sensitive data
- Secure token storage (iOS Keychain, Android Keystore)
- Row Level Security on database
- No third-party data sharing
- Child can view all monitored data

## 🛡️ Ethical Design Principles

1. **Transparency First** - Child always knows what's being monitored
2. **Explicit Consent** - Clear consent screen before any data collection
3. **Visible Presence** - Apps cannot operate secretly
4. **Data Security** - Encryption for all sensitive data
5. **Child Rights** - Clear information about rights and data usage

## 📊 Technical Stack

- **Frontend**: React Native 0.81.4, Expo 54
- **Backend**: Supabase (PostgreSQL)
- **Location**: expo-location, expo-task-manager
- **Maps**: react-native-maps
- **Notifications**: expo-notifications
- **Storage**: expo-secure-store, AsyncStorage
- **State**: Zustand
- **Language**: TypeScript

## 📝 Documentation

- **[SETUP_GUIDE.md](SETUP_GUIDE.md)** - Complete setup instructions
- **[DATABASE_SETUP.md](DATABASE_SETUP.md)** - Database schema and SQL
- **[IMPROVEMENTS_SUMMARY.md](IMPROVEMENTS_SUMMARY.md)** - What was fixed
- **[ETHICAL_GUIDELINES.md](ETHICAL_GUIDELINES.md)** - Ethical considerations

## 🔧 Configuration

### Environment Variables (.env)
```env
SUPABASE_URL=https://xxxxx.supabase.co
SUPABASE_ANON_KEY=your-anon-key-here
```

### Permissions Required

**Android:**
- ACCESS_FINE_LOCATION
- ACCESS_BACKGROUND_LOCATION
- POST_NOTIFICATIONS
- FOREGROUND_SERVICE

**iOS:**
- NSLocationWhenInUseUsageDescription
- NSLocationAlwaysAndWhenInUseUsageDescription
- UIBackgroundModes: location

## 🧪 Testing

```bash
# Run on Android
npm run android

# Run on iOS
npm run ios

# Run on Web
npm run web

# Lint code
npm run lint
```

## 📱 Building for Production

```bash
# Install EAS CLI
npm install -g eas-cli

# Configure EAS
eas build:configure

# Build for Android
npm run build:android

# Build for iOS
npm run build:ios
```

## 🐛 Troubleshooting

### Location not working?
- Check permissions in device settings
- Enable "Always" location access
- Disable battery optimization (Android)

### Notifications not showing?
- Grant notification permissions
- Check notification settings
- Verify Expo push token

### Database errors?
- Verify Supabase credentials
- Check RLS policies
- Ensure tables are created

**See `SETUP_GUIDE.md` for more solutions.**

## 🤝 Contributing

Contributions are welcome! Please read our contributing guidelines first.

1. Fork the repository
2. Create feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Open Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## ⚠️ Important Notes

- This is a monitoring system designed for **family safety**
- Requires **open communication** between parents and children
- Should **not be used for secret surveillance**
- Child must be **aware of and consent** to monitoring
- Designed for **minors under parental supervision**

## 🆘 Support

- **Issues**: [GitHub Issues](https://github.com/2lokeshrao/Children-Tracking/issues)
- **Documentation**: See `/docs` folder
- **Email**: support@guardianview.app (if available)

## 🙏 Acknowledgments

- Expo team for amazing tools
- Supabase for backend infrastructure
- React Native community
- All contributors

## 📈 Roadmap

- [x] Real-time location tracking
- [x] Geofencing with alerts
- [x] SOS emergency button
- [x] Push notifications
- [x] Secure storage
- [ ] Screen time monitoring (native modules)
- [ ] App usage tracking (native modules)
- [ ] Audio recording feature
- [ ] Multi-device support
- [ ] Parent-child messaging

---

**Made with ❤️ for family safety**

**Version**: 1.0.0 | **Last Updated**: October 2025
