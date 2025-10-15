import { Stack } from 'expo-router';

export default function FamilyLinkLayout() {
  return (
    <Stack
      screenOptions={{
        headerStyle: {
          backgroundColor: '#10b981',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}
    >
      <Stack.Screen
        name="index"
        options={{
          title: 'Family Link',
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="consent"
        options={{
          title: 'Consent',
        }}
      />
      <Stack.Screen
        name="link"
        options={{
          title: 'Link Device',
        }}
      />
      <Stack.Screen
        name="home"
        options={{
          title: 'Home',
        }}
      />
      <Stack.Screen
        name="transparency"
        options={{
          title: 'Transparency',
        }}
      />
    </Stack>
  );
}
