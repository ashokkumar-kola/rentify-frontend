

## Metro in React Native CLI

- **Metro** is the JavaScript bundler used by React Native.
- It compiles and bundles your JS code for mobile apps.
- Automatically watches files and rebuilds on changes.
- Optimized for fast refresh and incremental builds.
- Starts when you run `npx react-native start`.
- Serves the bundle to the app via a local server.
- Handles source maps and transforms (e.g., Babel).


---


## Gradle Daemon

- **Gradle Daemon** is a background process that runs Gradle builds.
- Speeds up builds by avoiding JVM startup for each run.
- Reuses computation and caches between builds.
- Automatically enabled by default in most setups.
- Can be stopped using `./gradlew --stop`.
- Configurable via `gradle.properties` (`org.gradle.daemon=true`).


---


## Bridgeless Mode in React Native

- **Bridgeless Mode** removes the legacy JS-to-native bridge.
- Uses **TurboModules** and **Fabric** for direct communication.
- Improves performance by eliminating message serialization overhead.
- Reduces latency in UI updates and animations.
- Part of React Native's **New Architecture** (enabled from v0.74).
- Legacy modules are supported via an interoperability layer.


---