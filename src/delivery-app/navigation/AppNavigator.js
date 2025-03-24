import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Provider as PaperProvider, DefaultTheme } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

// Authentication Screens
import LoginScreen from './screens/auth/LoginScreen';
import PasswordResetScreen from './screens/auth/PasswordResetScreen';

// Main Screens
import DashboardScreen from './screens/DashboardScreen';
import DeliveryDetailsScreen from './screens/DeliveryDetailsScreen';
import DeliveryConfirmationScreen from './screens/DeliveryConfirmationScreen';
import NavigationScreen from './screens/NavigationScreen';
import CompletedDeliveriesScreen from './screens/CompletedDeliveriesScreen';
import FailureReasonScreen from './screens/FailureReasonScreen';

// Inventory Screens
import InventoryManagementScreen from './screens/inventory/InventoryManagementScreen';
import InventoryReconciliationScreen from './screens/inventory/InventoryReconciliationScreen';

// Profile & Settings Screens
import ProfileScreen from './screens/profile/ProfileScreen';
import SettingsScreen from './screens/profile/SettingsScreen';
import HelpScreen from './screens/profile/HelpScreen';

// Reports Screens
import DailyReportScreen from './screens/reports/DailyReportScreen';
import PerformanceScreen from './screens/reports/PerformanceScreen';

// Stack Navigators
const AuthStack = createStackNavigator();
const DeliveryStack = createStackNavigator();
const InventoryStack = createStackNavigator();
const ProfileStack = createStackNavigator();
const ReportsStack = createStackNavigator();

// Bottom Tab Navigator
const Tab = createBottomTabNavigator();

// Theme
const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: '#3498db',
    accent: '#27ae60',
    background: '#f5f5f5',
    surface: '#ffffff',
    error: '#e74c3c',
  },
};

// Auth Navigator
const AuthNavigator = () => (
  <AuthStack.Navigator
    screenOptions={{
      headerShown: false,
    }}
  >
    <AuthStack.Screen name="Login" component={LoginScreen} />
    <AuthStack.Screen name="PasswordReset" component={PasswordResetScreen} />
  </AuthStack.Navigator>
);

// Delivery Navigator
const DeliveryNavigator = () => (
  <DeliveryStack.Navigator>
    <DeliveryStack.Screen 
      name="Dashboard" 
      component={DashboardScreen} 
      options={{ 
        headerTitle: 'Deliveries',
        headerTitleAlign: 'center',
      }}
    />
    <DeliveryStack.Screen 
      name="DeliveryDetails" 
      component={DeliveryDetailsScreen} 
      options={{ 
        headerTitle: 'Delivery Details',
        headerTitleAlign: 'center',
      }}
    />
    <DeliveryStack.Screen 
      name="DeliveryConfirmation" 
      component={DeliveryConfirmationScreen} 
      options={{ 
        headerTitle: 'Complete Delivery',
        headerTitleAlign: 'center',
      }}
    />
    <DeliveryStack.Screen 
      name="Navigation" 
      component={NavigationScreen} 
      options={{ 
        headerTitle: 'Navigation',
        headerTitleAlign: 'center',
      }}
    />
    <DeliveryStack.Screen 
      name="CompletedDeliveries" 
      component={CompletedDeliveriesScreen} 
      options={{ 
        headerTitle: 'Completed Deliveries',
        headerTitleAlign: 'center',
      }}
    />
    <DeliveryStack.Screen 
      name="FailureReason" 
      component={FailureReasonScreen} 
      options={{ 
        headerTitle: 'Delivery Failed',
        headerTitleAlign: 'center',
      }}
    />
  </DeliveryStack.Navigator>
);

// Inventory Navigator
const InventoryNavigator = () => (
  <InventoryStack.Navigator>
    <InventoryStack.Screen 
      name="InventoryManagement" 
      component={InventoryManagementScreen} 
      options={{ 
        headerTitle: 'Inventory',
        headerTitleAlign: 'center',
      }}
    />
    <InventoryStack.Screen 
      name="InventoryReconciliation" 
      component={InventoryReconciliationScreen} 
      options={{ 
        headerTitle: 'Reconciliation',
        headerTitleAlign: 'center',
      }}
    />
  </InventoryStack.Navigator>
);

// Profile Navigator
const ProfileNavigator = () => (
  <ProfileStack.Navigator>
    <ProfileStack.Screen 
      name="Profile" 
      component={ProfileScreen} 
      options={{ 
        headerTitle: 'My Profile',
        headerTitleAlign: 'center',
      }}
    />
    <ProfileStack.Screen 
      name="Settings" 
      component={SettingsScreen} 
      options={{ 
        headerTitle: 'Settings',
        headerTitleAlign: 'center',
      }}
    />
    <ProfileStack.Screen 
      name="Help" 
      component={HelpScreen} 
      options={{ 
        headerTitle: 'Help & Support',
        headerTitleAlign: 'center',
      }}
    />
  </ProfileStack.Navigator>
);

// Reports Navigator
const ReportsNavigator = () => (
  <ReportsStack.Navigator>
    <ReportsStack.Screen 
      name="DailyReport" 
      component={DailyReportScreen} 
      options={{ 
        headerTitle: 'Daily Report',
        headerTitleAlign: 'center',
      }}
    />
    <ReportsStack.Screen 
      name="Performance" 
      component={PerformanceScreen} 
      options={{ 
        headerTitle: 'My Performance',
        headerTitleAlign: 'center',
      }}
    />
  </ReportsStack.Navigator>
);

// Main Tab Navigator
const TabNavigator = () => (
  <Tab.Navigator
    screenOptions={({ route }) => ({
      tabBarIcon: ({ focused, color, size }) => {
        let iconName;

        if (route.name === 'DeliveryTab') {
          iconName = focused ? 'truck-delivery' : 'truck-delivery-outline';
        } else if (route.name === 'InventoryTab') {
          iconName = focused ? 'cube' : 'cube-outline';
        } else if (route.name === 'ReportsTab') {
          iconName = focused ? 'chart-bar' : 'chart-bar-stacked';
        } else if (route.name === 'ProfileTab') {
          iconName = focused ? 'account' : 'account-outline';
        }

        return <Icon name={iconName} size={size} color={color} />;
      },
    })}
    tabBarOptions={{
      activeTintColor: '#3498db',
      inactiveTintColor: 'gray',
      labelStyle: {
        fontSize: 12,
      },
    }}
  >
    <Tab.Screen 
      name="DeliveryTab" 
      component={DeliveryNavigator} 
      options={{ 
        tabBarLabel: 'Deliveries'
      }}
    />
    <Tab.Screen 
      name="InventoryTab" 
      component={InventoryNavigator} 
      options={{ 
        tabBarLabel: 'Inventory'
      }}
    />
    <Tab.Screen 
      name="ReportsTab" 
      component={ReportsNavigator} 
      options={{ 
        tabBarLabel: 'Reports'
      }}
    />
    <Tab.Screen 
      name="ProfileTab" 
      component={ProfileNavigator} 
      options={{ 
        tabBarLabel: 'Profile'
      }}
    />
  </Tab.Navigator>
);

// Main Navigation Container
const AppNavigator = () => {
  // In a real app, we would check if the user is authenticated
  const isAuthenticated = true;

  return (
    <PaperProvider theme={theme}>
      <NavigationContainer>
        {isAuthenticated ? <TabNavigator /> : <AuthNavigator />}
      </NavigationContainer>
    </PaperProvider>
  );
};

export default AppNavigator;
