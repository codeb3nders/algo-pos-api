import ModalHeaderText from '@/components/ModalHeaderText';
import { Ionicons } from '@expo/vector-icons';
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { SplashScreen, Stack, router } from 'expo-router';
import React from 'react';
import { useEffect } from 'react';
import { TouchableOpacity, useColorScheme } from 'react-native';
import { Colors } from 'react-native/Libraries/NewAppScreen';

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from 'expo-router';

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: '(tabs)',
};

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    mon: require('../assets/fonts/Montserrat-Regular.ttf'),
    'mon-sb': require('../assets/fonts/Montserrat-SemiBold.ttf'),
    'mon-b': require('../assets/fonts/Montserrat-Bold.ttf'),
  });

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return <RootLayoutNav />;
}

function RootLayoutNav() {
  const colorScheme = useColorScheme();

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <Stack>
        {/* <Stack.Screen name="(tabs)" options={{ headerShown: false }} /> */}
        {/* <Stack.Screen name="listing/[id]" options={{ headerTitle: '' }} /> */}
        <Stack.Screen
          name="(modals)/login"
          options={{
            presentation: 'modal',
            animation: 'fade',
            headerTransparent: true,
            title: 'Login or Signup',
          }}
        />
        <Stack.Screen
          name="(modals)/booking"
          options={{
            presentation: 'modal',
            animation: 'fade',
            headerTransparent: true,
            headerTitle: (props) => <ModalHeaderText />,
            headerLeft: () => (
              <TouchableOpacity
                onPress={() => router.back()}
                style={{
                  backgroundColor: '#fff',
                  borderColor: Colors.grey,
                  borderRadius: 20,
                  borderWidth: 1,
                  padding: 4,
                }}
              >
                <Ionicons name="close-outline" size={22} />
              </TouchableOpacity>
            ),
          }}
        />
      </Stack>
    </ThemeProvider>
  );
}
