import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Provider as PaperProvider, DefaultTheme } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

// Authentication Screens
import LoginScreen from './screens/auth/LoginScreen';
import RegisterScreen from './screens/auth/RegisterScreen';
import VerifyOtpScreen from './screens/auth/VerifyOtpScreen';
import PasswordResetScreen from './screens/auth/PasswordResetScreen';

// Main Screens
import HomeScreen from './screens/HomeScreen';
import OrderWaterJarScreen from './screens/OrderWaterJarScreen';
import PaymentScreen from './screens/PaymentScreen';
import OrderConfirmationScreen from './screens/OrderConfirmationScreen';
import TrackDeliveryScreen from './screens/TrackDeliveryScreen';
import OrderHistoryScreen from './screens/OrderHistoryScreen';
import OrderDetailsScreen from './screens/OrderDetailsScreen';

// Subscription Screens
import SubscriptionManagementScreen from './screens/SubscriptionManagementScreen';
import CreateSubscriptionScreen from './screens/CreateSubscriptionScreen';

// Profile & Settings Screens
import ProfileScreen from './screens/profile/ProfileScreen';
import EditProfileScreen from './screens/profile/EditProfileScreen';
import AddressManagementScreen from './screens/profile/AddressManagementScreen';
import AddAddressScreen from './screens/profile/AddAddressScreen';
import EditAddressScreen from './screens/profile/EditAddressScreen';
import PaymentMethodsScreen from './screens/profile/PaymentMethodsScreen';
import AddPaymentMethodScreen from './screens/profile/AddPaymentMethodScreen';
import WalletScreen from './screens/profile/WalletScreen';
import NotificationPreferencesScreen from './screens/profile/NotificationPreferencesScreen';
import InvoicesScreen from './screens/profile/InvoicesScreen';
import InvoiceDetailsScreen from './screens/profile/InvoiceDetailsScreen';
import SupportScreen from './screens/profile/SupportScreen';
import CreateSupportTicketScreen from './screens/profile/CreateSupportTicketScreen';
import SupportTicketDetailsScreen from './screens/profile/SupportTicketDetailsScreen';

// Stack Navigators
const AuthStack = createStackNavigator();
const HomeStack = createStackNavigator();
const OrderStack = createStackNavigator();
const SubscriptionStack = createStackNavigator();
const ProfileStack = createStackNavigator();

// Bottom Tab Navigator
const Tab = createBottomTabNavigator();

// Theme
const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: '#3498db',
    accent: '#2ecc71',
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
    <AuthStack.Screen name="Register" component={RegisterScreen} />
    <AuthStack.Screen name="VerifyOtp" component={VerifyOtpScreen} />
    <AuthStack.Screen name="PasswordReset" component={PasswordResetScreen} />
  </AuthStack.Navigator>
);

// Home Stack Navigator
const HomeStackNavigator = () => (
  <HomeStack.Navigator>
    <HomeStack.Screen 
      name="Home" 
      component={HomeScreen} 
      options={{ 
        headerShown: false 
      }}
    />
    <HomeStack.Screen 
      name="OrderWaterJar" 
      component={OrderWaterJarScreen}
      options={{ 
        title: 'Order Water Jar',
        headerTitleAlign: 'center',
      }}
    />
    <HomeStack.Screen 
      name="PaymentScreen" 
      component={PaymentScreen}
      options={{ 
        title: 'Payment',
        headerTitleAlign: 'center',
      }}
    />
    <HomeStack.Screen 
      name="OrderConfirmation" 
      component={OrderConfirmationScreen}
      options={{ 
        title: 'Order Confirmation',
        headerTitleAlign: 'center',
        headerLeft: null, // Prevent going back from confirmation screen
      }}
    />
    <HomeStack.Screen 
      name="TrackDelivery" 
      component={TrackDeliveryScreen}
      options={{ 
        title: 'Track Delivery',
        headerTitleAlign: 'center',
      }}
    />
    <HomeStack.Screen 
      name="OrderHistory" 
      component={OrderHistoryScreen}
      options={{ 
        title: 'Order History',
        headerTitleAlign: 'center',
      }}
    />
    <HomeStack.Screen 
      name="OrderDetails" 
      component={OrderDetailsScreen}
      options={{ 
        title: 'Order Details',
        headerTitleAlign: 'center',
      }}
    />
    <HomeStack.Screen 
      name="SubscriptionManagement" 
      component={SubscriptionManagementScreen}
      options={{ 
        title: 'My Subscriptions',
        headerTitleAlign: 'center',
      }}
    />
    <HomeStack.Screen 
      name="CreateSubscription" 
      component={CreateSubscriptionScreen}
      options={{ 
        title: 'Create Subscription',
        headerTitleAlign: 'center',
      }}
    />
    <HomeStack.Screen 
      name="AddAddress" 
      component={AddAddressScreen}
      options={{ 
        title: 'Add New Address',
        headerTitleAlign: 'center',
      }}
    />
    <HomeStack.Screen 
      name="Wallet" 
      component={WalletScreen}
      options={{ 
        title: 'My Wallet',
        headerTitleAlign: 'center',
      }}
    />
  </HomeStack.Navigator>
);

// Order History Stack Navigator
const OrderStackNavigator = () => (
  <OrderStack.Navigator>
    <OrderStack.Screen 
      name="OrderHistory" 
      component={OrderHistoryScreen}
      options={{ 
        title: 'My Orders',
        headerTitleAlign: 'center',
      }}
    />
    <OrderStack.Screen 
      name="OrderDetails" 
      component={OrderDetailsScreen}
      options={{ 
        title: 'Order Details',
        headerTitleAlign: 'center',
      }}
    />
    <OrderStack.Screen 
      name="TrackDelivery" 
      component={TrackDeliveryScreen}
      options={{ 
        title: 'Track Delivery',
        headerTitleAlign: 'center',
      }}
    />
    <OrderStack.Screen 
      name="OrderWaterJar" 
      component={OrderWaterJarScreen}
      options={{ 
        title: 'Reorder',
        headerTitleAlign: 'center',
      }}
    />
    <OrderStack.Screen 
      name="InvoiceDetails" 
      component={InvoiceDetailsScreen}
      options={{ 
        title: 'Invoice',
        headerTitleAlign: 'center',
      }}
    />
  </OrderStack.Navigator>
);

// Subscription Stack Navigator
const SubscriptionStackNavigator = () => (
  <SubscriptionStack.Navigator>
    <SubscriptionStack.Screen 
      name="SubscriptionManagement" 
      component={SubscriptionManagementScreen}
      options={{ 
        title: 'My Subscriptions',
        headerTitleAlign: 'center',
      }}
    />
    <SubscriptionStack.Screen 
      name="CreateSubscription" 
      component={CreateSubscriptionScreen}
      options={{ 
        title: 'Create Subscription',
        headerTitleAlign: 'center',
      }}
    />
  </SubscriptionStack.Navigator>
);

// Profile Stack Navigator
const ProfileStackNavigator = () => (
  <ProfileStack.Navigator>
    <ProfileStack.Screen 
      name="Profile" 
      component={ProfileScreen}
      options={{ 
        title: 'My Profile',
        headerTitleAlign: 'center',
      }}
    />
    <ProfileStack.Screen 
      name="EditProfile" 
      component={EditProfileScreen}
      options={{ 
        title: 'Edit Profile',
        headerTitleAlign: 'center',
      }}
    />
    <ProfileStack.Screen 
      name="AddressManagement" 
      component={AddressManagementScreen}
      options={{ 
        title: 'My Addresses',
        headerTitleAlign: 'center',
      }}
    />
    <ProfileStack.Screen 
      name="AddAddress" 
      component={AddAddressScreen}
      options={{ 
        title: 'Add New Address',
        headerTitleAlign: 'center',
      }}
    />
    <ProfileStack.Screen 
      name="EditAddress" 
      component={EditAddressScreen}
      options={{ 
        title: 'Edit Address',
        headerTitleAlign: 'center',
      }}
    />
    <ProfileStack.Screen 
      name="PaymentMethods" 
      component={PaymentMethodsScreen}
      options={{ 
        title: 'Payment Methods',
        headerTitleAlign: 'center',
      }}
    />
    <ProfileStack.Screen 
      name="AddPaymentMethod" 
      component={AddPaymentMethodScreen}
      options={{ 
        title: 'Add Payment Method',
        headerTitleAlign: 'center',
      }}
    />
    <ProfileStack.Screen 
      name="Wallet" 
      component={WalletScreen}
      options={{ 
        title: 'My Wallet',
        headerTitleAlign: 'center',
      }}
    />
    <ProfileStack.Screen 
      name="NotificationPreferences" 
      component={NotificationPreferencesScreen}
      options={{ 
        title: 'Notifications',
        headerTitleAlign: 'center',
      }}
    />
    <ProfileStack.Screen 
      name="Invoices" 
      component={InvoicesScreen}
      options={{ 
        title: 'My Invoices',
        headerTitleAlign: 'center',
      }}
    />
    <ProfileStack.Screen 
      name="InvoiceDetails" 
      component={InvoiceDetailsScreen}
      options={{ 
        title: 'Invoice',
        headerTitleAlign: 'center',
      }}
    />
    <ProfileStack.Screen 
      name="Support" 
      component={SupportScreen}
      options={{ 
        title: 'Help & Support',
        headerTitleAlign: 'center',
      }}
    />
    <ProfileStack.Screen 
      name="CreateSupportTicket" 
      component={CreateSupportTicketScreen}
      options={{ 
        title: 'Create Support Ticket',
        headerTitleAlign: 'center',
      }}
    />
    <ProfileStack.Screen 
      name="SupportTicketDetails" 
      component={SupportTicketDetailsScreen}
      options={{ 
        title: 'Support Ticket',
        headerTitleAlign: 'center',
      }}
    />
  </ProfileStack.Navigator>
);

// Main Tab Navigator
const TabNavigator = () => (
  <Tab.Navigator
    screenOptions={({ route }) => ({
      tabBarIcon: ({ focused, color, size }) => {
        let iconName;

        if (route.name === 'HomeTab') {
          iconName = focused ? 'home' : 'home-outline';
        } else if (route.name === 'OrdersTab') {
          iconName = focused ? 'clipboard-list' : 'clipboard-list-outline';
        } else if (route.name === 'SubscriptionsTab') {
          iconName = focused ? 'calendar-clock' : 'calendar-clock-outline';
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
      name="HomeTab" 
      component={HomeStackNavigator} 
      options={{ 
        tabBarLabel: 'Home'
      }}
    />
    <Tab.Screen 
      name="OrdersTab" 
      component={OrderStackNavigator} 
      options={{ 
        tabBarLabel: 'My Orders'
      }}
    />
    <Tab.Screen 
      name="SubscriptionsTab" 
      component={SubscriptionStackNavigator} 
      options={{ 
        tabBarLabel: 'Subscriptions'
      }}
    />
    <Tab.Screen 
      name="ProfileTab" 
      component={ProfileStackNavigator} 
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
