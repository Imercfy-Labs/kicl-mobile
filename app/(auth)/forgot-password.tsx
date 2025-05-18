import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Platform } from 'react-native';
import { useRouter } from 'expo-router';
import { ArrowLeft } from 'lucide-react-native';

export default function CreatePasswordScreen() {
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const router = useRouter();

  const handleContinue = () => {
    router.push('/otp-verification');
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity 
        onPress={() => router.back()} 
        style={styles.backButton}
      >
        <ArrowLeft size={24} color="#000" />
      </TouchableOpacity>

      <Text style={styles.title}>Create Password</Text>
      <Text style={styles.subtitle}>
        Your new password must be unique from those previously used.
      </Text>

      <View style={styles.form}>
        <Text style={styles.label}>New Password:</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter New Password"
          value={newPassword}
          onChangeText={setNewPassword}
          secureTextEntry
        />

        <Text style={styles.label}>Confirm Password:</Text>
        <TextInput
          style={styles.input}
          placeholder="Confirm Your New Password"
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          secureTextEntry
        />

        <TouchableOpacity 
          style={styles.button}
          onPress={handleContinue}
        >
          <Text style={styles.buttonText}>Continue</Text>
        </TouchableOpacity>
      </View>
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
  form: {
    width: '100%',
  },
  label: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 8,
  },
  input: {
    width: '100%',
    height: 50,
    backgroundColor: '#F3F3F3',
    borderRadius: 25,
    paddingHorizontal: 20,
    marginBottom: 20,
    fontSize: 16,
  },
  button: {
    width: '100%',
    height: 50,
    backgroundColor: '#8CC63F',
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: {
    color: '#000000',
    fontSize: 16,
    fontWeight: '600',
  },
});