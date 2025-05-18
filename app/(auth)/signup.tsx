import React, { useState } from 'react';
import { View, Text, StyleSheet, Keyboard, TouchableWithoutFeedback, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import GradientBackground from '@/components/GradientBackground';
import FormInput from '@/components/FormInput';
import Button from '@/components/Button';
import { useAuth } from '../auth/AuthContext';

const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

export default function SignupScreen() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState<{
    name?: string;
    email?: string;
    password?: string;
    confirmPassword?: string;
  }>({});
  
  const router = useRouter();
  const { signup, isLoading } = useAuth();
  
  const validate = () => {
    Keyboard.dismiss();
    let isValid = true;
    const newErrors: {
      name?: string;
      email?: string;
      password?: string;
      confirmPassword?: string;
    } = {};
    
    if (!name.trim()) {
      newErrors.name = 'Name is required';
      isValid = false;
    }
    
    if (!email.trim()) {
      newErrors.email = 'Email is required';
      isValid = false;
    } else if (!EMAIL_REGEX.test(email)) {
      newErrors.email = 'Please enter a valid email address';
      isValid = false;
    }
    
    if (!password) {
      newErrors.password = 'Password is required';
      isValid = false;
    } else if (password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
      isValid = false;
    } else if (!/[A-Z]/.test(password)) {
      newErrors.password = 'Password must contain at least one uppercase letter';
      isValid = false;
    } else if (!/[a-z]/.test(password)) {
      newErrors.password = 'Password must contain at least one lowercase letter';
      isValid = false;
    } else if (!/[0-9]/.test(password)) {
      newErrors.password = 'Password must contain at least one number';
      isValid = false;
    }
    
    if (password !== confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
      isValid = false;
    }
    
    setErrors(newErrors);
    return isValid;
  };
  
  const handleSignup = async () => {
    if (validate()) {
      try {
        await signup({ name, email, password });
        router.replace('/(tabs)/');
      } catch (error) {
        // Error is handled in the AuthContext
      }
    }
  };
  
  return (
    <GradientBackground>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.container}>
            <Text style={styles.title}>Create Account</Text>
            
            <FormInput
              label="Full Name"
              placeholder="Enter your full name"
              value={name}
              onChangeText={(text) => {
                setName(text);
                setErrors((prev) => ({ ...prev, name: undefined }));
              }}
              error={errors.name}
              containerStyle={styles.inputContainer}
            />
            
            <FormInput
              label="Email"
              placeholder="Enter your email"
              value={email}
              onChangeText={(text) => {
                setEmail(text);
                setErrors((prev) => ({ ...prev, email: undefined }));
              }}
              error={errors.email}
              keyboardType="email-address"
              autoCapitalize="none"
              containerStyle={styles.inputContainer}
            />
            
            <FormInput
              label="Password"
              placeholder="Create a password"
              value={password}
              onChangeText={(text) => {
                setPassword(text);
                setErrors((prev) => ({ ...prev, password: undefined }));
              }}
              secureTextEntry
              error={errors.password}
              containerStyle={styles.inputContainer}
            />
            
            <FormInput
              label="Confirm Password"
              placeholder="Confirm your password"
              value={confirmPassword}
              onChangeText={(text) => {
                setConfirmPassword(text);
                setErrors((prev) => ({ ...prev, confirmPassword: undefined }));
              }}
              secureTextEntry
              error={errors.confirmPassword}
              containerStyle={styles.inputContainer}
            />
            
            <Button 
              title="Sign Up" 
              onPress={handleSignup} 
              style={styles.signupButton}
              loading={isLoading}
              disabled={isLoading}
            />
            
            <View style={styles.loginContainer}>
              <Text style={styles.loginText}>Already have an account? </Text>
              <TouchableWithoutFeedback onPress={() => router.back()}>
                <Text style={styles.loginLink}>Login</Text>
              </TouchableWithoutFeedback>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </ScrollView>
    </GradientBackground>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 30,
    textAlign: 'center',
  },
  inputContainer: {
    marginBottom: 20,
  },
  signupButton: {
    marginTop: 20,
  },
  loginContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
    marginBottom: 20,
  },
  loginText: {
    fontSize: 14,
  },
  loginLink: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#2E3192',
  },
});