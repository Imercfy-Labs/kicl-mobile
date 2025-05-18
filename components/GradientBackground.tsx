import React from 'react';
import { View, StyleSheet, Platform, Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

interface GradientBackgroundProps {
  children: React.ReactNode;
  style?: object;
}

export default function GradientBackground({ children, style }: GradientBackgroundProps) {
  return (
    <LinearGradient
      colors={['#3DD39E', '#B6E388']}
      style={[styles.gradient, style]}
      start={{ x: 0, y: 0 }}
      end={{ x: 0, y: 1 }}
    >
      <View style={styles.container}>
        <View style={styles.content}>
          {children}
        </View>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    padding: Platform.OS === 'web' ? 20 : 0,
  },
  content: {
    width: '100%',
    maxWidth: Platform.OS === 'web' ? Math.min(Dimensions.get('window').width - 40, 600) : undefined,
    flex: 1,
  },
});