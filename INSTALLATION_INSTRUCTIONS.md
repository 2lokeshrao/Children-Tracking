# 📦 Installation Instructions - Guardian View App

## ⚠️ Important: Manual Installation Required

Due to package size and network constraints, please install dependencies manually on your local machine.

## 🚀 Quick Installation Steps

### 1. Clone the Repository
```bash
git clone https://github.com/2lokeshrao/Children-Tracking.git
cd Children-Tracking
```

### 2. Install Dependencies (Choose One Method)

#### Method A: Using npm (Recommended)
```bash
npm install
```

#### Method B: Using yarn
```bash
yarn install
```

#### Method C: Using Expo CLI (Most Compatible)
```bash
# Install Expo CLI globally if not installed
npm install -g expo-cli

# Install dependencies
npx expo install
```

### 3. Install Critical Packages Separately (If Method A/B fails)
```bash
# Core packages
npm install expo-location expo-task-manager expo-notifications

# Maps
npm install react-native-maps

# Storage & Security
npm install expo-secure-store expo-crypto @react-native-async-storage/async-storage

# State Management
npm install zustand

# Supabase
npm install @supabase/supabase-js
```

## 🔧 If Installation Fails

### Option 1: Use Expo Doctor
```bash
npx expo-doctor
npx expo install --fix
```

### Option 2: Clear Cache and Reinstall
```bash
# Clear npm cache
npm cache clean --force

# Remove node_modules
rm -rf node_modules package-lock.json

# Reinstall
npm install
```

### Option 3: Use Legacy Peer Deps
```bash
npm install --legacy-peer-deps
```

## 📱 Running the App

After successful installation:

```bash
# Start development server
npm start

# Or use Expo
npx expo start

# For Android
npm run android

# For iOS
npm run ios

# For Web
npm run web
```

## ✅ Verify Installation

Check if all critical packages are installed:

```bash
npm list expo-location
npm list expo-notifications
npm list expo-task-manager
npm list react-native-maps
npm list @supabase/supabase-js
```

## 🐛 Common Issues

### Issue: "Cannot find module 'expo-location'"
**Solution**: 
```bash
npx expo install expo-location
```

### Issue: "Peer dependency warnings"
**Solution**: 
```bash
npm install --legacy-peer-deps
```

### Issue: "Metro bundler errors"
**Solution**: 
```bash
npx expo start --clear
```

## 📞 Need Help?

If installation still fails:
1. Check Node.js version: `node --version` (Should be 18+)
2. Check npm version: `npm --version` (Should be 9+)
3. Update Expo CLI: `npm install -g expo-cli@latest`
4. See detailed logs in `install.log`

## 🎯 Next Steps After Installation

1. Setup Supabase (see `DATABASE_SETUP.md`)
2. Configure `.env` file (see `.env.example`)
3. Run the app: `npm start`
4. Test features

---

**Note**: All code is ready and working. Only dependencies need to be installed on your local machine.
