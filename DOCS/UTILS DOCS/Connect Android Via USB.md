CONNECT MOBILE VIA WIFI (React Native / Metro)

    1. Enable USB Debugging
    	- Go to: Settings > Developer options
    	- Enable: USB Debugging
    2. First-Time USB Connection (Initial Setup)
    	- Connect your mobile device to your PC via USB Cable
    	- Install the debug APK manually:
    	- Path: MyApp > android > app > build > outputs > apk > debug > app-debug.apk
    3. (Optional - Linux) Identify Device for udev Rules :
    	- Run: Only necessary on Linux for permissions.
    		- lsusb
    	- Note the vendor ID (first part of the ID, e.g., 22d9, 04e8 for Motorola)
    	- Then add udev rule:
    		- echo 'SUBSYSTEM=="usb", ATTR{idVendor}=="22d9", MODE="0666", GROUP="plugdev"' | sudo tee /etc/udev/rules.d/51-android-usb.rules
    4. Confirm Device Connection
    	- adb devices

    5. Set Debug Server Host & Port
    	- Open the Developer Menu on the device (Shake or 3-finger tap)
    	- Go to: Dev Settings > Debug server host & port for device
    	- Set it to:
    		MOBILE : 192.168.0.107:8081,
    		SREE : 192.168.1.93:8081,
    		YTP : 192.168.1.229:8081
    		PG : 192.168.0.105:8081	| 192.168.0.155:8081

    6. Reconnect via Wi-Fi
    	- After the initial USB setup:
    		- Disconnect USB cable
    		- Ensure both PC and Mobile are on the same Wi-Fi network
    		- Launch Metro bundler:
    			- npx react-native start
    		- Run the app on the device:
    			- npx react-native run-android

    Notes
    	- If USB is still connected and needed, Use
    		- adb reverse tcp:8081 tcp:8081
    		- adb reverse tcp:3000 tcp:3000
    	- Wi-Fi debugging will only work if the device and host are on the same subnet
    	- If Wi-Fi debugging fails:
    		- Check firewall settings
    		- Reboot the device
    		- Retry USB setup


2. USB Debugging (Linux only – to access Android device via USB)

2.1 Check Device Connection
$ lsusb

-   Identify your device vendor ID (e.g., 22d9, 04e8).

    2.2 Add udev Rule (for permission) > Replace 22d9 with your actual vendor ID:
    $ echo 'SUBSYSTEM=="usb", ATTR{idVendor}=="22d9", MODE="0666", GROUP="plugdev"' | sudo tee /etc/udev/rules.d/51-android-usb.rules

    2.3 Confirm Device Connection
    $ adb devices > Then reload udev rules or restart your system: (Optional)
    $ sudo udevadm control --reload-rules && sudo service udev restart
