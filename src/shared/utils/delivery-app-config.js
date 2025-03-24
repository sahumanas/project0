// Configuration constants for the Water Jar Delivery App
// This would typically change based on the environment (dev, staging, prod)

const Config = {
  // API Configuration
  API_BASE_URL: 'https://api.waterjardelivery.com',
  API_TIMEOUT: 30000, // 30 seconds
  
  // App Configuration
  APP_VERSION: '1.0.0',
  BUILD_NUMBER: '1',
  
  // Feature Flags
  FEATURES: {
    OFFLINE_MODE: true,
    ROUTE_OPTIMIZATION: true,
    INVENTORY_RECONCILIATION: true,
    PERFORMANCE_TRACKING: true,
    REAL_TIME_TRACKING: true,
  },
  
  // Map Configuration
  MAP: {
    DEFAULT_LATITUDE: 37.78825,
    DEFAULT_LONGITUDE: -122.4324,
    DEFAULT_ZOOM: 15,
    TRACKING_INTERVAL: 30000, // 30 seconds
  },
  
  // Push Notification Configuration
  PUSH: {
    ENABLED: true,
    CHANNEL_ID: 'delivery-notifications',
    CHANNEL_NAME: 'Delivery Notifications',
  },
  
  // Cache Configuration
  CACHE: {
    DELIVERY_TTL: 3600000, // 1 hour in milliseconds
    INVENTORY_TTL: 1800000, // 30 minutes in milliseconds
  },
  
  // Misc Settings
  SETTINGS: {
    DEFAULT_LANGUAGE: 'en',
    DEFAULT_THEME: 'light',
    DATE_FORMAT: 'MM/DD/YYYY',
    TIME_FORMAT: 'hh:mm A',
  },
};

// Override configuration based on environment
if (__DEV__) {
  // Development environment overrides
  Config.API_BASE_URL = 'https://dev-api.waterjardelivery.com';
  
  // Enable additional logging for development
  Config.DEBUG = true;
  Config.LOG_LEVEL = 'debug';
}

export default Config;
