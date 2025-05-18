import React, { useEffect } from 'react';
import { View, StyleSheet, Dimensions, Platform } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Redirect } from 'expo-router';
import Logo from '@/components/Logo';
import Animated, { 
  useAnimatedStyle, 
  withSpring, 
  withTiming,
  useSharedValue
} from 'react-native-reanimated';

export default function SplashScreen() {
  const opacity = useSharedValue(0);
  const scale = useSharedValue(0.8);
  
  useEffect(() => {
    opacity.value = withTiming(1, { duration: 1000 });
    scale.value = withSpring(1, { damping: 15 });
  }, []);
  
  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
    transform: [{ scale: scale.value }]
  }));

  // Redirect after animation
  useEffect(() => {
    const timer = setTimeout(() => {
      opacity.value = withTiming(0, { duration: 500 });
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  if (opacity.value === 0) {
    return <Redirect href="/(auth)/" />;
  }

  return (
    <LinearGradient
      colors={['#3DD39E', '#B6E388']}
      style={styles.container}
      start={{ x: 0, y: 0 }}
      end={{ x: 0, y: 1 }}
    >
      <Animated.View style={[styles.logoContainer, animatedStyle]}>
        <Logo size="large" />
      </Animated.View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: Platform.OS === 'web' ? '100vh' : '100%',
  },
  logoContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    width: Platform.OS === 'web' ? 
      Math.min(Dimensions.get('window').width * 0.8, 400) : 
      Dimensions.get('window').width * 0.8,
  }
});