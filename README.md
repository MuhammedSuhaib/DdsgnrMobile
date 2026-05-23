# Ddsgnr Mobile (Android)

This is the Android version of the Ddsgnr learning platform, built with **React Native** and **Expo**.

## Download App

[![Download APK](https://img.shields.io/badge/Download-APK-green?style=for-the-badge&logo=android)](https://github.com/MuhammedSuhaib/DdsgnrMobile/releases/latest/download/my.apk)

* [<a href="https://github.com/MuhammedSuhaib/DdsgnrMobile/releases/latest/download/my.apk">🚀 Direct Download Latest APK</a>] — Starts downloading immediately.
* [<a href="https://github.com/MuhammedSuhaib/DdsgnrMobile/releases/latest">📦 View Latest Release Page</a>] — See release notes and code snapshots.

> 💡 **Note:** Since this app is downloaded outside the Google Play Store, your device will flag it as an "Unknown App". If prompted during installation, simply enable **"Allow from this source"** or **"Unknown Sources"** in your Android security settings.

> ⚠️ **Testing Notice:** The login functionality is fake. This app is built strictly to test and showcase AI Agent capabilities, not as a real-world production application. Use any dummy credentials to log in.

---

## Getting Started

### Prerequisites
- Node.js 18+
- [pnpm](https://pnpm.io/) (used for package management)
- **Expo Go** app installed on your Android device

### Setup
1. **Install Dependencies:**
```bash
   pnpm install

```

2. **Run the Project:**

```bash
   pnpm start

```

### Running on Android

1. Open the **Expo Go** app on your Android device.
2. Ensure your computer and device are on the same Wi-Fi network.
3. Use the **"Enter URL manually"** option in the Expo Go app.
4. Enter the IP address and port provided in your terminal output (e.g., `exp://100.115.XX.XX:8082`).

### Running on Web

```bash
pnpm web

```

This will open the project in your browser at `http://localhost:8082` (or the port specified in your terminal).

## Project Structure

* `src/app/`: File-based routes using Expo Router.
* `src/components/`: Reusable UI components.
* `src/assets/`: Images and static assets.
* `GEMINI.md`: Project-specific architectural instructions and conventions.
