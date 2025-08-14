📌 What is the Gradle Daemon?

The Gradle Daemon is a background process that keeps running between builds to make Gradle builds faster.

    - Without the Daemon: Every time you run gradle build (or ./gradlew build), Gradle starts a new JVM, loads classes, does initialization — which is slow.

    - With the Daemon: Gradle stays alive after the build, keeping the JVM warm and caching information so future builds run much faster.
