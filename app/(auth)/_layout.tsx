import React from 'react';
import { Stack } from 'expo-router';

export default function AuthLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" />
      <Stack.Screen name="signup" options={{ presentation: 'modal' }} />
      <Stack.Screen name="forgot-password" options={{ presentation: 'modal' }} />
    </Stack>
  );
}