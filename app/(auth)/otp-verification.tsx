import React, { useState, useRef } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Platform } from 'react-native';
import { useRouter } from 'expo-router';
import { ArrowLeft } from 'lucide-react-native';

export default function OTPVerificationScreen() {
  const [otp, setOtp] = useState(['', '', '', '']);
  const router = useRouter();
  const inputRefs = useRef([]);

  const handleOtpChange = (value: string, index: number) => {
    if (value.length <= 1) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);
      
      // Move to next input if value is entered
      if (value !== '' && index < 3) {
        inputRefs.current[index + 1].focus();
      }
    }
  };

  const handleVerify = () => {
    // Show success message
    router.push('/otp-success');
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity 
        onPress={() => router.back()} 
        style={styles.backButton}
      >
        <ArrowLeft size={24} color="#000" />
      </TouchableOpacity>

      <Text style={styles.title}>OTP Verification</Text>
      <Text style={styles.subtitle}>
        Enter the verification code we just sent on your Admin's mobile number.
      </Text>

      <View style={styles.otpContainer}>
        {otp.map((digit, index) => (
          <TextInput
            key={index}
            ref={ref => inputRefs.current[index] = ref}
            style={styles.otpInput}
            value={digit}
            onChangeText={(value) => handleOtpChange(value, index)}
            keyboardType="number-pad"
            maxLength={1}
          />
        ))}
      </View>

      <TouchableOpacity 
        style={styles.button}
        onPress={handleVerify}
      >
        <Text style={styles.buttonText}>Verify</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.resendContainer}>
        <Text style={styles.resendText}>
          Didn't received code? <Text style={styles.resendLink}>Resend</Text>
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  backButton: {
    marginTop: Platform.OS === 'ios' ? 40 : 20,
    marginBottom: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  subtitle: {
    fontSize: 14,
    color: '#666',
    marginBottom: 40,
  },
  otpContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 40,
  },
  otpInput: {
    width: 70,
    height: 70,
    backgroundColor: '#F3F3F3',
    borderRadius: 12,
    fontSize: 24,
    textAlign: 'center',
  },
  button: {
    width: '100%',
    height: 50,
    backgroundColor: '#8CC63F',
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: '#000000',
    fontSize: 16,
    fontWeight: '600',
  },
  resendContainer: {
    marginTop: 30,
    alignItems: 'center',
  },
  resendText: {
    fontSize: 14,
    color: '#666',
  },
  resendLink: {
    color: '#007AFF',
    fontWeight: '500',
  },
});