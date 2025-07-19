
[TERMINAL]
npx @react-native-community/cli@latest init rentify-frontend --version 0.76.0

cd rentify_frontend

code .


[VS CODE]

npx react-native start
npx react-native run-android

adb devices
adb reverse tcp:3000 tcp:3000


npx react-native init Rentify --template react-native-template-typescript
cd Rentify

# Navigation core
npm install @react-navigation/native

# React Native dependencies
npm install react-native-screens react-native-safe-area-context react-native-gesture-handler react-native-reanimated react-native-vector-icons react-native-paper

# Stack, Drawer, Tabs
npm install @react-navigation/native-stack @react-navigation/drawer @react-navigation/bottom-tabs

# For iOS: Run pod install
cd ios && pod install && cd ..

# Enable Babel Plugin
- Open your babel.config.js and add this plugin if not already present:
module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    'react-native-reanimated/plugin', // 👈 must be LAST in plugins
  ],
};



















































Create Screen

Follow tsx format
Use Typescript


Create Service to get data with axios  
use Hooks

Good Looking UI