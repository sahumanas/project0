import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  TouchableOpacity, 
  SafeAreaView,
  TextInput,
  Alert
} from 'react-native';
import { 
  Card, 
  Title, 
  Paragraph, 
  Button, 
  RadioButton, 
  Divider,
  Caption,
  Badge,
  ActivityIndicator
} from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation, useRoute } from '@react-navigation/native';
import NumericInput from 'react-native-numeric-input';
import ProductItem from '../components/ProductItem';
import AddressSelector from '../components/AddressSelector';
import TimeslotSelector from '../components/TimeslotSelector';
import LoadingSpinner from '../../shared/components/LoadingSpinner';

const OrderWaterJarScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { reorderItems } = route.params || {};

  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState([]);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [addresses, setAddresses] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [timeslots, setTimeslots] = useState([]);
  const [selectedTimeslot, setSelectedTimeslot] = useState(null);
  const [specialInstructions, setSpecialInstructions] = useState('');
  const [totalAmount, setTotalAmount] = useState(0);
  const [calculatingTotal, setCalculatingTotal] = useState(false);

  // Mock data for the prototype
  const mockProducts = [
    {
      id: '1',
      name: '20L Standard Water Jar',
      description: 'Purified drinking water in reusable 20L jar',
      price: 120.00,
      image: 'https://example.com/waterjar_standard.jpg',
      inStock: true,
    },
    {
      id: '2',
      name: '20L Mineral Water Jar',
      description: 'Mineral-enhanced purified water in reusable 20L jar',
      price: 180.00,
      image: 'https://example.com/waterjar_mineral.jpg',
      inStock: true,
    },
    {
      id: '3',
      name: '10L Standard Water Jar',
      description: 'Purified drinking water in smaller 10L jar',
      price: 80.00,
      image: 'https://example.com/waterjar_small.jpg',
      inStock: true,
    },
    {
      id: '4',
      name: '1L Bottled Water (Pack of 12)',
      description: 'Purified drinking water in 1L bottles',
      price: 240.00,
      image: 'https://example.com/water_bottles.jpg',
      inStock: true,
    },
  ];