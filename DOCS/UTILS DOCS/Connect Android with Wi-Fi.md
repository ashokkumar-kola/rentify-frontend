# Connect Mobile to React Native Development Server via Wi-Fi

This guide helps you run a React Native app on a physical Android device over Wi-Fi, with full Metro bundler and backend connectivity.

---

## 1. Get Your Computer's IP Address

    Open terminal and run:

    ```bash
    ifconfig
    ```

    Look for your active network interface (e.g., `wlan0`, `enp3s0`, or similar) and note the `inet` address, e.g.:

    ```bash
    inet 192.168.1.9
    ```

    You'll use this IP address in the next steps.

---

## 2. Start Metro Bundler and Backend Server

### Metro (React Native bundler):

```bash
npx react-native start
```

### Backend (e.g., Node.js/Express):

Ensure your backend is running on:

```bash
http://localhost:3000/api
- or -
http://192.168.1.9:3000/api
```

Update the IP if needed.

---

## 3. Configure Device Debug Settings

Open the installed debug version of your app on your Android phone.

-   Shake the phone or use volume menu to open the **React Native Developer Menu**
-   Go to:

```bash
Settings → Debugging → Debug server host & port for device
```

-   Enter the IP and port of your development machine (from step 1):

```bash
192.168.1.9:8081
```

---

## 4. Set API Base URL in `apiClient.ts`

Open your API client file and set the base URL to match your development server IP:

```ts
const API_BASE_URL = "http://192.168.1.9:3000/api";
```

Avoid using `localhost` or `127.0.0.1` — those refer to the phone, not your computer.

---

## 5. Reload the App

Once Metro is fully bundled:

-   Reopen the app on your mobile device
-   If the app shows a blank screen or no data:
    -   Shake the device and tap **Reload**
    -   Or close and reopen the app manually

---

## 6. Notes

-   Ensure **both your phone and computer are on the same Wi-Fi network**
-   Avoid VPNs or firewalls that may block ports `8081` (Metro) or `3000` (backend)
-   To persist API URL config, consider using environment variables or a `.env.development` setup
