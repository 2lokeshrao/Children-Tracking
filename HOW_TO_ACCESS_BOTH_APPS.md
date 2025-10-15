# 📱 Dono Apps Kaise Access Kare

## 🎯 Current Status

Aapko **Parent App (Guardian View)** dikh raha hai Vercel pe:
- ✅ Real-Time Location
- ✅ Screen Time Control
- ✅ Emergency SOS
- ✅ Safe Zones
- ✅ Login/Create Account buttons

---

## 👶 Child App (Family Link) Kaise Dekhe?

### Method 1: URL Change (Easiest)

**Current URL**:
```
https://children-tracking.vercel.app
```

**Child App URL**:
```
https://children-tracking.vercel.app/family-link
```

### Steps:
1. Browser address bar mein `/family-link` add karo
2. Enter press karo
3. Child app open ho jayega! ✅

---

## 📂 App Structure

### Parent App (Guardian View)
```
https://children-tracking.vercel.app/
├── /login          - Parent login
├── /register       - Parent registration
├── /dashboard      - Main dashboard
├── /link-device    - Link child device
├── /geofence       - Manage safe zones
├── /screen-time    - Screen time controls
└── /app-usage      - App usage stats
```

### Child App (Family Link)
```
https://children-tracking.vercel.app/family-link/
├── /family-link/           - Child welcome screen
├── /family-link/consent    - Consent screen
├── /family-link/link       - Link to parent
├── /family-link/home       - Child home screen
└── /family-link/transparency - What's monitored
```

---

## 🎯 Quick Access Links

### Parent App (Guardian View):
```
https://children-tracking.vercel.app
```

**Features**:
- 👨‍👩‍👧 Parent dashboard
- 📍 Track child location
- ⏰ Set screen time limits
- 🚨 Receive SOS alerts
- 🗺️ Create safe zones

### Child App (Family Link):
```
https://children-tracking.vercel.app/family-link
```

**Features**:
- 👶 Child interface
- 🔗 Link to parent account
- 🆘 SOS button
- 👁️ View what's monitored
- ✅ Consent management

---

## 📱 Testing Both Apps

### Test Parent App:
1. Go to: `https://children-tracking.vercel.app`
2. Click "Login" or "Create Account"
3. Test dashboard features

### Test Child App:
1. Go to: `https://children-tracking.vercel.app/family-link`
2. Click "Link to Parent Account"
3. Test consent and linking

---

## 🔄 Switch Between Apps

### From Parent → Child:
```
Add /family-link to URL
```

### From Child → Parent:
```
Remove /family-link from URL
```

---

## 📊 App Comparison

| Feature | Parent App | Child App |
|---------|-----------|-----------|
| **URL** | `/` | `/family-link` |
| **Purpose** | Monitor & Control | Transparency & Consent |
| **Users** | Parents/Guardians | Children |
| **Main Features** | Dashboard, Tracking | SOS, Transparency |
| **Login** | Required | Link with code |

---

## 🎯 Real Device Testing

### Parent App (on Parent's Phone):
```bash
# Local run
git clone https://github.com/2lokeshrao/Children-Tracking.git
cd Children-Tracking
npm install
npm start
# Scan QR with Expo Go
```

### Child App (on Child's Phone):
```bash
# Same code, different entry point
# App automatically detects which version to show
# Or manually navigate to /family-link route
```

---

## 🌐 Web Version (Current)

### Parent App:
✅ **Live**: https://children-tracking.vercel.app
- All UI working
- Navigation functional
- Forms working
- ⚠️ Location/notifications limited (web limitation)

### Child App:
✅ **Live**: https://children-tracking.vercel.app/family-link
- All UI working
- Consent flow working
- Linking interface working
- ⚠️ SOS limited (web limitation)

---

## 📝 Quick Summary

### To Access Child App:
1. **Option 1**: Add `/family-link` to URL
   ```
   https://children-tracking.vercel.app/family-link
   ```

2. **Option 2**: Navigate from parent app
   - (Currently no direct link in parent app)
   - Manually change URL

3. **Option 3**: Local run
   ```bash
   npm start
   # Navigate to /family-link route in app
   ```

---

## 🎉 Both Apps Are Live!

### Parent App:
🔗 https://children-tracking.vercel.app

### Child App:
🔗 https://children-tracking.vercel.app/family-link

---

## 📱 For Full Features

### Use Local Development:
```bash
git clone https://github.com/2lokeshrao/Children-Tracking.git
cd Children-Tracking
npm install
npm start
```

**Benefits**:
- ✅ Both apps accessible
- ✅ Full features (location, notifications)
- ✅ Real device testing
- ✅ Background tracking
- ✅ Push notifications

---

## 🚀 Next Steps

1. **Test Parent App**: https://children-tracking.vercel.app
2. **Test Child App**: https://children-tracking.vercel.app/family-link
3. **For full features**: Run locally with Expo Go

---

**GitHub**: https://github.com/2lokeshrao/Children-Tracking
**Parent App**: https://children-tracking.vercel.app
**Child App**: https://children-tracking.vercel.app/family-link
