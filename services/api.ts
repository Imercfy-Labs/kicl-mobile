import Constants from 'expo-constants';
import { Platform } from 'react-native';

const API_URL = Constants.expoConfig?.extra?.apiUrl || 'https://devkicl.duckdns.org/api';

interface ApiResponse<T> {
  data?: T;
  error?: string;
}

interface LoginResponse {
  token: string;
  user: {
    id: string;
    name: string;
    email: string;
    role: string;
    branch_id: string;
  };
}

async function handleResponse<T>(response: Response): Promise<ApiResponse<T>> {
  try {
    const contentType = response.headers.get('content-type');
    const isJson = contentType?.includes('application/json');
    const data = isJson ? await response.json() : await response.text();

    if (!response.ok) {
      const errorMessage = isJson && data.message ? data.message : `HTTP error! status: ${response.status}`;
      throw new Error(errorMessage);
    }

    return { data: data as T };
  } catch (error) {
    console.error('Error handling response:', error);
    throw error;
  }
}

export async function login(email: string, password: string): Promise<ApiResponse<LoginResponse>> {
  try {
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    };

    // Add Origin and other CORS headers for web platform
    if (Platform.OS === 'web') {
      const origin = window.location.origin;
      headers['Origin'] = origin;
      // Add additional headers that might be needed for CORS
      headers['X-Requested-With'] = 'XMLHttpRequest';
    }

    // First, check if the API is reachable
    try {
      await fetch(API_URL, {
        method: 'HEAD',
        headers,
      });
    } catch (error: any) {
      console.error('API connectivity check failed:', error);
      return { 
        error: 'Unable to connect to the server. Please check your internet connection and try again.' 
      };
    }

    const response = await fetch(`${API_URL}/login`, {
      method: 'POST',
      headers,
      credentials: 'include',
      mode: Platform.OS === 'web' ? 'cors' : undefined, // Explicitly set CORS mode for web
      body: JSON.stringify({ email, password }),
    });

    return await handleResponse<LoginResponse>(response);
  } catch (error: any) {
    console.error('Login error details:', {
      message: error.message,
      stack: error.stack,
      url: API_URL,
      platform: Platform.OS
    });

    // Provide more specific error messages based on the error type
    if (error instanceof TypeError && error.message === 'Failed to fetch') {
      return { 
        error: 'Network error: Unable to reach the server. Please check your internet connection.' 
      };
    }

    if (error.message.includes('NetworkError')) {
      return { 
        error: 'Network error: The server is not accessible. This might be due to CORS configuration or network connectivity issues.' 
      };
    }

    return { 
      error: error.message || 'An unexpected error occurred while trying to log in. Please try again.' 
    };
  }
}

export async function resetPassword(email: string): Promise<ApiResponse<{ message: string }>> {
  try {
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    };

    if (Platform.OS === 'web') {
      headers['Origin'] = window.location.origin;
      headers['X-Requested-With'] = 'XMLHttpRequest';
    }

    const response = await fetch(`${API_URL}/reset-password`, {
      method: 'POST',
      headers,
      credentials: 'include',
      mode: Platform.OS === 'web' ? 'cors' : undefined,
      body: JSON.stringify({ email }),
    });

    return await handleResponse<{ message: string }>(response);
  } catch (error: any) {
    console.error('Reset password error:', error);
    return { 
      error: error.message || 'Failed to connect to the server' 
    };
  }
}

export async function verifyOTP(email: string, otp: string): Promise<ApiResponse<{ message: string }>> {
  try {
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    };

    if (Platform.OS === 'web') {
      headers['Origin'] = window.location.origin;
      headers['X-Requested-With'] = 'XMLHttpRequest';
    }

    const response = await fetch(`${API_URL}/verify-otp`, {
      method: 'POST',
      headers,
      credentials: 'include',
      mode: Platform.OS === 'web' ? 'cors' : undefined,
      body: JSON.stringify({ email, otp }),
    });

    return await handleResponse<{ message: string }>(response);
  } catch (error: any) {
    console.error('OTP verification error:', error);
    return { 
      error: error.message || 'Failed to connect to the server' 
    };
  }
}