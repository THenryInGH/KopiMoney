import React, { useState, useEffect, useCallback } from 'react';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import * as SplashScreen from 'expo-splash-screen';

import AppNavigation from './src/navigation/AppNavigation';
import { configureNotifications } from './src/services/NotificationService';
import { polyfillCrypto } from './src/utils/uuidPolyfill';

// Prevent the splash screen from auto-hiding
SplashScreen.preventAutoHideAsync().catch(() => {
  /* reloading the app might trigger some race conditions, ignore them */
});

export default function App() {
  const [appIsReady, setAppIsReady] = useState(false);

  // Prepare app by setting up notifications and services
  useEffect(() => {
    async function prepare() {
      try {
        // Apply the crypto polyfill for UUID
        polyfillCrypto();
        
        // Configure notifications when app starts
        await configureNotifications();
        
        // Any other initialization tasks here
      } catch (e) {
        console.warn(e);
      } finally {
        // Tell the application to render
        setAppIsReady(true);
      }
    }

    prepare();
  }, []);

  // Hide the splash screen once app is ready
  const onLayoutRootView = useCallback(async () => {
    if (appIsReady) {
      await SplashScreen.hideAsync();
    }
  }, [appIsReady]);

  if (!appIsReady) {
    return null;
  }

  return (
    <SafeAreaProvider onLayout={onLayoutRootView}>
      <StatusBar style="auto" />
      <AppNavigation />
    </SafeAreaProvider>
  );
}
