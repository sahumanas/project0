import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  TouchableOpacity, 
  SafeAreaView,
  RefreshControl
} from 'react-native';
import { Card, Button, Divider, Badge, Title, Paragraph, Avatar } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';
import { fetchDeliveries } from '../../shared/utils/api';
import DeliveryCard from '../components/DeliveryCard';
import LoadingSpinner from '../../shared/components/LoadingSpinner';

const DashboardScreen = () => {
  const navigation = useNavigation();
  const [deliveries, setDeliveries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  // Mock data for the prototype
  const mockDeliveries = [
    {
      id: '1235',
      customer: {
        name: 'Sarah Johnson',
        phone: '(555) 123-4567',
        address: '123 Main Street, Apt 4B, Cityville',
      },
      orderDetails: {
        items: [{ productName: '20L Standard Water Jar', quantity: 2 }],
        totalAmount: 240.00,
        paymentStatus: 'Prepaid',
        specialInstructions: 'Please call when nearby.',
      },
      status: 'In Transit',
      timeSlot: '2:00-4:00 PM',
      eta: '15 minutes',
      distance: '2.1 km',
    },
    {
      id: '1236',
      customer: {
        name: 'Mike Smith',
        phone: '(555) 234-5678',
        address: '456 Oak Avenue, Townsville',
      },
      orderDetails: {
        items: [{ productName: '20L Standard Water Jar', quantity: 3 }],
        totalAmount: 360.00,
        paymentStatus: 'Cash On Delivery',
        specialInstructions: '',
      },
      status: 'Assigned',
      timeSlot: '2:00-4:00 PM',
      distance: '3.2 km',
    },
    {
      id: '1237',
      customer: {
        name: 'Lisa Wang',
        phone: '(555) 345-6789',
        address: '789 Pine Road, Villagetown',
      },
      orderDetails: {
        items: [{ productName: '20L Mineral Water Jar', quantity: 1 }],
        totalAmount: 180.00,
        paymentStatus: 'Prepaid',
        specialInstructions: 'Leave with security if not home.',
      },
      status: 'Assigned',
      timeSlot: '4:00-6:00 PM',
      distance: '5.1 km',
    }
  ];

  useEffect(() => {
    // In a real app, this would fetch data from the API
    // For the prototype, we'll use mock data
    setTimeout(() => {
      setDeliveries(mockDeliveries);
      setLoading(false);
    }, 1000);
  }, []);

  const onRefresh = () => {
    setRefreshing(true);
    // In a real app, this would refetch the latest data
    setTimeout(() => {
      setDeliveries(mockDeliveries);
      setRefreshing(false);
    }, 1000);
  };

  const handleDeliveryPress = (deliveryId) => {
    navigation.navigate('DeliveryDetails', { deliveryId });
  };

  const handleStartNavigation = (deliveryId) => {
    // This would normally update the status to "In Transit" and start navigation
    navigation.navigate('Navigation', { deliveryId });
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  // Find current delivery (In Transit)
  const currentDelivery = deliveries.find(d => d.status === 'In Transit');
  
  // Upcoming deliveries (Assigned)
  const upcomingDeliveries = deliveries.filter(d => d.status === 'Assigned');

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView 
        style={styles.scrollView}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <View style={styles.headerContainer}>
          <Title style={styles.headerTitle}>Today: {deliveries.length} Deliveries</Title>
          <TouchableOpacity 
            style={styles.inventoryButton}
            onPress={() => navigation.navigate('Inventory')}
          >
            <Icon name="package-variant" size={20} color="#FFFFFF" />
            <Text style={styles.inventoryButtonText}>Inventory</Text>
          </TouchableOpacity>
        </View>
        
        {currentDelivery && (
          <View style={styles.sectionContainer}>
            <Text style={styles.sectionTitle}>CURRENT DELIVERY</Text>
            <Card style={styles.currentDeliveryCard}>
              <Card.Content>
                <View style={styles.deliveryHeader}>
                  <View>
                    <Text style={styles.orderId}>Order #{currentDelivery.id}</Text>
                    <Text style={styles.items}>
                      {currentDelivery.orderDetails.items.map(item => 
                        `${item.quantity} x ${item.productName}`
                      ).join(', ')}
                    </Text>
                  </View>
                  <Badge style={styles.statusBadge}>
                    {currentDelivery.status}
                  </Badge>
                </View>
                <Divider style={styles.divider} />
                <View style={styles.customerInfo}>
                  <Icon name="account" size={20} color="#555" />
                  <Text style={styles.customerName}>{currentDelivery.customer.name}</Text>
                </View>
                <View style={styles.customerInfo}>
                  <Icon name="map-marker" size={20} color="#555" />
                  <Text style={styles.customerAddress}>{currentDelivery.customer.address}</Text>
                </View>
                <View style={styles.etaContainer}>
                  <Icon name="clock-outline" size={20} color="#555" />
                  <Text style={styles.eta}>ETA: {currentDelivery.eta}</Text>
                </View>
              </Card.Content>
              <Card.Actions style={styles.cardActions}>
                <Button 
                  mode="contained" 
                  onPress={() => handleDeliveryPress(currentDelivery.id)}
                  style={styles.detailsButton}
                >
                  View Details
                </Button>
                <Button 
                  mode="contained" 
                  onPress={() => handleStartNavigation(currentDelivery.id)}
                  style={styles.navigationButton}
                  icon="navigation"
                >
                  Continue Navigation
                </Button>
              </Card.Actions>
            </Card>
          </View>
        )}

        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>UPCOMING DELIVERIES</Text>
          {upcomingDeliveries.map(delivery => (
            <DeliveryCard 
              key={delivery.id}
              delivery={delivery}
              onPress={() => handleDeliveryPress(delivery.id)}
              onStartDelivery={() => handleStartNavigation(delivery.id)}
            />
          ))}
        </View>

        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>COMPLETED: 5 Deliveries</Text>
          <Button 
            mode="outlined" 
            onPress={() => navigation.navigate('CompletedDeliveries')}
            style={styles.viewAllButton}
          >
            View All
          </Button>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  scrollView: {
    flex: 1,
    padding: 16,
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  inventoryButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#2c3e50',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
  },
  inventoryButtonText: {
    color: '#FFFFFF',
    marginLeft: 4,
    fontWeight: '600',
  },
  sectionContainer: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#555',
  },
  currentDeliveryCard: {
    borderRadius: 8,
    elevation: 4,
    marginBottom: 8,
  },
  deliveryHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  orderId: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  items: {
    fontSize: 14,
    color: '#555',
  },
  statusBadge: {
    backgroundColor: '#3498db',
    color: 'white',
  },
  divider: {
    marginVertical: 12,
  },
  customerInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  customerName: {
    marginLeft: 8,
    fontSize: 15,
    fontWeight: '500',
  },
  customerAddress: {
    marginLeft: 8,
    fontSize: 14,
    color: '#555',
    flexShrink: 1,
  },
  etaContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
  },
  eta: {
    marginLeft: 8,
    fontSize: 15,
    fontWeight: '500',
    color: '#e67e22',
  },
  cardActions: {
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
  detailsButton: {
    backgroundColor: '#3498db',
  },
  navigationButton: {
    backgroundColor: '#27ae60',
  },
  viewAllButton: {
    marginTop: 8,
    borderColor: '#3498db',
  },
});

export default DashboardScreen;
