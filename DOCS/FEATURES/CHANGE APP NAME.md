# 📱 How to Change Your React Native App Name

To change your React Native app name for both Android and iOS, follow this clean and comprehensive approach:

---

## ✅ Android

1. Open:
   ```
   android/app/src/main/res/values/strings.xml
   ```
2. Change the value:
   ```xml
   <string name="app_name">Your New App Name</string>
   ```
3. Rebuild the project:
   ```bash
   cd android
   ./gradlew clean
   cd ..
   react-native run-android
   ```

---

## ✅ iOS

1. Open:
   ```
   ios/YourProjectName/Info.plist
   ```
2. Update the display name:
   ```xml
   <key>CFBundleDisplayName</key>
   <string>Your New App Name</string>
   ```
3. Reinstall pods and rebuild:
   ```bash
   cd ios
   pod install
   cd ..
   react-native run-ios
   ```

---

## 🚀 Optional: Rename via CLI

Use [`react-native-rename`](https://www.npmjs.com/package/react-native-rename) to automate renaming:

```bash
npx react-native-rename "Your New App Name"
```

To also change the bundle ID:

```bash
npx react-native-rename "Your New App Name" -b "com.yourcompany.newapp"
```

---
