import React, { useState, useEffect, useRef } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  TouchableOpacity, 
  Image,
  Alert,
  SafeAreaView,
  TextInput,
} from 'react-native';
import { 
  Card, 
  Button, 
  Divider, 
  Title, 
  Paragraph, 
  List,
  RadioButton,
  Headline,
  Subheading,
  Caption
} from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Camera } from 'expo-camera';
import Signature from 'react-native-signature-canvas';
import NumericInput from 'react-native-numeric-input';
import LoadingSpinner from '../../shared/components/LoadingSpinner';

const DeliveryConfirmationScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { deliveryId } = route.params;
  
  const [delivery, setDelivery] = useState(null);
  const [loading, setLoading] = useState(true);
  const [proofType, setProofType] = useState('photo');
  const [hasPermission, setHasPermission] = useState(null);
  const [cameraVisible, setCameraVisible] = useState(false);
  const [sigVisible, setSigVisible] = useState(false);
  const [photo, setPhoto] = useState(null);
  const [signature, setSignature] = useState(null);
  const [collectedJars, setCollectedJars] = useState(0);
  const [deliveryNote, setDeliveryNote] = useState('');
  const [paymentCollected, setPaymentCollected] = useState(false);
  
  const cameraRef = useRef(null);

  // Mock data for the prototype
  const mockDelivery = {
    id: '1235',
    customer: {
      name: 'Sarah Johnson',
      phone: '(555) 123-4567',
      address: '123 Main Street, Apt 4B, Cityville, State',
    },
    orderDetails: {
      items: [{ productName: '20L Standard Water Jar', quantity: 2, price: 120.00 }],
      totalAmount: 240.00,
      paymentStatus: 'Cash On Delivery', // Changed to COD for demonstration
      specialInstructions: 'Please call when nearby.',
    },
    status: 'In Transit',
    timeSlot: '2:00-4:00 PM',
    emptyJarsToCollect: 2,
  };

  useEffect(() => {
    // In a real app, this would fetch data from the API
    // For the prototype, we'll use mock data
    setTimeout(() => {
      setDelivery(mockDelivery);
      setLoading(false);
    }, 1000);

    // Request camera permissions
    (async () => {
      const { status } = await Camera.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, [deliveryI