import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { Check } from 'lucide-react-native';

export default function OTPSuccessScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.successIcon}>
        <Check size={40} color="#fff" />
      </View>
      
      <Text style={styles.message}>
        The OTP have been successfully sent to your Admin's Mobile number
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  successIcon: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#8CC63F',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
  },
  message: {
    fontSize: 16,
    textAlign: 'center',
    color: '#333',
    maxWidth: 300,
    lineHeight: 24,
  },
});