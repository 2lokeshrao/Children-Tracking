# 🔧 CodeSandbox Error Fix Guide

## ⚠️ Issue: "Could not fetch dependencies" Error

The error you're seeing in CodeSandbox is because:
1. Dependencies are not installed
2. CodeSandbox has limited resources for large React Native projects
3. Some Expo packages don't work well in browser environment

## ✅ Solution: Use Local Development Instead

### Why Local Development?

React Native apps with Expo **cannot run properly in CodeSandbox** because:
- Requires native modules (location, notifications)
- Needs device permissions
- Large dependency size
- Background tasks not supported in browser

### 🚀 Recommended Setup (5 Minutes)

#### Step 1: Install on Your Computer

```bash
# Clone repository
git clone https://github.com/2lokeshrao/Children-Tracking.git
cd Children-Tracking

# Install dependencies
npm install

# If npm install fails, try:
npm install --legacy-peer-deps
```

#### Step 2: Start Development Server

```bash
npm start
```

#### Step 3: Run on Your Phone

1. Install **Expo Go** app from Play Store/App Store
2. Scan QR code from terminal
3. App will open on your phone

## 📱 Alternative: Use Expo Snack (Limited)

For quick testing (without native features):

1. Go to: https://snack.expo.dev
2. Create new project
3. Copy only UI components (not services)
4. Test basic UI only

**Note**: Location, notifications, and database won't work in Snack.

## 🖥️ Best Option: Local Development with Android Studio/Xcode

### For Android:

```bash
# Install Android Studio
# Setup Android SDK
# Then run:
npm run android
```

### For iOS (Mac only):

```bash
# Install Xcode
# Then run:
npm run ios
```

## 🐛 If Installation Still Fails

### Option 1: Clear Everything
```bash
rm -rf node_modules package-lock.json
npm cache clean --force
npm install
```

### Option 2: Use Yarn Instead
```bash
npm install -g yarn
yarn install
```

### Option 3: Install Packages One by One
```bash
npm install expo-location
npm install expo-notifications
npm install expo-task-manager
npm install react-native-maps
npm install @supabase/supabase-js
npm install zustand
```

## ✅ Verify Installation

After installation, check:

```bash
# Check if packages are installed
npm list expo-location
npm list expo-notifications

# Start the app
npm start
```

## 📞 Quick Help

**Error**: "Cannot find module"
**Fix**: `npm install <package-name>`

**Error**: "Metro bundler failed"
**Fix**: `npx expo start --clear`

**Error**: "Peer dependency warnings"
**Fix**: `npm install --legacy-peer-deps`

## 🎯 Summary

❌ **Don't use**: CodeSandbox (won't work for React Native)
✅ **Use instead**: 
1. Local development with Expo Go (Easiest)
2. Android Studio emulator (Best for testing)
3. Physical device with Expo Go (Recommended)

## 📚 Next Steps

1. ✅ Install locally: `npm install`
2. ✅ Setup Supabase (see `DATABASE_SETUP.md`)
3. ✅ Configure `.env` file
4. ✅ Run: `npm start`
5. ✅ Scan QR with Expo Go app

---

**Important**: All code is working and ready. Just needs to be run locally, not in CodeSandbox!
