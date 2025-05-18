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
      throw new Error(isJson ? data.message || 'An error occurred' : 'Network error');
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

    // Only add Origin header for web platform
    if (Platform.OS === 'web') {
      headers['Origin'] = window.location.origin;
    }

    const response = await fetch(`${API_URL}/login`, {
      method: 'POST',
      headers,
      credentials: 'include', // Include cookies if needed
      body: JSON.stringify({ email, password }),
    });

    return await handleResponse<LoginResponse>(response);
  } catch (error: any) {
    console.error('Login error:', error);
    return { error: error.message || 'Failed to connect to the server' };
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
    }

    const response = await fetch(`${API_URL}/reset-password`, {
      method: 'POST',
      headers,
      credentials: 'include',
      body: JSON.stringify({ email }),
    });

    return await handleResponse<{ message: string }>(response);
  } catch (error: any) {
    return { error: error.message || 'Failed to connect to the server' };
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
    }

    const response = await fetch(`${API_URL}/verify-otp`, {
      method: 'POST',
      headers,
      credentials: 'include',
      body: JSON.stringify({ email, otp }),
    });

    return await handleResponse<{ message: string }>(response);
  } catch (error: any) {
    return { error: error.message || 'Failed to connect to the server' };
  }
}