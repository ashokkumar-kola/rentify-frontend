## React Native Splash Screen

    - A Splash Screen is the initial screen that appears when you launch a mobile app


    - Android Screen Densities (DPI : Dots Per Inch)

        - mdpi      - 1.0   - low end devices
        - hdpi      - 1.5   - older mid range
        - xhdpi     - 2.0   - most mid range
        - xxhdpi    - 3.0   - high end and flagship
        - xxxhdpi   - 4.0   - very high resolution screens
  

    - Required Splash Screen Sizes
  
        - drawable folders
  
        - 480 x 800 px (hdpi) - 1.5
        - 720 x 1280 px (xhdpi) - 2.0
        - 1080 x 1920 px (xxhdpi) - 3.0 DPI
        - 1440 x 2560 px (xxxhdpi) - 4.0 DPI



https://www.notion.so/React-Native-SplashScreen-1922ce3cc65880b2b261c88b8b85aa2b

---


Splash Screen


	$ npm i react-native-splash-screen


---


app > settings.gradle

> at last
include ':react-native-splash-screen'   
project(':react-native-splash-screen').projectDir = new File(rootProject.projectDir, '../node_modules/react-native-splash-screen/android')


---


...
dependencies {
    ...
    implementation project(':react-native-splash-screen')
} 


---


// react-native-splash-screen >= 0.3.1
import org.devio.rn.splashscreen.SplashScreenReactPackage;
// react-native-splash-screen < 0.3.1
import com.cboy.rn.splashscreen.SplashScreenReactPackage;

public class MainApplication extends Application implements ReactApplication {

    private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {
        @Override
        public boolean getUseDeveloperSupport() {
            return BuildConfig.DEBUG;
        }

        @Override
        protected List<ReactPackage> getPackages() {
            return Arrays.<ReactPackage>asList(
                    new MainReactPackage(),
            new SplashScreenReactPackage()  //here
            );
        }
    };

    @Override
    public ReactNativeHost getReactNativeHost() {
        return mReactNativeHost;
    }
}


---


import android.os.Bundle; // here
import com.facebook.react.ReactActivity;
// react-native-splash-screen >= 0.3.1
import org.devio.rn.splashscreen.SplashScreen; // here
// react-native-splash-screen < 0.3.1
import com.cboy.rn.splashscreen.SplashScreen; // here

public class MainActivity extends ReactActivity {
   @Override
    protected void onCreate(Bundle savedInstanceState) {
        SplashScreen.show(this);  // here
        super.onCreate(savedInstanceState);
    }
    // ...other code
}


---


android > app > src > main > res
	
	> create layout folder
		> create new file launch_screen.xml

	> Copy the below code
<?xml version="1.0" encoding="utf-8"?>
<RelativeLayout xmlns:android="http://schemas.android.com/apk/res/android"
    android:orientation="vertical" android:layout_width="match_parent"
    android:layout_height="match_parent">
    <ImageView android:layout_width="match_parent" android:layout_height="match_parent" android:src="@drawable/launch_screen" android:scaleType="centerCrop" />
</RelativeLayout>


---


android > app > src > main > res > values > styles.xml
		
<resources>

    <!-- Base application theme. -->
    <style name="AppTheme" parent="Theme.AppCompat.DayNight.NoActionBar">
        <!-- Customize your theme here. -->
        <item name="android:editTextBackground">@layout/launch_screen</item>    // replace @drawable/rn_edit_text_material with @layout
    </style>

</resources>


---


android > app > src > main > res > values 

Past All generated files 

    drawable-ldpi
    drawable-mdpi
    drawable-hdpi
    drawable-xhdpi
    drawable-xxhdpi
    drawable-xxxhdpi


---


android > app > src > main > res > launch_screen.xml

	> Change screen name : launch_screen to screen
	
		$ <ImageView android:layout_width="match_parent" android:layout_height="match_parent" android:src="@drawable/screen" android:scaleType="centerCrop" />
		
		
---


useEffect(() => {
	is(Platform.OS === 'android')
})
    



<?xml version="1.0" encoding="utf-8"?>
<resources>
    <color name="primary_dark">#000000</color>
</resources>






































