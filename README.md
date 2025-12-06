⭐ Luxurious – Getting Started Guide

This is a new React Native project, bootstrapped using
@react-native-community/cli
.

Getting Started

Note: Make sure you have completed the
👉 Set Up Your Environment

guide before proceeding.

Step 1: Install Dependencies
# Using npm
npm install

# OR using Yarn
yarn

Step 2: Start Metro

Metro is the JavaScript bundler for React Native.

# Using npm
npm start

# OR using Yarn
yarn start

Step 3: Build and Run Your App

Open a new terminal and run the app on Android:

Android
# Using npm
npm run android

# OR using Yarn
yarn android


If everything is set up correctly, your app will launch on an Android device or emulator.

⚠️ Android Build Issues? (AsyncStorage / Duplicate classes / Gradle errors)

If you get errors such as:

AsyncStorage not found

Duplicate classes

Cannot find symbol

Execution failed for task :app:mergeDebugNativeLibs

Gradle cache issues

Run this in PowerShell:

Push-Location android; 
Remove-Item -Recurse -Force .\build, .\app\build, .\.cxx, .\.gradle -ErrorAction SilentlyContinue; 
.\gradlew.bat clean; 
Pop-Location


This fully clears Android build cache and fixes 90% RN Android build errors.

Step 4: Modify Your App

Edit:

App.tsx


Save and the app will update automatically using Fast Refresh.

📚 Libraries Used
Navigation

@react-navigation/native

@react-navigation/native-stack

react-native-screens

react-native-safe-area-context

State Management

@reduxjs/toolkit

react-redux

UI / Layout

react-native-paper

react-native-responsive-dimensions

Storage / Device

@react-native-async-storage/async-storage

@react-native-documents/picker

RN Internal

@react-native/new-app-screen

Dev Tools

TypeScript

Babel

Jest

ESLint

Prettier

📝 Notes on My Approach

Used React Native CLI for complete native control (no Expo).

Clean modular folder structure (screens, components, redux, navigation, utils).

Global state handled using Redux Toolkit for simplicity & scalability.

UI built using react-native-paper + responsive dimensions for consistent layouts.

Performance optimizations with:

React.memo

useCallback

optimized FlatLists

minimal re-renders

Used AsyncStorage for light caching and storing small user data.

Maintained clean code standards with ESLint + Prettier and function-level comments.

🎉 Congratulations!

You’ve successfully set up and run the Luxurious React Native App.
Feel free to expand features and improve UI.
