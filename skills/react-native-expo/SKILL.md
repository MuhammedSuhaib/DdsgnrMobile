---
name: react-native-expo
description: Use this skill whenever working with React Native and Expo. Covers building cross-platform mobile apps with React Native, using Expo for development and deployment, managing dependencies, configuring native modules, troubleshooting platform-specific issues, and optimizing app performance. Trigger on any mention of React Native, Expo, mobile app development with these frameworks, or requests to set up/debug/deploy mobile projects.
---

# React Native & Expo

## Overview

React Native is a framework for building native mobile apps using JavaScript and React. Expo simplifies the development process by providing pre-built tools, libraries, and services. This skill covers everything from core concepts to production-ready apps.

## What is React Native?

React Native lets you build native mobile apps for iOS and Android using JavaScript and React. Unlike hybrid frameworks that render inside a web view, React Native compiles to actual native UI components.

**Key differences from web React:**
- Use React Native components (View, Text, Image) instead of HTML elements
- Use JavaScript StyleSheet objects instead of CSS
- Work with native platform APIs instead of the DOM
- Flexbox is the default (and only) layout system

## What is Expo?

Expo is a platform built on top of React Native that simplifies mobile development. It provides:

- **Expo CLI** — Start, build, and deploy your app
- **Expo Go** — Test your app on a real device by scanning a QR code  
- **Expo SDK** — Pre-built libraries (camera, file system, notifications, etc.)
- **Expo Router** — File-based routing (like Next.js for mobile)
- **EAS** — Cloud builds and app store submissions

Compared to bare React Native, Expo eliminates 30+ minutes of setup with Xcode and Android Studio.

## Setting Up Your Environment

### Prerequisites
- Node.js 18+
- Phone with Expo Go installed (iOS App Store / Google Play) or an iOS Simulator / Android Emulator

### Creating a New Project

```bash
pnpx create-expo-app@latest my-app
cd my-app
pnpm start
```

Scan the QR code with Expo Go or press `i` for iOS Simulator / `a` for Android Emulator.

## Project Structure

```
my-app/
├── src/
│   ├── app/                # Screens and routes (Expo Router)
│   │   ├── _layout.tsx     # Root layout
│   │   └── index.tsx       # Home screen
│   ├── components/         # Reusable UI components
│   ├── hooks/              # Custom hooks
│   ├── lib/                # Utilities and configs
│   └── context/            # React Context providers
├── assets/                 # Images, fonts, icons
├── app.json                # Expo configuration
├── package.json
└── tsconfig.json
```

The `app/` directory uses file-based routing — each file becomes a screen.

## Core React Native Components

### View
The fundamental container component (equivalent to `div`).

```jsx
<View style={{ flex: 1, padding: 16, backgroundColor: "#fff" }}>
  {/* Child components */}
</View>
```

### Text
The only way to display text. All text must be wrapped in this component.

```jsx
<Text style={{ fontSize: 24, fontWeight: "bold" }}>Hello World</Text>
```

### Image
Displays images from local assets, URLs, or base64.

```jsx
<Image
  source={{ uri: "https://example.com/photo.jpg" }}
  style={{ width: 200, height: 200 }}
/>
```

### TextInput
User text input (equivalent to `<input>`).

```jsx
<TextInput
  placeholder="Enter email..."
  value={email}
  onChangeText={setEmail}
  keyboardType="email-address"
  secureTextEntry={isPassword}
/>
```

### TouchableOpacity
A pressable wrapper that reduces opacity on press.

```jsx
<TouchableOpacity onPress={() => console.log("Pressed!")}>
  <Text>Press me</Text>
</TouchableOpacity>
```

### FlatList
Performant scrollable list that only renders visible items.

```jsx
<FlatList
  data={items}
  keyExtractor={(item) => item.id}
  renderItem={({ item }) => <Text>{item.title}</Text>}
/>
```

### ScrollView
Scrollable container. Use FlatList for large lists instead.

```jsx
<ScrollView style={{ flex: 1 }}>
  {/* Content */}
</ScrollView>
```

### Modal
Overlays content on top of everything else.

```jsx
<Modal visible={isVisible} transparent animationType="fade">
  {/* Modal content */}
</Modal>
```

### ActivityIndicator
Loading spinner.

```jsx
<ActivityIndicator size="large" color="#000" />
```

### Alert
Native dialog API (not a component).

```jsx
Alert.alert("Title", "Message", [
  { text: "Cancel", style: "cancel" },
  { text: "OK", onPress: () => console.log("OK") },
]);
```

### SafeAreaView
Prevents content from overlapping with notches or home indicators.

```jsx
<SafeAreaView edges={["top", "bottom"]}>
  {/* Safe content */}
</SafeAreaView>
```

## Styling in React Native

React Native uses JavaScript objects for styling, not CSS.

```jsx
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#000",
  },
});

<View style={styles.container}>
  <Text style={styles.title}>Hello</Text>
</View>
```

**Key differences from CSS:**
- camelCase property names (backgroundColor, not background-color)
- No units for dimensions (16 = 16 points)
- Flexbox is default; column direction is default (not row)
- No cascading — styles don't inherit (except within Text)

---

## NativeWind (Tailwind CSS for React Native)

Tired of writing JavaScript style objects? Use **NativeWind** to write Tailwind CSS classes in React Native. Works across iOS, Android, and web with the same syntax.

### Why NativeWind?

- ✅ Write CSS classes instead of JS objects
- ✅ Works on iOS, Android, and web
- ✅ Autocomplete in IDE
- ✅ No need to memorize style object syntax
- ✅ Responsive design support
- ✅ Dark mode support

### Installation (Expo 52+)

**⚠️ CRITICAL:** Use `nativewind`, NOT `tailwindcss` directly!

```bash
pnpm add nativewind
pnpm add -D tailwindcss
```

### Step 1: Create tailwind.config.js

```javascript
// tailwind.config.js (at project root)
module.exports = {
  content: [
    "./src/app/**/*.{js,jsx,ts,tsx}",
    "./src/components/**/*.{js,jsx,ts,tsx}",
  ],
  presets: [require("nativewind/preset")],
};
```

**⚠️ CRITICAL:** Must have `presets: [require("nativewind/preset")]` or it won't work!

### Step 2: Create global.css

```css
/* global.css - at PROJECT ROOT, NOT in app/ folder */
@tailwind base;
@tailwind components;
@tailwind utilities;
```

### Step 3: Create babel.config.js

```javascript
// babel.config.js (at project root)
module.exports = function (api) {
  api.cache(true);
  return {
    presets: [
      ["babel-preset-expo", { jsxImportSource: "nativewind" }],
      "nativewind/babel",
    ],
  };
};
```

### Step 4: Update metro.config.js

```javascript
// metro.config.js (at project root)
const { getDefaultConfig } = require("expo/metro-config");
const { withNativeWind } = require("nativewind/metro");

const config = getDefaultConfig(__dirname);

module.exports = withNativeWind(config, { input: "./global.css" });
```

### Step 5: Import global.css in Root Layout

```tsx
// src/app/_layout.tsx
import "../global.css";
import { Stack } from "expo-router";

export default function RootLayout() {
  return <Stack screenOptions={{ headerShown: false }} />;
}
```

### Using Tailwind Classes

```tsx
import { View, Text } from "react-native";

export default function HomeScreen() {
  return (
    <View className="flex-1 justify-center items-center bg-white">
      <Text className="text-3xl font-bold text-black mb-4">
        Hello NativeWind!
      </Text>
      <Text className="text-base text-gray-600">
        Tailwind CSS for React Native
      </Text>
    </View>
  );
}
```

### Common Tailwind Classes

```tsx
// Spacing
className="p-4"        // padding: 16
className="m-2"        // margin: 8
className="mb-4"       // margin-bottom: 16
className="px-6"       // padding horizontal

// Text
className="text-lg"    // fontSize: 18
className="text-3xl"   // fontSize: 30
className="font-bold"  // fontWeight: bold
className="text-center" // textAlign: center
className="text-gray-600"

// Layout
className="flex flex-row"
className="justify-center"
className="items-center"
className="gap-4"      // space between items

// Colors & Backgrounds
className="bg-blue-500"
className="text-white"
className="border border-gray-200"

// Border Radius
className="rounded-lg"
className="rounded-full"

// Responsive (web only, mobile uses single layout)
className="text-lg md:text-2xl"
```

### Conditional Classes

```tsx
import { View } from "react-native";
import { clsx } from "clsx";

export default function Card({ isActive }: { isActive: boolean }) {
  return (
    <View
      className={clsx(
        "p-4 rounded-lg",
        isActive ? "bg-blue-500" : "bg-gray-200"
      )}
    >
      {/* Content */}
    </View>
  );
}
```

### Dark Mode Support

```tsx
// tailwind.config.js
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
};

// Use dark: prefix
<View className="bg-white dark:bg-black">
  <Text className="text-black dark:text-white">Content</Text>
</View>
```

### Styling Components with NativeWind

```tsx
// ❌ Before NativeWind (verbose)
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  card: {
    padding: 16,
    borderRadius: 8,
    backgroundColor: "#fff",
    marginBottom: 12,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
  },
});

<View style={styles.card}>

// ✅ After NativeWind (clean)
<View className="p-4 rounded-lg bg-white mb-3 shadow-md">
```

### DO's and DON'Ts for NativeWind

**✅ DO:**
- Use `nativewind`, NOT `tailwindcss` for Expo
- Include `presets: [require("nativewind/preset")]` in tailwind.config.js
- Put global.css at project root, NOT in app/ folder
- Update metro.config.js with `withNativeWind`
- Import global.css in root layout (_layout.tsx)
- Use className instead of style objects
- Test on real devices (behavior differs from web)
- Rebuild after config changes: `pnpx expo start --clear`

**❌ DON'T:**
- Use regular `tailwindcss` directly (web-only)
- Skip the babel.config.js setup
- Forget `presets` in tailwind.config.js
- Put global.css inside app/ directory
- Mix StyleSheet and NativeWind in same component
- Use web-only Tailwind features
- Forget to import global.css in root layout
- Assume it works without rebuilding

### Troubleshooting NativeWind

**Classes not applying?**
```bash
# Rebuild the app
pnpx expo start --clear

# Verify:
# ✓ tailwind.config.js has presets: [require("nativewind/preset")]
# ✓ babel.config.js is correct
# ✓ metro.config.js has withNativeWind
# ✓ global.css is imported in root layout
```

**Autocomplete not working?**
- Install "Tailwind CSS IntelliSense" extension in VSCode
- Ensure tailwind.config.js exists at project root
- Restart VSCode

**Classes work on web but not iOS/Android?**
- Some Tailwind features are web-only
- Check NativeWind docs for supported utilities
- Test on real device, not simulator only
- Use `className` array syntax if needed:
```tsx
className={clsx("p-4", isActive && "bg-blue-500")}
```

---

## Navigation with Expo Router

File-based routing — files in `app/` automatically become routes.

```
app/
├── index.tsx          →  "/"
├── about.tsx          →  "/about"
├── settings/
│   └── index.tsx      →  "/settings"
```

### Route Groups
Folders in parentheses organize files without affecting the URL:

```
app/
├── (auth)/
│   ├── _layout.tsx
│   ├── login.tsx
│   └── signup.tsx
└── (tabs)/
    ├── _layout.tsx
    └── index.tsx
```

### Layout Routes
`_layout.tsx` files define shared UI that wraps sibling routes.

```jsx
import { Stack } from "expo-router";

export default function RootLayout() {
  return <Stack screenOptions={{ headerShown: false }} />;
}
```

### Programmatic Navigation

```jsx
import { useRouter } from "expo-router";

const router = useRouter();
router.push("/about");        // Navigate forward
router.replace("/home");      // Replace current screen
router.back();                // Go back
```

## Working with Images

### expo-image
Better performance and features than built-in Image.

```bash
pnpx expo install expo-image
```

```jsx
import { Image } from "expo-image";

<Image
  source={{ uri: "https://example.com/photo.jpg" }}
  style={{ width: 200, height: 200 }}
  contentFit="cover"
/>
```

### expo-image-picker
Let users pick images from their library or take a photo.

```bash
pnpx expo install expo-image-picker
```

```jsx
import * as ImagePicker from "expo-image-picker";

const pickImage = async () => {
  const result = await ImagePicker.launchImageLibraryAsync({
    mediaTypes: ["images"],
    allowsEditing: true,
    aspect: [1, 1],
    quality: 0.8,
  });

  if (!result.canceled) {
    setImage(result.assets[0].uri);
  }
};
```

## State Management with Context API

For most apps, React Context is sufficient for global state.

```jsx
interface AuthContextType {
  user: User | null;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  const signIn = async (email: string, password: string) => {
    // Auth logic
  };

  const signOut = async () => {
    // Logout logic
  };

  return (
    <AuthContext.Provider value={{ user, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
};
```

## Environment Variables in Expo

Variables prefixed with `EXPO_PUBLIC_` are available in your app code.

```bash
# .env
EXPO_PUBLIC_API_URL=https://api.example.com
EXPO_PUBLIC_API_KEY=your-key-here
```

```jsx
const apiUrl = process.env.EXPO_PUBLIC_API_URL!;
```

Important: Never commit `.env` files with secrets to git.

## TypeScript in React Native

TypeScript is built-in with Expo.

```tsx
interface UserProps {
  name: string;
  age?: number;
}

const UserCard = ({ name, age }: UserProps) => {
  return <Text>{name}</Text>;
};

const [user, setUser] = useState<User | null>(null);
const [posts, setPosts] = useState<Post[]>([]);
```

## Development Builds & Expo Dev Client

When using native modules (camera, audio recording, etc.), you need a **development build** instead of Expo Go.

### When to Use Development Builds

- Using native libraries that require native code
- Testing native-specific features (permissions, sensors)
- Building for production (EAS Build)

**Expo Go** = Pre-built playground (limited to pure Expo SDK)
**Development Build** = Custom native app with your libraries

### Setting Up a Development Build

```bash
# Install Expo dev client
pnpm add expo-dev-client

# Create the iOS/Android folders
pnpx expo prebuild --clean

# Start development with native code
pnpx expo run:ios
# or for Android
pnpx expo run:android
```

After this, changes to JavaScript are still instant (like Expo Go), but you can now use any native library.

### Configuring Permissions in app.json

```json
{
  "expo": {
    "plugins": [
      [
        "expo-image-picker",
        {
          "photosPermission": "We need photo library access to pick images",
          "cameraPermission": "We need camera access to take photos"
        }
      ]
    ],
    "ios": {
      "infoPlist": {
        "NSPhotoLibraryUsageDescription": "We need access to your photos",
        "NSCameraUsageDescription": "We need access to your camera"
      }
    },
    "android": {
      "permissions": [
        "android.permission.CAMERA",
        "android.permission.READ_MEDIA_IMAGES"
      ]
    }
  }
}
```

---

## Expo UI Components

Expo provides native UI components using SwiftUI (iOS) and Jetpack Compose (Android). These give you system-level UI that feels native.

### BottomSheet Example

```bash
pnpm add expo-ui
```

```tsx
import { useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { BottomSheet, Button, VStack } from "expo-ui/swiftui";

export default function BottomSheetExample() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <View style={{ flex: 1, justifyContent: "flex-end" }}>
      <TouchableOpacity 
        onPress={() => setIsOpen(true)}
        style={{ padding: 16 }}
      >
        <Text>Open Bottom Sheet</Text>
      </TouchableOpacity>

      <BottomSheet isOpen={isOpen} onDismiss={() => setIsOpen(false)}>
        <VStack style={{ padding: 24 }}>
          <Text style={{ fontSize: 18, fontWeight: "bold" }}>
            Choose an Option
          </Text>
          <Button
            title="Camera"
            onPress={() => {
              console.log("Camera pressed");
              setIsOpen(false);
            }}
          />
          <Button
            title="Photo Library"
            onPress={() => {
              console.log("Library pressed");
              setIsOpen(false);
            }}
            style={{ marginTop: 12 }}
          />
        </VStack>
      </BottomSheet>
    </View>
  );
}
```

### Platform Detection (iOS vs Android)

```tsx
import { Platform } from "react-native";

// Use native components on iOS, fallback on Android
if (Platform.OS === "ios") {
  // Use SwiftUI components
} else if (Platform.OS === "android") {
  // Use Jetpack Compose components
} else {
  // Web fallback
}

// Or with file extensions
// ColorPicker.ios.tsx (iOS only)
// ColorPicker.android.tsx (Android only)
// ColorPicker.web.tsx (Web fallback)
// Then import normally:
import ColorPicker from "./ColorPicker";
```

---

## Authentication Flow

Complete authentication example with sign up, login, and session persistence.

### 1. Auth Context (src/context/AuthContext.tsx)

```tsx
import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import * as SecureStore from "expo-secure-store";

interface User {
  id: string;
  email: string;
  name?: string;
  username?: string;
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  signUp: (email: string, password: string, name: string) => Promise<void>;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Check for existing session on app start
  useEffect(() => {
    const restoreSession = async () => {
      try {
        const token = await SecureStore.getItemAsync("authToken");
        if (token) {
          // Validate token with your backend
          const response = await fetch("https://api.example.com/me", {
            headers: { Authorization: `Bearer ${token}` },
          });
          const userData = await response.json();
          setUser(userData);
        }
      } catch (error) {
        console.error("Failed to restore session:", error);
      } finally {
        setIsLoading(false);
      }
    };

    restoreSession();
  }, []);

  const signUp = async (email: string, password: string, name: string) => {
    try {
      const response = await fetch("https://api.example.com/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password, name }),
      });

      const { user, token } = await response.json();
      await SecureStore.setItemAsync("authToken", token);
      setUser(user);
    } catch (error) {
      throw new Error("Sign up failed");
    }
  };

  const signIn = async (email: string, password: string) => {
    try {
      const response = await fetch("https://api.example.com/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const { user, token } = await response.json();
      await SecureStore.setItemAsync("authToken", token);
      setUser(user);
    } catch (error) {
      throw new Error("Sign in failed");
    }
  };

  const signOut = async () => {
    try {
      await SecureStore.deleteItemAsync("authToken");
      setUser(null);
    } catch (error) {
      throw new Error("Sign out failed");
    }
  };

  return (
    <AuthContext.Provider value={{ user, isLoading, signUp, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
```

### 2. Sign In Screen (src/app/(auth)/login.tsx)

```tsx
import { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
} from "react-native";
import { useRouter } from "expo-router";
import { useAuth } from "@/context/AuthContext";

export default function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { signIn } = useAuth();
  const router = useRouter();

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert("Error", "Please fill in all fields");
      return;
    }

    if (password.length < 6) {
      Alert.alert("Error", "Password must be at least 6 characters");
      return;
    }

    setIsLoading(true);
    try {
      await signIn(email, password);
      router.replace("/(tabs)");
    } catch (error) {
      Alert.alert("Login Failed", (error as Error).message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View style={{ flex: 1, padding: 24, justifyContent: "center" }}>
      <Text style={{ fontSize: 32, fontWeight: "bold", marginBottom: 32 }}>
        Welcome Back
      </Text>

      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
        style={{
          backgroundColor: "#f5f5f5",
          borderRadius: 12,
          padding: 16,
          marginBottom: 16,
          fontSize: 16,
          borderWidth: 1,
          borderColor: "#e0e0e0",
        }}
      />

      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={{
          backgroundColor: "#f5f5f5",
          borderRadius: 12,
          padding: 16,
          marginBottom: 24,
          fontSize: 16,
          borderWidth: 1,
          borderColor: "#e0e0e0",
        }}
      />

      <TouchableOpacity
        onPress={handleLogin}
        disabled={isLoading}
        style={{
          backgroundColor: "#000",
          borderRadius: 12,
          padding: 16,
          alignItems: "center",
          opacity: isLoading ? 0.6 : 1,
        }}
      >
        {isLoading ? (
          <ActivityIndicator color="#fff" size={24} />
        ) : (
          <Text style={{ color: "#fff", fontSize: 16, fontWeight: "600" }}>
            Sign In
          </Text>
        )}
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => router.push("/(auth)/signup")}
        style={{ marginTop: 16, alignItems: "center" }}
      >
        <Text style={{ color: "#666", fontSize: 14 }}>
          Don't have an account? <Text style={{ color: "#000", fontWeight: "600" }}>Sign Up</Text>
        </Text>
      </TouchableOpacity>
    </View>
  );
}
```

### 3. Sign Up Screen (src/app/(auth)/signup.tsx)

```tsx
import { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
} from "react-native";
import { useRouter } from "expo-router";
import { useAuth } from "@/context/AuthContext";

export default function SignUpScreen() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { signUp } = useAuth();
  const router = useRouter();

  const handleSignUp = async () => {
    if (!name || !email || !password) {
      Alert.alert("Error", "Please fill in all fields");
      return;
    }

    if (password.length < 6) {
      Alert.alert("Error", "Password must be at least 6 characters");
      return;
    }

    setIsLoading(true);
    try {
      await signUp(email, password, name);
      router.replace("/(tabs)");
    } catch (error) {
      Alert.alert("Sign Up Failed", (error as Error).message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View style={{ flex: 1, padding: 24, justifyContent: "center" }}>
      <Text style={{ fontSize: 32, fontWeight: "bold", marginBottom: 32 }}>
        Create Account
      </Text>

      <TextInput
        placeholder="Full Name"
        value={name}
        onChangeText={setName}
        autoCapitalize="words"
        style={{
          backgroundColor: "#f5f5f5",
          borderRadius: 12,
          padding: 16,
          marginBottom: 16,
          fontSize: 16,
          borderWidth: 1,
          borderColor: "#e0e0e0",
        }}
      />

      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
        style={{
          backgroundColor: "#f5f5f5",
          borderRadius: 12,
          padding: 16,
          marginBottom: 16,
          fontSize: 16,
          borderWidth: 1,
          borderColor: "#e0e0e0",
        }}
      />

      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={{
          backgroundColor: "#f5f5f5",
          borderRadius: 12,
          padding: 16,
          marginBottom: 24,
          fontSize: 16,
          borderWidth: 1,
          borderColor: "#e0e0e0",
        }}
      />

      <TouchableOpacity
        onPress={handleSignUp}
        disabled={isLoading}
        style={{
          backgroundColor: "#000",
          borderRadius: 12,
          padding: 16,
          alignItems: "center",
          opacity: isLoading ? 0.6 : 1,
        }}
      >
        {isLoading ? (
          <ActivityIndicator color="#fff" size={24} />
        ) : (
          <Text style={{ color: "#fff", fontSize: 16, fontWeight: "600" }}>
            Sign Up
          </Text>
        )}
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => router.push("/(auth)/login")}
        style={{ marginTop: 16, alignItems: "center" }}
      >
        <Text style={{ color: "#666", fontSize: 14 }}>
          Already have an account? <Text style={{ color: "#000", fontWeight: "600" }}>Sign In</Text>
        </Text>
      </TouchableOpacity>
    </View>
  );
}
```

---

## Route Guards & Session Persistence

Protect routes based on authentication state. The **RouteGuard** ensures users can only access screens they should see.

### Root Layout with Route Guard (src/app/_layout.tsx)

```tsx
import { useEffect } from "react";
import { useSegments, useRouter } from "expo-router";
import { Stack } from "expo-router";
import { useAuth } from "@/context/AuthContext";
import { AuthProvider } from "@/context/AuthContext";

function RootLayoutNav() {
  const { user, isLoading } = useAuth();
  const segments = useSegments();
  const router = useRouter();

  useEffect(() => {
    if (isLoading) return; // Still checking auth state

    // Determine where to route based on auth state
    const inAuthGroup = segments[0] === "(auth)";
    const inTabsGroup = segments[0] === "(tabs)";

    if (!user) {
      // Not logged in → send to login
      if (!inAuthGroup) {
        router.replace("/(auth)/login");
      }
    } else {
      // Logged in → send to tabs
      if (!inTabsGroup) {
        router.replace("/(tabs)");
      }
    }
  }, [user, isLoading, segments]);

  // Show loading screen while checking auth
  if (isLoading) {
    return (
      <Stack>
        <Stack.Screen 
          name="splash" 
          options={{ headerShown: false }} 
        />
      </Stack>
    );
  }

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Group>
        <Stack.Screen name="(auth)" />
      </Stack.Group>
      <Stack.Group>
        <Stack.Screen name="(tabs)" />
      </Stack.Group>
    </Stack>
  );
}

export default function RootLayout() {
  return (
    <AuthProvider>
      <RootLayoutNav />
    </AuthProvider>
  );
}
```

### Auth Layout (src/app/(auth)/_layout.tsx)

```tsx
import { Stack } from "expo-router";

export default function AuthLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        animationEnabled: false,
      }}
    >
      <Stack.Screen name="login" />
      <Stack.Screen name="signup" />
    </Stack>
  );
}
```

### Main App Layout (src/app/(tabs)/_layout.tsx)

```tsx
import { NativeTabs } from "expo-router/unstable-native-tabs";

export default function TabsLayout() {
  return (
    <NativeTabs>
      <NativeTabs.Trigger name="index">
        <NativeTabs.Trigger.Label>Home</NativeTabs.Trigger.Label>
        <NativeTabs.Trigger.Icon sf={"house"} />
      </NativeTabs.Trigger>

      <NativeTabs.Trigger name="profile">
        <NativeTabs.Trigger.Label>Profile</NativeTabs.Trigger.Label>
        <NativeTabs.Trigger.Icon sf={"person"} />
      </NativeTabs.Trigger>
    </NativeTabs>
  );
}
```

---

## Building the Post Creation Flow

Complete example of creating a post with image selection and preview.

### Home Screen with FAB (src/app/(tabs)/index.tsx)

```tsx
import { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Alert,
  FlatList,
  Image as RNImage,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { Image } from "expo-image";
import { useAuth } from "@/context/AuthContext";

interface Post {
  id: string;
  userId: string;
  imageUrl: string;
  description?: string;
  createdAt: string;
}

export default function HomeScreen() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [showPreview, setShowPreview] = useState(false);
  const [description, setDescription] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const { user } = useAuth();

  const showImagePicker = () => {
    Alert.alert("Choose Photo Source", "Select where to get your image from", [
      {
        text: "Camera",
        onPress: takePhoto,
      },
      {
        text: "Photo Library",
        onPress: pickImage,
      },
      {
        text: "Cancel",
        style: "cancel",
      },
    ]);
  };

  const takePhoto = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== "granted") {
      Alert.alert("Permission Denied", "We need camera access to take photos");
      return;
    }

    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.8,
    });

    if (!result.canceled && result.assets[0]) {
      setPreviewImage(result.assets[0].uri);
      setShowPreview(true);
    }
  };

  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      Alert.alert(
        "Permission Denied",
        "We need photo library access to pick images"
      );
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.8,
    });

    if (!result.canceled && result.assets[0]) {
      setPreviewImage(result.assets[0].uri);
      setShowPreview(true);
    }
  };

  const submitPost = async () => {
    if (!previewImage) return;

    setIsUploading(true);
    try {
      // Upload image to your backend
      // const imageUrl = await uploadImage(previewImage);

      // Create post
      const newPost: Post = {
        id: Date.now().toString(),
        userId: user?.id || "",
        imageUrl: previewImage,
        description,
        createdAt: new Date().toISOString(),
      };

      setPosts([newPost, ...posts]);
      setPreviewImage(null);
      setShowPreview(false);
      setDescription("");
      Alert.alert("Success", "Post created!");
    } catch (error) {
      Alert.alert("Error", "Failed to create post");
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: "#fff" }}>
      <FlatList
        data={posts}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={{ padding: 16, borderBottomWidth: 1, borderColor: "#e0e0e0" }}>
            <Image
              source={{ uri: item.imageUrl }}
              style={{ width: "100%", height: 300, borderRadius: 12 }}
            />
            {item.description && (
              <Text style={{ marginTop: 12, fontSize: 14, color: "#333" }}>
                {item.description}
              </Text>
            )}
          </View>
        )}
        ListEmptyComponent={
          <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
            <Text style={{ color: "#999" }}>No posts yet. Create one!</Text>
          </View>
        }
      />

      {/* Floating Action Button */}
      <TouchableOpacity
        onPress={showImagePicker}
        style={{
          position: "absolute",
          bottom: 24,
          right: 24,
          width: 60,
          height: 60,
          borderRadius: 30,
          backgroundColor: "#000",
          justifyContent: "center",
          alignItems: "center",
          elevation: 8,
          shadowColor: "#000",
          shadowOpacity: 0.3,
          shadowOffset: { width: 0, height: 2 },
          shadowRadius: 8,
        }}
      >
        <Text style={{ color: "#fff", fontSize: 32, fontWeight: "bold" }}>+</Text>
      </TouchableOpacity>

      {/* Image Preview Modal */}
      {showPreview && previewImage && (
        <View
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(0,0,0,0.9)",
            justifyContent: "center",
            alignItems: "center",
            padding: 24,
          }}
        >
          <View
            style={{
              width: "100%",
              backgroundColor: "#fff",
              borderRadius: 12,
              padding: 24,
            }}
          >
            <Image
              source={{ uri: previewImage }}
              style={{ width: "100%", height: 300, borderRadius: 8, marginBottom: 16 }}
            />

            <TextInput
              placeholder="Add a description (optional)"
              value={description}
              onChangeText={setDescription}
              multiline
              style={{
                backgroundColor: "#f5f5f5",
                borderRadius: 8,
                padding: 12,
                marginBottom: 16,
                minHeight: 80,
              }}
            />

            <TouchableOpacity
              onPress={submitPost}
              disabled={isUploading}
              style={{
                backgroundColor: "#000",
                borderRadius: 8,
                padding: 12,
                alignItems: "center",
                marginBottom: 8,
                opacity: isUploading ? 0.6 : 1,
              }}
            >
              <Text style={{ color: "#fff", fontSize: 16, fontWeight: "600" }}>
                {isUploading ? "Uploading..." : "Post"}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => setShowPreview(false)}
              style={{
                backgroundColor: "#f5f5f5",
                borderRadius: 8,
                padding: 12,
                alignItems: "center",
              }}
            >
              <Text style={{ color: "#000", fontSize: 16 }}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </View>
  );
}
```

---

## Error Boundaries

Catch errors that occur during rendering and show a fallback UI instead of crashing.

### ErrorBoundary Component (src/components/ErrorBoundary.tsx)

```tsx
import React, { ReactNode } from "react";
import { View, Text, TouchableOpacity } from "react-native";

interface Props {
  children: ReactNode;
  fallback?: (error: Error, retry: () => void) => ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    // Log error to your monitoring service
    console.error("Error caught by boundary:", error, errorInfo);
  }

  retry = () => {
    this.setState({ hasError: false, error: null });
  };

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback(this.state.error!, this.retry);
      }

      // Default error UI
      return (
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            padding: 24,
            backgroundColor: "#fff",
          }}
        >
          <Text
            style={{
              fontSize: 24,
              fontWeight: "bold",
              marginBottom: 12,
              color: "#d32f2f",
            }}
          >
            Oops! Something went wrong
          </Text>
          <Text
            style={{
              fontSize: 14,
              color: "#666",
              marginBottom: 24,
              textAlign: "center",
            }}
          >
            {this.state.error?.message || "An unexpected error occurred"}
          </Text>
          <TouchableOpacity
            onPress={this.retry}
            style={{
              backgroundColor: "#000",
              borderRadius: 8,
              paddingVertical: 12,
              paddingHorizontal: 24,
            }}
          >
            <Text style={{ color: "#fff", fontSize: 16, fontWeight: "600" }}>
              Try Again
            </Text>
          </TouchableOpacity>
        </View>
      );
    }

    return this.props.children;
  }
}
```

### Usage in Root Layout

```tsx
import { ErrorBoundary } from "@/components/ErrorBoundary";

export default function RootLayout() {
  return (
    <ErrorBoundary>
      <AuthProvider>
        <RootLayoutNav />
      </AuthProvider>
    </ErrorBoundary>
  );
}
```

---

## Performance Optimization

### 1. Prevent Unnecessary Re-renders with useMemo

```tsx
import { useMemo } from "react";

interface Post {
  id: string;
  title: string;
  likes: number;
}

function PostList({ posts, userId }: { posts: Post[]; userId: string }) {
  // Only recalculate when posts change
  const userPosts = useMemo(
    () => posts.filter((post) => post.userId === userId),
    [posts, userId]
  );

  return (
    <FlatList
      data={userPosts}
      renderItem={({ item }) => <PostCard post={item} />}
    />
  );
}
```

### 2. Use useCallback for Event Handlers

```tsx
import { useCallback } from "react";

function SearchScreen() {
  const [query, setQuery] = useState("");

  // Handler won't be recreated on every render
  const handleSearch = useCallback(
    async (text: string) => {
      const results = await fetchResults(text);
      setResults(results);
    },
    [] // Dependencies: empty = function never changes
  );

  return (
    <TextInput
      value={query}
      onChangeText={handleSearch}
      placeholder="Search..."
    />
  );
}
```

### 3. Use FlashList Instead of FlatList

```bash
pnpm add @shopify/flash-list
```

```tsx
import { FlashList } from "@shopify/flash-list";

function PostFeed() {
  return (
    <FlashList
      data={posts}
      renderItem={({ item }) => <PostCard post={item} />}
      estimatedItemSize={300} // Important for performance
      keyExtractor={(item) => item.id}
    />
  );
}
```

### 4. Image Optimization

```tsx
import { Image } from "expo-image";

<Image
  source={{ uri: imageUrl }}
  style={{ width: 200, height: 200 }}
  contentFit="cover"
  cachePolicy="memory-disk" // Cache in memory and disk
  transition={200} // Smooth fade-in
/>
```

---

## Expo Compatible Libraries

### Best Practices for Library Selection

1. **Always use** `pnpm add expo-<library-name>` — this installs the Expo-compatible version
2. **Check compatibility** at [expo.io/go/libraries](https://www.npmjs.com/search?q=expo)
3. **Avoid** small/unmaintained packages — they often break with SDK updates

### Essential Libraries

```bash
# Image handling
pnpm add expo-image expo-image-picker

# Secure storage
pnpm add expo-secure-store

# File system
pnpm add expo-file-system

# Notifications
pnpm add expo-notifications

# Video
pnpm add expo-video

# Audio
pnpm add expo-av

# Location
pnpm add expo-location

# Camera
pnpm add expo-camera

# Development
pnpm add expo-dev-client
```

---

## Dependency Management & SDK Upgrades

### Check for Issues

```bash
# Scan for compatibility problems
pnpx expo doctor
```

### Upgrade SDK

```bash
# Update to new Expo SDK version
pnpm add expo@latest

# Fix all dependencies to match new SDK
pnpx expo install --fix
```

### Common Issues & Fixes

**Issue: "Module not found" after updating**
```bash
pnpx expo doctor
pnpx expo install --fix
```

**Issue: Native code broke after update**
```bash
pnpx expo prebuild --clean
pnpx expo run:ios
```

---

## Project Architecture & Folder Structure

```
src/
├── app/                    # Routes (Expo Router)
│   ├── _layout.tsx         # Root layout + RouteGuard
│   ├── (auth)/
│   │   ├── _layout.tsx
│   │   ├── login.tsx
│   │   └── signup.tsx
│   └── (tabs)/
│       ├── _layout.tsx
│       ├── index.tsx       # Home feed
│       └── profile.tsx     # User profile
│
├── context/                # Global state
│   └── AuthContext.tsx
│
├── hooks/                  # Custom React hooks
│   ├── usePosts.ts        # Post CRUD
│   └── useAuth.ts         # Auth utils
│
├── components/             # Reusable UI
│   ├── PostCard.tsx
│   ├── ErrorBoundary.tsx
│   └── LoadingSpinner.tsx
│
├── lib/                    # Business logic & utilities
│   ├── api/               # API calls
│   │   ├── posts.ts
│   │   └── auth.ts
│   ├── storage.ts         # File uploads
│   ├── date-helper.ts     # Date formatting
│   └── validators.ts      # Input validation
│
└── assets/                # Static files
    ├── images/
    ├── icons/
    └── fonts/
```

---

## Front-End Observability (Honeycomb & OpenTelemetry)

Production apps fail in ways you'll never see locally. Users experience slow screens, random errors, and crashes while you have no visibility into what's happening. Front-end observability solves this by collecting structured traces of user interactions, API calls, and performance metrics.

### Why Front-End Observability Matters

**Without observability:**
- User: "The app is slow"
- You: "Works fine for me 🤷"
- No context, no debugging info, just console logs scattered everywhere

**With observability (Honeycomb + OpenTelemetry):**
- See exactly which operations are slow (network, storage, processing)
- Track which users/scenarios trigger bugs
- Debug production issues in real-time
- Understand performance across different devices/networks
- Get alerts when error rates spike

### Setting Up Honeycomb + OpenTelemetry

**Step 1: Create Honeycomb Account**

```bash
# Go to honeycomb.io and sign up (free tier available)
# Create a new team
# Get your ingest API key from Settings → API Keys
```

**Step 2: Install Dependencies**

```bash
pnpm add @honeycomb/opentelemetry-react-native
pnpm add @opentelemetry/api
```

**Step 3: Create metro.config.js**

```javascript
// metro.config.js
const { getDefaultConfig } = require("expo/metro-config");

const config = getDefaultConfig(__dirname);
config.transformer.unstableEnablePackageExports = true;

module.exports = config;
```

**Step 4: Set Environment Variables**

```bash
# .env
EXPO_PUBLIC_HONEYCOMB_API_KEY=your-ingest-key-here
EXPO_PUBLIC_SERVICE_NAME=my-app
```

**Step 5: Initialize SDK in Root Layout**

```tsx
// src/app/_layout.tsx
import { Platform } from "react-native";
import { diag, DiagConsoleLogger, DiagLogLevel } from "@opentelemetry/api";
import { initializeHoneycomb } from "@honeycomb/opentelemetry-react-native";

// Only initialize on native platforms (not web)
if (Platform.OS !== "web") {
  diag.setLogger(
    new DiagConsoleLogger(),
    __DEV__ ? DiagLogLevel.DEBUG : DiagLogLevel.WARN
  );

  initializeHoneycomb({
    apiKey: process.env.EXPO_PUBLIC_HONEYCOMB_API_KEY!,
    serviceName: process.env.EXPO_PUBLIC_SERVICE_NAME!,
  });
}

export default function RootLayout() {
  // Your app layout
}
```

**Step 6: Create Tracing Utility**

```typescript
// src/lib/tracing.ts
import { trace } from "@opentelemetry/api";

const tracer = trace.getTracer("my-app");

export function withSpan<T>(
  name: string,
  fn: () => Promise<T>,
  attributes?: Record<string, any>
): Promise<T> {
  return tracer.startActiveSpan(name, async (span) => {
    try {
      if (attributes) {
        Object.entries(attributes).forEach(([key, value]) => {
          span.setAttribute(key, value);
        });
      }
      const result = await fn();
      span.setStatus({ code: 0 }); // OK
      return result;
    } catch (error) {
      span.recordException(error as Error);
      span.setStatus({ code: 2 }); // ERROR
      throw error;
    } finally {
      span.end();
    }
  });
}
```

**Step 7: Instrument API Calls**

```tsx
// src/lib/api/posts.ts
import { withSpan } from "@/lib/tracing";

export async function createPost(
  imageUri: string,
  description: string,
  userId: string
) {
  return withSpan(
    "posts.create",
    async () => {
      // Upload image
      const imageUrl = await withSpan(
        "storage.upload.post",
        async () => {
          const bytes = await fetch(imageUri).then((r) => r.arrayBuffer());
          const formData = new FormData();
          formData.append("file", new Blob([bytes]));
          formData.append("userId", userId);

          const response = await fetch("https://your-api.com/upload", {
            method: "POST",
            body: formData,
          });
          
          const { url } = await response.json();
          return url;
        },
        { userId, hasDescription: !!description }
      );

      // Create new post
      await withSpan(
        "posts.create",
        async () => {
          const response = await fetch("https://your-api.com/posts", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              user_id: userId,
              image_url: imageUrl,
              description,
              created_at: new Date().toISOString(),
              expires_at: new Date(
                Date.now() + 24 * 60 * 60 * 1000
              ).toISOString(),
              is_active: true,
            }),
          });

          return response.json();
        },
        { userId, imageUrl }
      );
    },
    { userId, hasDescription: !!description }
  );
}
```

**Step 8: Set Up Native Configuration (iOS)**

```swift
// ios/[YourApp]/AppDelegate.swift
import HoneycombOpenTelemetryReactNative

func application(_ application: UIApplication, 
  didFinishLaunchingWithOptions launchOptions: [UIApplication.LaunchOptionsKey: Any]?) -> Bool {
  
  HoneycombOpenTelemetry.initializeWithAPIKey(
    "your-ingest-api-key",
    serviceName: "my-app"
  )
  
  // ... rest of setup
  return true
}
```

**Step 9: Set Up Native Configuration (Android)**

```kotlin
// android/app/src/main/java/com/yourapp/MainApplication.kt
import io.honeycomb.otel.HoneycombOpenTelemetry

class MainApplication : Application() {
  override fun onCreate() {
    HoneycombOpenTelemetry.initializeWithAPIKey(
      "your-ingest-api-key",
      "my-app"
    )
    super.onCreate()
  }
}
```

**Step 10: Add Navigation Instrumentation**

```tsx
// src/app/_layout.tsx
import {
  NavigationInstrumentation,
  useNavigationContainerRef,
} from "@honeycomb/opentelemetry-react-native";
import { Stack } from "expo-router";

export default function RootLayout() {
  const navigationRef = useNavigationContainerRef();

  return (
    <NavigationInstrumentation navigationRef={navigationRef}>
      <Stack ref={navigationRef} screenOptions={{ headerShown: false }}>
        {/* Your screens */}
      </Stack>
    </NavigationInstrumentation>
  );
}
```

### What Gets Automatically Tracked

Without any extra code, Honeycomb automatically captures:
- **HTTP requests** — All fetch/axios calls with timing
- **Navigation transitions** — Screen changes with duration
- **React Native startup** — Cold app launch time
- **Slow event loop** — Detected long-running JavaScript
- **Native crashes** — Uncaught exceptions

### Querying Traces in Honeycomb

```
# Find slow operations
name == "posts.create" AND duration_ms > 1000

# Find all errors
status_code == 2

# Find errors for a specific user
user_id == "user_123" AND status_code == 2

# Average latency by operation
HEATMAP(duration_ms) WHERE name == "posts.create"

# Error rate over time
COUNT() / COUNT() as error_rate WHERE status_code == 2
```

### DO's and DON'Ts for Observability

**✅ DO:**
- Instrument early, not after launch
- Add attributes that help debugging (userId, count, itemId)
- Wrap all async operations (API, storage, database)
- Check dashboards weekly for anomalies
- Set alerts for error rates > 5%
- Use consistent span names (posts.create, not createPost)

**❌ DON'T:**
- Wait until production to add observability
- Forget to add attributes
- Log passwords, tokens, or PII
- Create a span for every function (only important ones)
- Ignore performance regressions
- Hardcode API keys in spans

---

## Production Debugging & Monitoring

### Real-World Example: Debugging a Slow Post Creation

**User report:** "App is slow when creating posts"

**Without observability:** 
- Can't reproduce locally
- No idea what's slow
- Guessing fixes

**With Honeycomb trace:**
```
posts.create (5.8 seconds) ❌ SLOW
├── storage.upload.post (5.0 seconds) ← BOTTLENECK
├── posts.deactivate_old (0.6 seconds)
└── supabase insert (0.2 seconds)
```

**Now you know:** Upload is the bottleneck. Check image compression, network quality, etc.

### Debugging Errors in Production

```tsx
// Error appears in Honeycomb with full context:
// - userId: "user_456"
// - hasDescription: true
// - Duration: 3.2s
// - Status: ERROR
// - Error: "Network timeout"

// You can immediately:
// 1. See which users were affected (1 out of 1000)
// 2. Understand the operation chain
// 3. Identify the exact step that failed (upload)
// 4. Check if description length affected it
// 5. Roll back the change or push a fix
```

### Performance Monitoring Examples

```tsx
// Track screen load times
const HomeScreen = () => {
  useEffect(() => {
    withSpan("screen.home.load", async () => {
      const posts = await fetchPosts();
      setPosts(posts);
    }, { postCount: posts.length });
  }, []);
};

// Track user interactions
const likePost = async (postId: string) => {
  await withSpan("user.action.like_post", async () => {
    await updateLike(postId);
  }, { postId });
};

// Track background sync
const syncOfflineData = async () => {
  await withSpan("data.sync", async () => {
    const changes = await getOfflineChanges();
    await uploadChanges(changes);
  }, { changeCount: changes.length });
};
```

### Setting Up Alerts

**Critical alerts (page immediately):**
- Error rate > 10%
- App startup time > 5 seconds
- All API calls failing

**Warning alerts (check within an hour):**
- Error rate > 5%
- API response time > 2 seconds
- Crash rate increased 2x

**Info alerts (check in standup):**
- New slow operations appearing
- Performance regressions
- Unusual traffic patterns

### Honeycomb Best Practices

1. **Instrument before shipping** — Don't add observability after problems occur
2. **Use meaningful attributes** — userId, itemId, itemCount, hasDescription
3. **Track both success and failure** — Every span should have status
4. **Monitor P95 latency** — Average hides slow outliers
5. **Create dashboards** — Home dashboard, performance dashboard, error dashboard
6. **Query regularly** — Weekly review of slowest operations
7. **Share findings** — Show team what's actually happening in production

### Metrics to Track

| Metric | Target | Alert |
|--------|--------|-------|
| Error Rate | < 1% | > 5% |
| P95 API Latency | < 500ms | > 1000ms |
| App Cold Start | < 2s | > 4s |
| Network Timeout Rate | < 0.5% | > 2% |
| Screen Load Time | < 1s | > 2s |

---

## Best Practices

### Architecture & Organization

**✅ DO:**
- Organize with layers: screens (routing) → components (UI) → hooks (logic) → lib (data)
- Keep business logic in custom hooks, not components
- Centralize API calls in one place (lib/api/)
- Use separation of concerns: screens compose hooks, hooks call API/database

**❌ DON'T:**
- Mix UI code with API calls
- Put SQL/database queries in components
- Have API calls scattered across multiple files
- Use deeply nested folder structures (harder to find things)

### State Management

**✅ DO:**
- Use Context API for global state (auth, theme, user)
- Use TanStack Query for server state and caching
- Use useState for local UI state (form inputs, toggles)
- Persist important state (auth tokens) to AsyncStorage

**❌ DON'T:**
- Use Redux for small apps (Context is usually enough)
- Store server data in local state without caching
- Refetch the same data multiple times
- Forget to cache API responses

### Performance

**✅ DO:**
- Use FlashList instead of FlatList for long lists
- Use useMemo for expensive calculations
- Use useCallback for event handlers passed to children
- Compress images before upload
- Lazy load screens with code splitting

**❌ DON'T:**
- Render lists with `.map()` (use FlatList/FlashList)
- Create new objects/functions on every render
- Load all 50,000 items at once (use pagination)
- Ship uncompressed images
- Block main thread with synchronous operations

### Error Handling

**✅ DO:**
- Wrap your entire app in ErrorBoundary
- Use try/catch for async operations
- Show user-friendly error messages
- Log errors to monitoring service (Honeycomb)
- Handle network errors gracefully

**❌ DON'T:**
- Ignore errors (no empty catch blocks)
- Show technical error messages to users
- Crash the app on network failures
- Log sensitive data (passwords, tokens)
- Use console.log for production logging

### Dependencies & Libraries

**✅ DO:**
- Always use `pnpm add expo-<library>` for Expo packages
- Check Expo compatibility before adding a package
- Run `pnpx expo doctor` regularly
- Use official Expo libraries when available
- Read the documentation before using a package

**❌ DON'T:**
- Use `pnpm add` for Expo packages (wrong version)
- Use obscure packages with 10 downloads
- Ignore dependency warnings
- Mix bare React Native code in an Expo project
- Add unmaintained packages to your project

### Security

**✅ DO:**
- Store sensitive data (tokens, keys) in SecureStore, not AsyncStorage
- Use environment variables for secrets
- Validate user input
- Use HTTPS for all API calls
- Never commit .env files with secrets

**❌ DON'T:**
- Hardcode API keys in code
- Store passwords in local state
- Trust user input without validation
- Use HTTP for sensitive data
- Commit secrets to git

### Permissions

**✅ DO:**
- Always request permissions before using native features
- Explain why you need permissions (in app.json)
- Handle permission denials gracefully
- Request permissions at the right time (not on app start)
- Test on real devices with permissions disabled

**❌ DON'T:**
- Assume permissions are granted
- Request all permissions at once on startup
- Crash the app if permissions are denied
- Use features without requesting permissions
- Request unnecessary permissions

### Testing & Deployment

**✅ DO:**
- Test on real devices before release
- Use EAS Build for consistent builds
- Test with slow networks (throttle in DevTools)
- Monitor production with observability tools
- Create a staging environment first

**❌ DON'T:**
- Only test on simulators
- Deploy without testing
- Assume your internet speed is representative
- Ship without monitoring in place
- Push to production without staging

### Code Quality

**✅ DO:**
- Use TypeScript for type safety
- Write readable component names
- Add comments for complex logic
- Keep components small and focused
- Use meaningful variable names

**❌ DON'T:**
- Use `any` type everywhere
- Name components Component1, Component2
- Write giant 500-line components
- Use single-letter variable names (except in loops)
- Ignore TypeScript errors

---

## Troubleshooting

### App Won't Start

```bash
# Clear cache and restart
pnpx expo start --clear
```

**If still failing:**
```bash
# Reinstall dependencies
rm -rf node_modules pnpm-lock.yaml
pnpm install
```

### "Module not found" Errors

```bash
# Install with correct Expo version
pnpx expo install --fix

# If still broken, nuclear option:
rm -rf node_modules pnpm-lock.yaml
pnpm install
pnpm add expo@latest
pnpx expo install --fix
```

### Performance Issues

**Slow screens?**
- Check for unnecessary re-renders with React DevTools Profiler
- Use useMemo for expensive calculations
- Use useCallback for event handlers
- Replace FlatList with FlashList
- Compress images before loading

**Slow API calls?**
- Check network timing in Honeycomb
- Add request caching with TanStack Query
- Implement pagination for large lists
- Use CDN for images

**Memory leaks?**
- Clean up subscriptions in useEffect cleanup
- Cancel fetch requests when component unmounts
- Remove event listeners properly

### Dependency Issues

```bash
# Check for problems
pnpx expo doctor

# Update to new SDK version
pnpm add expo@latest
pnpx expo install --fix
pnpx expo doctor

# Rebuild native code
pnpx expo prebuild --clean
pnpx expo run:ios
```

### Native Module Issues

**"Native module not found"**
```bash
# Need development build for native modules
pnpx expo prebuild --clean
pnpx expo run:ios
```

**Dependency conflicts:**
- Check Expo compatibility at expo.io/go/libraries
- Use `pnpx expo doctor` to identify issues
- Consider switching to another library if incompatible

### Image/File Upload Issues

**Images not displaying:**
- Check file permissions in app.json
- Verify image URL is accessible
- Test with smaller images first
- Use expo-image instead of Image component

**Upload failures:**
- Check file size (compress if > 5MB)
- Verify permissions are granted
- Test on real device, not simulator
- Check network with Honeycomb

### Permissions Not Working

```bash
# iOS: Check Info.plist permissions
# Android: Check AndroidManifest.xml

# Rebuild after adding permissions
pnpx expo prebuild --clean
pnpx expo run:ios
```

**Testing:**
- Always test on real devices
- Test with permissions disabled
- Handle graceful degradation

### Crashing on Production

**Symptoms: App works locally but crashes in production**

**Root causes:**
- Outdated native dependencies
- Missing permissions in app.json
- Incompatible third-party packages
- Environment variable issues
- Network/timeout issues

**Solution:**
1. Check crash logs with Honeycomb/Sentry
2. Look at error attributes (device, OS, network)
3. Check recent dependency updates
4. Verify all permissions are configured
5. Test on variety of devices

### Common Production Issues

| Issue | Cause | Fix |
|-------|-------|-----|
| "Module not found in native code" | Wrong native setup | `pnpx expo prebuild --clean` |
| App slow after update | Dependency conflict | `pnpx expo doctor` |
| Permissions denied | Not requested | Ensure permissions in app.json |
| Images won't load | URL inaccessible | Check HTTPS, CORS headers |
| Network requests timeout | Slow network | Add retry logic, timeout handling |
| App crashes on startup | Native module issue | Check metro.config.js exports |
| Memory usage high | Unreleased resources | Check useEffect cleanup functions |

### When to Run expo doctor

- After updating Expo
- After adding new dependencies
- If you get strange errors
- Before deploying to production
- Weekly as preventive check

```bash
pnpx expo doctor
```

This will identify:
- Outdated dependencies
- Incompatible package versions
- Missing native configurations
- SDK upgrade compatibility

### Debugging Tips

**✅ DO:**
- Use Honeycomb for production debugging
- Check network tab for failed requests
- Use React DevTools Profiler for performance
- Test on real devices and real networks
- Keep detailed error logs

**❌ DON'T:**
- Rely only on console.log
- Test only on fast WiFi networks
- Assume simulator behavior matches real devices
- Ignore warnings from expo doctor
- Push updates without testing

---

## Real-Time Features (WebSockets & Subscriptions)

### WebSocket Basics

```tsx
import { useEffect, useState } from "react";
import { View, Text, FlatList } from "react-native";

export default function RealtimeChat() {
  const [messages, setMessages] = useState<string[]>([]);
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    // Connect to WebSocket server
    const ws = new WebSocket("wss://your-server.com/chat");

    ws.onopen = () => {
      console.log("Connected");
      setIsConnected(true);
      ws.send(JSON.stringify({ type: "join", userId: "user123" }));
    };

    ws.onmessage = (event) => {
      const message = JSON.parse(event.data);
      setMessages((prev) => [...prev, message.text]);
    };

    ws.onerror = (error) => {
      console.error("WebSocket error:", error);
      setIsConnected(false);
    };

    ws.onclose = () => {
      console.log("Disconnected");
      setIsConnected(false);
    };

    return () => ws.close();
  }, []);

  return (
    <View style={{ flex: 1 }}>
      <FlatList
        data={messages}
        keyExtractor={(_, i) => i.toString()}
        renderItem={({ item }) => <Text className="p-4">{item}</Text>}
      />
      {!isConnected && (
        <View className="bg-red-500 p-2">
          <Text className="text-white">Connection lost</Text>
        </View>
      )}
    </View>
  );
}
```

### Reconnection Strategy

```tsx
export function useWebSocket(url: string) {
  const [data, setData] = useState(null);
  const [isConnected, setIsConnected] = useState(false);
  const wsRef = useRef<WebSocket | null>(null);
  const reconnectTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const reconnectAttemptsRef = useRef(0);

  useEffect(() => {
    const connect = () => {
      try {
        const ws = new WebSocket(url);

        ws.onopen = () => {
          console.log("Connected");
          setIsConnected(true);
          reconnectAttemptsRef.current = 0;
        };

        ws.onmessage = (event) => {
          setData(JSON.parse(event.data));
        };

        ws.onclose = () => {
          setIsConnected(false);
          // Reconnect with exponential backoff
          const delay = Math.min(1000 * Math.pow(2, reconnectAttemptsRef.current), 30000);
          reconnectAttemptsRef.current++;
          reconnectTimeoutRef.current = setTimeout(connect, delay);
        };

        wsRef.current = ws;
      } catch (error) {
        console.error("WebSocket error:", error);
      }
    };

    connect();

    return () => {
      if (wsRef.current) wsRef.current.close();
      if (reconnectTimeoutRef.current) clearTimeout(reconnectTimeoutRef.current);
    };
  }, [url]);

  return { data, isConnected };
}
```

### Using Custom WebSocket Hook

```tsx
export default function ChatScreen() {
  const { data: message, isConnected } = useWebSocket("wss://api.example.com/chat");

  if (!isConnected) {
    return (
      <View className="flex-1 justify-center items-center">
        <Text>Connecting...</Text>
      </View>
    );
  }

  return (
    <View className="flex-1">
      <Text>{message}</Text>
    </View>
  );
}
```

### DO's and DON'Ts for Real-Time

**✅ DO:**
- Close WebSocket connections in cleanup
- Handle reconnection gracefully with exponential backoff
- Show loading/offline states
- Cache real-time data locally
- Unsubscribe/disconnect on unmount

**❌ DON'T:**
- Open multiple WebSocket connections
- Ignore connection errors
- Update state without validation
- Keep connections alive indefinitely
- Assume connection is always stable

---

## Animations (React Native Reanimated)

### Installation

```bash
pnpm add react-native-reanimated
pnpm add -D babel-plugin-react-native-reanimated
```

### Update babel.config.js

```javascript
module.exports = {
  presets: ["babel-preset-expo"],
  plugins: ["react-native-reanimated/plugin"],
};
```

### Basic Fade Animation

```tsx
import Animated, {
  FadeIn,
  FadeOut,
} from "react-native-reanimated";

export default function FadeScreen() {
  return (
    <Animated.View entering={FadeIn} exiting={FadeOut}>
      <Text>This fades in and out</Text>
    </Animated.View>
  );
}
```

### Slide Animation

```tsx
import Animated, {
  SlideInLeft,
  SlideOutRight,
} from "react-native-reanimated";

export default function SlideScreen() {
  return (
    <Animated.View entering={SlideInLeft} exiting={SlideOutRight}>
      <Text>Slides from left</Text>
    </Animated.View>
  );
}
```

### Gesture-Driven Animation

```tsx
import Animated, { useSharedValue } from "react-native-reanimated";
import { GestureHandlerRootView, PanGestureHandler } from "react-native-gesture-handler";

export default function DragScreen() {
  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);

  const onGestureEvent = Animated.useAnimatedGestureHandler({
    onStart: (_, ctx) => {
      ctx.startX = translateX.value;
      ctx.startY = translateY.value;
    },
    onActive: (event, ctx) => {
      translateX.value = ctx.startX + event.translationX;
      translateY.value = ctx.startY + event.translationY;
    },
  });

  const animatedStyle = Animated.useAnimatedStyle(() => ({
    transform: [
      { translateX: translateX.value },
      { translateY: translateY.value },
    ],
  }));

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <PanGestureHandler onGestureEvent={onGestureEvent}>
        <Animated.View style={[styles.box, animatedStyle]} />
      </PanGestureHandler>
    </GestureHandlerRootView>
  );
}
```

### DO's and DON'Ts for Animations

**✅ DO:**
- Use Reanimated for complex animations (runs on native thread)
- Keep animations under 60fps on real devices
- Cancel animations on unmount
- Test animations on real devices
- Use opacity instead of visibility for performance

**❌ DON'T:**
- Animate too many properties at once
- Use `setTimeout` for animations (use Reanimated)
- Create animations in render function
- Forget to add babel plugin
- Assume animation performance on simulator

---

## Push Notifications

### Installation

```bash
pnpm add expo-notifications
pnpm add expo-device
```

### Setup (iOS & Android)

```tsx
// src/lib/notifications.ts
import * as Notifications from "expo-notifications";
import * as Device from "expo-device";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
  }),
});

export async function registerPushNotifications(userId: string) {
  if (!Device.isDevice) {
    console.log("Must use physical device for push notifications");
    return;
  }

  const { status: existingStatus } = await Notifications.getPermissionsAsync();
  let finalStatus = existingStatus;

  if (existingStatus !== "granted") {
    const { status } = await Notifications.requestPermissionsAsync();
    finalStatus = status;
  }

  if (finalStatus !== "granted") {
    Alert.alert(
      "Permission Required",
      "Push notification permission is needed"
    );
    return;
  }

  const token = (await Notifications.getExpoPushTokenAsync()).data;
  console.log("Push token:", token);

  // Send token to your backend
  await fetch("https://your-api.com/register-push-token", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ userId, token }),
  });
}

export async function schedulePushNotification(seconds: number = 5) {
  await Notifications.scheduleNotificationAsync({
    content: {
      title: "Test Notification",
      body: "This is a test notification",
      data: { deepLink: "/(tabs)/profile" },
    },
    trigger: { seconds },
  });
}
```

### Listen for Notifications

```tsx
// src/app/_layout.tsx
import { useEffect } from "react";
import * as Notifications from "expo-notifications";
import { registerPushNotifications } from "@/lib/notifications";
import { useRouter } from "expo-router";

export default function RootLayout() {
  const router = useRouter();
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      registerPushNotifications(user.id);
    }
  }, [user]);

  useEffect(() => {
    // Handle notification when app is in foreground
    const subscription = Notifications.addNotificationResponseReceivedListener(
      (response) => {
        const deepLink = response.notification.request.content.data.deepLink;
        if (deepLink) {
          router.push(deepLink);
        }
      }
    );

    return () => subscription.remove();
  }, []);

  return <Stack />;
}
```

### DO's and DON'Ts for Push Notifications

**✅ DO:**
- Request permissions explicitly
- Store push tokens securely
- Send notifications from backend only
- Handle notification taps
- Test on real devices

**❌ DON'T:**
- Spam users with notifications
- Send notifications without permission
- Store sensitive data in notifications
- Forget to handle notification responses
- Use simulator for testing

---

## Offline-First Development

### Setup AsyncStorage for Caching

```bash
pnpm add @react-native-async-storage/async-storage
pnpm add @react-query/async-storage-persister
```

### Persist Queries with TanStack Query

```tsx
import { useQuery } from "@tanstack/react-query";
import { createAsyncStoragePersister } from "@react-query/async-storage-persister";
import AsyncStorage from "@react-native-async-storage/async-storage";

const asyncStoragePersister = createAsyncStoragePersister({
  storage: AsyncStorage,
});

export function useFetchPosts() {
  return useQuery({
    queryKey: ["posts"],
    queryFn: async () => {
      const response = await fetch("https://api.example.com/posts");
      return response.json();
    },
    // Persists to device storage
    gcTime: 1000 * 60 * 60 * 24, // 24 hours
  });
}
```

### Detect Network Status

```bash
pnpm add @react-native-netinfo/netinfo
```

```tsx
import { useNetInfo } from "@react-native-netinfo/netinfo";
import { useEffect, useState } from "react";

export default function OfflineApp() {
  const netInfo = useNetInfo();
  const [queuedActions, setQueuedActions] = useState<Action[]>([]);

  useEffect(() => {
    // When network comes back online
    if (netInfo.isConnected && queuedActions.length > 0) {
      syncQueuedActions();
    }
  }, [netInfo.isConnected]);

  const syncQueuedActions = async () => {
    for (const action of queuedActions) {
      try {
        await action.execute();
      } catch (error) {
        console.error("Sync failed:", error);
      }
    }
    setQueuedActions([]);
  };

  if (!netInfo.isConnected) {
    return (
      <View className="flex-1 justify-center items-center">
        <Text>You're offline. Changes will sync when connected.</Text>
      </View>
    );
  }

  return <YourApp />;
}
```

### Queue Actions While Offline

```tsx
// src/lib/offline-queue.ts
import AsyncStorage from "@react-native-async-storage/async-storage";

interface QueuedAction {
  id: string;
  type: "create" | "update" | "delete";
  payload: any;
  timestamp: number;
}

export async function queueAction(action: QueuedAction) {
  const queue = await getQueue();
  queue.push(action);
  await AsyncStorage.setItem("offline-queue", JSON.stringify(queue));
}

export async function getQueue(): Promise<QueuedAction[]> {
  const queue = await AsyncStorage.getItem("offline-queue");
  return queue ? JSON.parse(queue) : [];
}

export async function executeQueue() {
  const queue = await getQueue();

  for (const action of queue) {
    try {
      await executeAction(action);
      await removeFromQueue(action.id);
    } catch (error) {
      console.error("Failed to execute action:", error);
    }
  }
}

async function executeAction(action: QueuedAction) {
  // Execute on your backend
  const response = await fetch("https://api.example.com/sync", {
    method: "POST",
    body: JSON.stringify(action),
  });

  if (!response.ok) throw new Error("Sync failed");
}
```

### DO's and DON'Ts for Offline-First

**✅ DO:**
- Cache data locally with AsyncStorage
- Check network before critical operations
- Queue actions while offline
- Show clear offline indicators
- Sync when connection returns

**❌ DON'T:**
- Assume user always has connection
- Lose data if sync fails
- Queue actions indefinitely
- Sync without user knowledge
- Ignore network errors

---

## Advanced API Patterns

### Error Handling with Retry Logic

```tsx
async function fetchWithRetry(
  url: string,
  options: RequestInit = {},
  maxRetries: number = 3
): Promise<Response> {
  let lastError: Error | null = null;

  for (let i = 0; i < maxRetries; i++) {
    try {
      const response = await fetch(url, options);

      if (response.ok) return response;

      if (response.status === 429 || response.status >= 500) {
        // Retry on server errors and rate limits
        const delay = Math.pow(2, i) * 1000; // Exponential backoff
        await new Promise((resolve) => setTimeout(resolve, delay));
        continue;
      }

      throw new Error(`HTTP ${response.status}`);
    } catch (error) {
      lastError = error as Error;
      if (i < maxRetries - 1) {
        const delay = Math.pow(2, i) * 1000;
        await new Promise((resolve) => setTimeout(resolve, delay));
      }
    }
  }

  throw lastError || new Error("Max retries exceeded");
}
```

### Intercepting Requests with Axios

```bash
pnpm add axios
```

```tsx
import axios from "axios";

const api = axios.create({
  baseURL: "https://api.example.com",
  timeout: 10000,
});

// Add auth token to every request
api.interceptors.request.use((config) => {
  const token = getAuthToken(); // Get from secure storage
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Handle 401 errors
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      // Token expired, try to refresh
      const newToken = await refreshAuthToken();
      if (newToken) {
        error.config.headers.Authorization = `Bearer ${newToken}`;
        return api(error.config);
      } else {
        // Redirect to login
        router.push("/(auth)/login");
      }
    }
    return Promise.reject(error);
  }
);

export default api;
```

### Request Debouncing

```tsx
export function useSearchPosts(query: string) {
  const [results, setResults] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      return;
    }

    // Debounce search requests
    const timer = setTimeout(async () => {
      setIsLoading(true);
      try {
        const response = await fetch(`/api/posts/search?q=${query}`);
        const data = await response.json();
        setResults(data);
      } finally {
        setIsLoading(false);
      }
    }, 500); // Wait 500ms after user stops typing

    return () => clearTimeout(timer);
  }, [query]);

  return { results, isLoading };
}
```

### DO's and DON'Ts for Advanced API

**✅ DO:**
- Implement retry logic with exponential backoff
- Add request/response interceptors
- Handle token refresh gracefully
- Debounce search requests
- Set reasonable timeouts

**❌ DON'T:**
- Make API calls without error handling
- Retry indefinitely
- Store tokens in AsyncStorage (use SecureStore)
- Make duplicate API calls
- Ignore rate limits

---

## Deep Linking

### Set Up Deep Links in app.json

```json
{
  "expo": {
    "scheme": "myapp",
    "plugins": [
      [
        "expo-router",
        {
          "origin": "https://myapp.com"
        }
      ]
    ]
  }
}
```

### Handle Deep Links

```tsx
// src/app/_layout.tsx
import { useEffect } from "react";
import { useRouter } from "expo-router";
import * as Linking from "expo-linking";

const linking = {
  prefixes: ["myapp://", "https://myapp.com"],
  config: {
    screens: {
      "(tabs)": {
        screens: {
          index: "feed",
          profile: "profile/:userId",
        },
      },
      "(auth)": {
        screens: {
          login: "auth/login",
          signup: "auth/signup",
        },
      },
      NotFound: "*",
    },
  },
};

export default function RootLayout() {
  const router = useRouter();

  useEffect(() => {
    // Handle deep link when app is opened
    const subscription = Linking.addEventListener("url", ({ url }) => {
      const route = url.replace(/.*?:\/\//g, "");
      router.push(route);
    });

    return () => subscription.remove();
  }, [router]);

  return <Stack linking={linking} />;
}
```

### Test Deep Links

```bash
# Test from terminal
adb shell am start -W -a android.intent.action.VIEW -d "myapp://profile/user123" com.example.app

# iOS Simulator
xcrun simctl openurl booted myapp://profile/user123
```

### DO's and DON'Ts for Deep Linking

**✅ DO:**
- Test deep links on real devices
- Handle deep links on app startup
- Validate route parameters
- Show 404 for invalid routes
- Support both custom schemes and universal links

**❌ DON'T:**
- Use sensitive data in deep links
- Forget to test edge cases
- Break existing routes with new deep links
- Use hardcoded URLs

---

## EAS Update (Over-the-Air Updates)

### Installation

```bash
pnpm add expo-updates
pnpm add eas-cli -D
```

### Configure EAS

```bash
pnpx eas init
pnpx eas update configure
```

### Create eas.json

```json
{
  "cli": {
    "version": ">= 5.0.0"
  },
  "build": {
    "production": {
      "channel": "production",
      "distribution": "store"
    },
    "preview": {
      "channel": "preview",
      "distribution": "internal"
    }
  },
  "submit": {
    "production": {
      "ios": {},
      "android": {}
    }
  }
}
```

### Check for Updates in App

```tsx
import * as Updates from "expo-updates";
import { useEffect, useState } from "react";

export default function App() {
  const [updateAvailable, setUpdateAvailable] = useState(false);

  useEffect(() => {
    async function checkForUpdates() {
      try {
        const update = await Updates.checkAsync();
        if (update.isAvailable) {
          setUpdateAvailable(true);
        }
      } catch (error) {
        console.error("Failed to check for updates:", error);
      }
    }

    checkForUpdates();
  }, []);

  const downloadAndRestart = async () => {
    try {
      await Updates.fetchUpdateAsync();
      await Updates.reloadAsync();
    } catch (error) {
      console.error("Failed to update:", error);
    }
  };

  if (updateAvailable) {
    return (
      <View className="flex-1 justify-center items-center">
        <Text className="text-lg mb-4">A new version is available!</Text>
        <TouchableOpacity
          className="bg-blue-500 px-6 py-3 rounded-lg"
          onPress={downloadAndRestart}
        >
          <Text className="text-white font-bold">Update Now</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return <YourApp />;
}
```

### Publish Updates

```bash
# Publish to production
pnpx eas update --channel production

# Publish to preview
pnpx eas update --channel preview
```

### DO's and DON'Ts for EAS Update

**✅ DO:**
- Use channels for staging/preview before production
- Test updates on real devices
- Monitor update success rates
- Rollback failed updates
- Communicate updates to users

**❌ DON'T:**
- Push broken updates to production
- Skip testing on real devices
- Update too frequently (confuses users)
- Break app compatibility with updates
- Forget to increment version numbers

---

## Background Tasks

### Setup Background Processing

```bash
pnpm add expo-background-fetch
pnpm add expo-task-manager
```

### Define Background Task

```tsx
// src/lib/background-tasks.ts
import * as BackgroundFetch from "expo-background-fetch";
import * as TaskManager from "expo-task-manager";

const BACKGROUND_FETCH_TASK = "background-sync";

TaskManager.defineTask(BACKGROUND_FETCH_TASK, async () => {
  try {
    // Sync data in background
    const posts = await fetchNewPosts();
    await savePosts(posts);

    return BackgroundFetch.BackgroundFetchResult.NewData;
  } catch (error) {
    return BackgroundFetch.BackgroundFetchResult.Failed;
  }
});

export async function registerBackgroundFetch() {
  try {
    await BackgroundFetch.registerTaskAsync(BACKGROUND_FETCH_TASK, {
      minimumInterval: 60 * 15, // 15 minutes
      stopOnTerminate: false,
      startOnBoot: true,
    });

    console.log("Background fetch registered");
  } catch (error) {
    console.error("Failed to register background fetch:", error);
  }
}

export async function unregisterBackgroundFetch() {
  try {
    await BackgroundFetch.unregisterTaskAsync(BACKGROUND_FETCH_TASK);
    console.log("Background fetch unregistered");
  } catch (error) {
    console.error("Failed to unregister:", error);
  }
}
```

### Register on App Start

```tsx
// src/app/_layout.tsx
import { registerBackgroundFetch } from "@/lib/background-tasks";

export default function RootLayout() {
  useEffect(() => {
    registerBackgroundFetch();
  }, []);

  return <Stack />;
}
```

### DO's and DON'Ts for Background Tasks

**✅ DO:**
- Use background tasks for non-urgent syncing
- Set reasonable intervals (15+ minutes)
- Handle task failures gracefully
- Test on real devices
- Clean up tasks when unneeded

**❌ DON'T:**
- Use background tasks for time-critical operations
- Set intervals too short (drains battery)
- Assume background tasks always run
- Perform heavy operations in background
- Ignore battery optimization settings

---