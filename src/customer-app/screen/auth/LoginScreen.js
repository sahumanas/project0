import React, { useState } from 'react';
import { 
  View, 
  StyleSheet, 
  Image, 
  Text,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
  SafeAreaView
} from 'react-native';
import { 
  TextInput, 
  Button, 
  Title, 
  Paragraph,
  Snackbar
} from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';

const LoginScreen = () => {
  const navigation = useNavigation();
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [snackbarVisible, setSnackbarVisible] = useState(false);

  const handleLogin = async () => {
    // Input validation
    if (!phoneNumber.trim()) {
      setError('Please enter your phone number');
      setSnackbarVisible(true);
      return;
    }
    
    if (!password.trim()) {
      setError('Please enter your password');
      setSnackbarVisible(true);
      return;
    }

    // In a real app, this would send the credentials to the server
    setLoading(true);
    
    // Simulating API request
    setTimeout(() => {
      setLoading(false);
      
      // For the prototype, we'll use hardcoded credentials
      if (phoneNumber === '1234567890' && password === 'password') {
        // Navigate to Dashboard (handled by navigation container)
      } else {
        setError('Invalid phone number or password');
        setSnackbarVisible(true);
      }
    }, 1500);
  };

  const handleForgotPassword = () => {
    navigation.navigate('PasswordReset');
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <SafeAreaView style={styles.container}>
        <KeyboardAvoidingView 
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={styles.keyboardAvoidingView}
        >
          <View style={styles.logoContainer}>
            <Image 
              source={require('../../assets/logo.png')} 
              style={styles.logo}
              resizeMode="contain"
            />
            <Title style={styles.appTitle}>Water Jar Delivery</Title>
            <Paragraph style={styles.appSubtitle}>Delivery Personnel App</Paragraph>
          </View>

          <View style={styles.formContainer}>
            <TextInput
              label="Phone Number"
              value={phoneNumber}
              onChangeText={setPhoneNumber}
              style={styles.input}
              keyboardType="phone-pad"
              autoCapitalize="none"
              disabled={loading}
              left={<TextInput.Icon name="phone" />}
            />
            
            <TextInput
              label="Password"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
              style={styles.input}
              disabled={loading}
              left={<TextInput.Icon name="lock" />}
            />
            
            <Button 
              mode="text" 
              onPress={handleForgotPassword}
              style={styles.forgotPasswordButton}
              labelStyle={styles.forgotPasswordButtonLabel}
            >
              Forgot Password?
            </Button>
            
            <Button 
              mode="contained" 
              onPress={handleLogin}
              style={styles.loginButton}
              loading={loading}
              disabled={loading}
            >
              Login
            </Button>
          </View>

          <View style={styles.footerContainer}>
            <Text style={styles.versionText}>Version 1.0.0</Text>
          </View>
        </KeyboardAvoidingView>
        
        <Snackbar
          visible={snackbarVisible}
          onDismiss={() => setSnackbarVisible(false)}
          duration={3000}
          action={{
            label: 'OK',
            onPress: () => setSnackbarVisible(false),
          }}
        >
          {error}
        </Snackbar>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  keyboardAvoidingView: {
    flex: 1,
    justifyContent: 'space-between',
    padding: 20,
  },
  logoContainer: {
    alignItems: 'center',
    marginTop: 40,
  },
  logo: {
    width: 120,
    height: 120,
    marginBottom: 16,
  },
  appTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2c3e50',
  },
  appSubtitle: {
    fontSize: 16,
    color: '#7f8c8d',
    marginTop: 4,
  },
  formContainer: {
    width: '100%',
  },
  input: {
    marginBottom: 16,
    backgroundColor: '#ffffff',
  },
  forgotPasswordButton: {
    alignSelf: 'flex-end',
    marginBottom: 24,
  },
  forgotPasswordButtonLabel: {
    fontSize: 14,
  },
  loginButton: {
    padding: 4,
    borderRadius: 8,
  },
  footerContainer: {
    alignItems: 'center',
    marginBottom: 16,
  },
  versionText: {
    color: '#95a5a6',
    fontSize: 12,
  },
});

export default LoginScreen;
