import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

interface LogoProps {
  showText?: boolean;
  size?: 'small' | 'medium' | 'large';
}

export default function Logo({ showText = true, size = 'medium' }: LogoProps) {
  const logoSize = size === 'small' ? 40 : size === 'medium' ? 60 : 100;
  
  return (
    <View style={styles.container}>
      <View style={[styles.logoContainer, { width: logoSize, height: logoSize }]}>
        <Image 
          source={{ uri: 'https://images.pexels.com/photos/2123375/pexels-photo-2123375.jpeg' }}
          style={[styles.logo, { width: logoSize * 0.7, height: logoSize * 0.7 }]}
          resizeMode="contain"
        />
      </View>
      {showText && (
        <View style={styles.textContainer}>
          <Text style={styles.title}>TK TECH KOTHARI</Text>
          <Text style={styles.subtitle}>A UNIT OF KOTHARI INDUSTRIAL CORPORATION LIMITED</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  logoContainer: {
    backgroundColor: '#2E3192',
    borderRadius: 100,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    tintColor: '#FFFFFF',
  },
  textContainer: {
    alignItems: 'center',
    marginTop: 8,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2E3192',
  },
  subtitle: {
    fontSize: 8,
    color: '#2E3192',
    textAlign: 'center',
    marginTop: 2,
  },
});