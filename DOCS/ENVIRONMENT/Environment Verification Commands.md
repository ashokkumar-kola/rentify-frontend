✅ Environment Verification Commands

Check	Command	Expected Output
version	node -v	Should match your target version
npm version	npm -v	Compatible with your Node version
Watchman (macOS only)	watchman -v	Should return a version
Java version	java -version	Java 11 or 17 recommended
Gradle version	gradle -v	Gradle 7.x or compatible
Android SDK path	echo $ANDROID_HOME	Should return valid SDK path
adb devices	adb devices	Should list connected devices
JDK path	echo $JAVA_HOME	Should return valid JDK path
Yarn (if used)	yarn -v	Optional, if using Yarn
React Native CLI	npx react-native --version	Should return CLI version





# 
```bash
nvm install 20         # Install Node.js v20
nvm use 20             # Switch to Node.js v20 for current shell
nvm alias default 20   # Set Node v20 as the default version
```