# What is the Gradle Daemon?

The Gradle Daemon is a background process that keeps running between builds to make Gradle builds faster.

    - Without the Daemon: Every time you run gradle build (or ./gradlew build), Gradle starts a new JVM, loads classes, does initialization — which is slow.

    - With the Daemon: Gradle stays alive after the build, keeping the JVM warm and caching information so future builds run much faster.

---

# tsconfig.json

- **Purpose**: Configures TypeScript compiler options for the project.
- **Location**: Root of a React Native CLI project using TypeScript.
- **Usage**: Ensures consistent type-checking and transpilation behavior.

---

# React Native Config File

- **Purpose**: Centralizes environment-specific variables and app configuration.
- **Library**: Uses `react-native-config` package.
- **File Name**: `.env` (not `.json` or `.js`)
- **Usage**: Stores values like API URLs, feature flags, keys.

