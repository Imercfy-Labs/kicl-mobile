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

async function checkServerConnection(): Promise<boolean> {
  try {
    const response = await fetch(API_URL, {
      method: 'HEAD',
      headers: Platform.OS === 'web' ? {
        'Origin': window.location.origin
      } : undefined,
      mode: Platform.OS === 'web' ? 'cors' : undefined,
    });
    return response.ok;
  } catch (error) {
    console.error('Server connection check failed:', error);
    return false;
  }
}

export async function login(email: string, password: string): Promise<ApiResponse<LoginResponse>> {
  try {
    // First check if server is reachable
    const isServerReachable = await checkServerConnection();
    if (!isServerReachable) {
      return {
        error: 'Unable to connect to the server. Please check your internet connection and try again.'
      };
    }

    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    };

    if (Platform.OS === 'web') {
      headers['Origin'] = window.location.origin;
    }

    const response = await fetch(`${API_URL}/login`, {
      method: 'POST',
      headers,
      credentials: Platform.OS === 'web' ? 'include' : 'omit',
      mode: Platform.OS === 'web' ? 'cors' : undefined,
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

    if (error instanceof TypeError && error.message === 'Failed to fetch') {
      return {
        error: 'Network error: Unable to reach the server. Please check your internet connection or ensure the server allows HTTPS connections.'
      };
    }

    if (error.message.includes('NetworkError') || error.message.includes('Network request failed')) {
      return {
        error: 'Network error: The server is not accessible. This might be due to CORS configuration or SSL certificate issues.'
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
    }

    const response = await fetch(`${API_URL}/reset-password`, {
      method: 'POST',
      headers,
      credentials: Platform.OS === 'web' ? 'include' : 'omit',
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
    }

    const response = await fetch(`${API_URL}/verify-otp`, {
      method: 'POST',
      headers,
      credentials: Platform.OS === 'web' ? 'include' : 'omit',
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