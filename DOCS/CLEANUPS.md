# Clean Build + Rebuild Project
 
	# Remove node_modules and cache
		rm -rf node_modules
		rm -rf package-lock.json
		rm -rf android/build
		rm -rf android/app/build
		rm -rf ios/build
		rm -rf ios/Pods
		rm -rf .gradle
		npm cache clean --force
		watchman watch-del-all
 
	# Reinstall dependencies
		npm install
 
	# For iOS (if applicable)
		cd ios && pod install && cd ..
 
	# Start Metro clean
		npx react-native start --reset-cache
 
	# Rebuild app
		npx react-native run-android
		
		
# 1️⃣ Kill Metro if running (optional, safe)
npx react-native start --reset-cache

# OR if you haven't started Metro yet, skip above

# 2️⃣ Clean the Android build
cd android
./gradlew clean
cd ..

# 3️⃣ Re-link just to be sure
npx react-native link

# 4️⃣ Install pods (skip on Android) — so ignore this

# 5️⃣ Start Metro with reset cache
npx react-native start --reset-cache

# 6️⃣ In a new terminal, run the app
npx react-native run-android




cd android
./gradlew app:checkDebugDuplicateClasses --stacktrace
