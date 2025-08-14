---
    
Generate Icon zip folder 

	> Open https://icon.kitchen/

	> Customize icon
	
		> Name : ic_launcher // dont change
    
	> Download
	
	
	
---

Replace Files with new android files with same names

    mipmap-hdpi
    mipmap-mdpi
    mipmap-xhdpi
    mipmap-xxhdpi
    mipmap-xxxhdpi

---

android > app > src > main > AndroidMenifest.xml

    > remove line
    	$ android:roundIcon="@mipmap/ic_launcher_round"

    > changed icon name
    	$ android:icon="@mipmap/rentify"               // recommnded to keep ic_launcher

---

android > app > src > main > res > values > strings.xml

<resources>
    <string name="app_name">Rentify</string>       // Sets the name shown on the home screen and in system UI
</resources>

---

App.json

{
"name": "rentify_frontend", // DONT CHANGE THIS NAME : MUST match the registered component name in your index.js or index.tsx
"displayName": "Rentify" // Just the label shown on the device’s home screen (Android/iOS) — it’s cosmetic.
}

---

✅ 1️⃣ Prepare your app icon

👉 Requirements:

    Make a square PNG icon — 1024×1024 pixels is standard.

    Transparent background (optional, but looks good).

    Save it as icon.png in your project root (or any folder).

✅ 2️⃣ Use react-native-make (easy & clean)

This is the most popular way for React Native CLI projects.

👉 Install react-native-make

    $ npx react-native-make

    $ npm install -g react-native-make ( If that doesn’t work, install it globally)

👉 Generate icons for Android
$ npx react-native set-icon --platform android --path ./icon.png

👉 Generate icons for iOS
$ npx react-native set-icon --platform ios --path ./icon.png

✅ What this does:

    Replaces all the necessary icon assets in android/app/src/main/res/ for Android (mipmap- folders).

    Updates the iOS Images.xcassets/AppIcon with all required sizes for iOS devices.

✅ 3️⃣ Clean build & re-run
npx react-native run-android
npx react-native run-ios

✅ 4️⃣ Verify

    Android: Check in your emulator or device launcher — the new icon should appear.

    iOS: Run on a simulator or real device — same.
