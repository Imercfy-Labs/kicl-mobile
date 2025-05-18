import * as SecureStore from 'expo-secure-store';
import { Platform } from 'react-native';

// For web platform, use localStorage as a fallback
const webStore = {
  setItem: async (key: string, value: string) => {
    try {
      localStorage.setItem(key, value);
    } catch (error) {
      console.error('Error storing data:', error);
    }
  },
  
  getItem: async (key: string) => {
    try {
      return localStorage.getItem(key);
    } catch (error) {
      console.error('Error retrieving data:', error);
      return null;
    }
  },
  
  removeItem: async (key: string) => {
    try {
      localStorage.removeItem(key);
    } catch (error) {
      console.error('Error removing data:', error);
    }
  }
};

// Use SecureStore for native platforms, localStorage for web
export const secureStore = Platform.OS === 'web' ? webStore : SecureStore;