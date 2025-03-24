import axios from 'axios';
import Config from '../config';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Create axios instance with base URL
const api = axios.create({
  baseURL: Config.API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add request interceptor to add auth token to requests
api.interceptors.request.use(
  async (config) => {
    try {
      const token = await AsyncStorage.getItem('authToken');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    } catch (error) {
      return Promise.reject(error);
    }
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add response interceptor to handle auth errors
api.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    if (error.response?.status === 401) {
      // Token expired or invalid
      await AsyncStorage.removeItem('authToken');
      // Here you could also navigate to login screen or refresh token
    }
    return Promise.reject(error);
  }
);

// Mock implementation for the prototype
export const loginApi = async (phoneNumber, password) => {
  // For the prototype, simulate API call with timeout
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      // Mock valid credentials check
      if (phoneNumber === '1234567890' && password === 'password') {
        resolve({
          token: 'mock-jwt-token',
          user: {
            id: '1',
            name: 'John Doe',
            phoneNumber: '1234567890',
            email: 'john.doe@example.com',
            role: 'delivery_personnel',
          },
        });
      } else {
        reject(new Error('Invalid credentials'));
      }
    }, 1000);
  });
};

export const logoutApi = async () => {
  // For the prototype, simulate API call with timeout
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ success: true });
    }, 500);
  });
};

export const validateTokenApi = async (token) => {
  // For the prototype, simulate API call with timeout
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      // Mock token validation (always valid for the prototype)
      if (token === 'mock-jwt-token') {
        resolve({
          token: token,
          user: {
            id: '1',
            name: 'John Doe',
            phoneNumber: '1234567890',
            email: 'john.doe@example.com',
            role: 'delivery_personnel',
          },
        });
      } else {
        reject(new Error('Invalid token'));
      }
    }, 800);
  });
};

// In a real app, these would make actual API calls
export const resetPasswordRequestApi = async (phoneNumber) => {
  return api.post('/auth/reset-password-request', { phoneNumber });
};

export const verifyOtpApi = async (phoneNumber, otp) => {
  return api.post('/auth/verify-otp', { phoneNumber, otp });
};

export const resetPasswordApi = async (phoneNumber, otp, newPassword) => {
  return api.post('/auth/reset-password', { phoneNumber, otp, newPassword });
};

export default api;
