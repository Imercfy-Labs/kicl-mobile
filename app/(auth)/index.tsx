import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Platform } from 'react-native';
import { useRouter } from 'expo-router';
import { useAuth } from '../auth/AuthContext';

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();
  const { login, isLoading } = useAuth();

  const handleLogin = async () => {
    try {
      setError('');
      await login(email, password);
      router.replace('/(tabs)/');
    } catch (error: any) {
      setError(error.message || 'Invalid email or password');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome!</Text>
      
      <View style={styles.form}>
        {error ? <Text style={styles.errorText}>{error}</Text> : null}
        
        <Text style={styles.label}>Email:</Text>
        <TextInput
          style={[styles.input, error && styles.inputError]}
          placeholder="Enter your email"
          value={email}
          onChangeText={(text) => {
            setEmail(text);
            setError('');
          }}
          autoCapitalize="none"
          keyboardType="email-address"
        />

        <Text style={styles.label}>Password:</Text>
        <TextInput
          style={[styles.input, error && styles.inputError]}
          placeholder="Enter your Password"
          value={password}
          onChangeText={(text) => {
            setPassword(text);
            setError('');
          }}
          secureTextEntry
        />

        <TouchableOpacity 
          onPress={() => router.push('/forgot-password')}
          style={styles.forgotPassword}
        >
          <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={[styles.button, isLoading && styles.buttonDisabled]}
          onPress={handleLogin}
          disabled={isLoading}
        >
          <Text style={styles.buttonText}>Login</Text>
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
    justifyContent: 'flex-start',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginTop: Platform.OS === 'ios' ? 60 : 40,
    marginBottom: 40,
  },
  form: {
    width: '100%',
  },
  errorText: {
    color: '#FF3B30',
    fontSize: 14,
    marginBottom: 16,
    textAlign: 'center',
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
  inputError: {
    borderWidth: 1,
    borderColor: '#FF3B30',
  },
  forgotPassword: {
    alignSelf: 'flex-end',
    marginBottom: 30,
  },
  forgotPasswordText: {
    color: '#007AFF',
    fontSize: 14,
  },
  button: {
    width: '100%',
    height: 50,
    backgroundColor: '#8CC63F',
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonDisabled: {
    opacity: 0.7,
  },
  buttonText: {
    color: '#000000',
    fontSize: 16,
    fontWeight: '600',
  },
});