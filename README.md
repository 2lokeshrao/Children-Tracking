# Guardian View & Family Link - Ethical Parental Monitoring System

A comprehensive, transparent, and ethical dual-app system for family safety and communication.

## 📱 Two Applications

### 1. Guardian View (Parent App)
**Location:** `/app` folder

**Features:**
- 🔐 Secure authentication with email/password and 2FA support
- 📍 Real-time location tracking with 24-hour history
- 🗺️ Geofencing with safe/unsafe zone alerts
- ⏰ Screen time management and daily limits
- 📊 App usage reports and analytics
- 🚨 Instant SOS emergency alerts
- 🔗 Device linking via 6-digit codes

### 2. Family Link (Child App)
**Location:** `/family-link` folder

**Features:**
- ✅ Explicit consent flow before linking
- 🚨 Large, accessible emergency SOS button
- 👁️ Full transparency about monitored data
- 📱 Always visible, cannot be hidden
- 🔒 Secure parent-child connection
- ⚙️ Settings and data access viewer

## 🛡️ Ethical Design Principles

1. **Transparency First**: Child always knows what's being monitored
2. **Explicit Consent**: Clear consent screen before any data collection
3. **Visible Presence**: Apps cannot operate secretly
4. **Data Security**: End-to-end encryption for all sensitive data
5. **Child Rights**: Clear information about rights and data usage

## 🚀 Getting Started

### Installation
```bash
npm install
```

### Run Guardian View (Parent App)
```bash
npx expo start
```

### Run Family Link (Child App)
Navigate to `/family-link` screens in the app

## 📂 Project Structure

```
/app                    # Guardian View (Parent App)
  ├── index.tsx        # Welcome screen
  ├── login.tsx        # Login with 2FA
  ├── register.tsx     # Registration
  ├── dashboard.tsx    # Main dashboard
  ├── link-device.tsx  # Device linking
  ├── geofence.tsx     # Geofence management
  ├── screen-time.tsx  # Screen time controls
  └── app-usage.tsx    # Usage reports

/family-link           # Family Link (Child App)
  ├── index.tsx        # Welcome screen
  ├── consent.tsx      # Explicit consent
  ├── link.tsx         # Link to parent
  ├── home.tsx         # Main screen with SOS
  └── transparency.tsx # Data transparency

/components            # Shared components
/services             # Business logic
/constants            # Colors, images
/types                # TypeScript interfaces
```

## 🔑 Key Features

### Parent App Features
- **Device Linking**: Generate 6-digit codes that expire in 15 minutes
- **Location Tracking**: View current and historical locations on map
- **Geofencing**: Create up to 15 safe/unsafe zones with custom alerts
- **Screen Time**: Set daily limits, block times, per-app restrictions
- **App Usage**: View detailed reports with time breakdowns
- **SOS Alerts**: Receive instant emergency notifications

### Child App Features
- **Consent Flow**: 3-screen consent process before linking
- **SOS Button**: Large, accessible emergency button with 3-second countdown
- **Transparency**: View all monitored data and purposes
- **Status Display**: See active monitoring features
- **Settings**: Manage app preferences and view data access

## 🔒 Security & Privacy

- All authentication tokens are securely stored
- Location data is encrypted in transit
- No data is shared with third parties
- Parents cannot access message content
- Child can view all collected data
- Uninstall requires parent PIN (with child awareness)

## ⚖️ Compliance

This system is designed to comply with:
- Google Play Store policies on surveillance apps
- Children's privacy protection regulations
- Ethical monitoring guidelines
- Transparency and consent requirements

## 🎨 Design System

**Guardian View Colors:**
- Primary: Navy Blue (#1E3A8A)
- Secondary: Teal (#0D9488)
- Accent: Bright Blue (#3B82F6)

**Family Link Colors:**
- Primary: Forest Green (#059669)
- Secondary: Warm Orange (#F59E0B)
- SOS: Emergency Red (#DC2626)

## 📝 Usage Example

1. Parent installs Guardian View
2. Parent creates account and logs in
3. Parent taps "Link New Device" to get 6-digit code
4. Child installs Family Link
5. Child reviews consent screen (required)
6. Child enters 6-digit code to link
7. Parent can now monitor location, set limits, receive SOS alerts
8. Child can send SOS alerts and view what's monitored

## ⚠️ Important Notes

- This is a monitoring system designed for family safety
- Requires open communication between parents and children
- Should not be used for secret surveillance
- Child must be aware of and consent to monitoring
- Designed for minors under parental supervision

## 📄 License

This is an educational project demonstrating ethical parental monitoring design.
