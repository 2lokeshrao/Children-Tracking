import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';

export default function RootLayout() {
  return (
    <>
      <StatusBar style="dark" />
      <Stack
        screenOptions={{
          headerShown: false,
          contentStyle: { backgroundColor: '#F8FAFC' },
        }}
      >
        <Stack.Screen name="index" />
        <Stack.Screen name="login" />
        <Stack.Screen name="register" />
        <Stack.Screen name="dashboard" />
        <Stack.Screen name="link-device" />
        <Stack.Screen name="geofence" />
        <Stack.Screen name="screen-time" />
        <Stack.Screen name="app-usage" />
      </Stack>
    </>
  );
}
