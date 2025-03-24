import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  TouchableOpacity, 
  SafeAreaView, 
  RefreshControl,
  Image,
} from 'react-native';
import { Card, Button, Divider, Title, Paragraph, Avatar } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';
import UpcomingDelivery from '../components/UpcomingDelivery';
import SubscriptionCard from '../components/SubscriptionCard';
import PromotionBanner from '../components/PromotionBanner';
import LoadingSpinner from '../../shared/components/LoadingSpinner';

const HomeScreen = () => {
  const navigation = useNavigation();
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [upcomingDelivery, setUpcomingDelivery] = useState(null);
  const [activeSubscription, setActiveSubscription] = useState(null);
  const [recentOrders, setRecentOrders] = useState([]);
  const [promotions, setPromotions] = useState([]);
  const [userProfile, setUserProfile] = useState(null);

  // Mock data for the prototype
  const mockUserProfile = {
    name: 'Sarah Johnson',
    address: '123 Main Street, Apt 4B, Cityville',
    walletBalance: 240.50,
  };

  const mockUpcomingDelivery = {
    id: '1235',
    status: 'Confirmed',
    scheduledDate: 'Today',
    timeSlot: '2:00-4:00 PM',
    items: [
      { productName: '20L Standard Water Jar', quantity: 2 }
    ],
    totalAmount: 240.00,
  };

  const mockActiveSubscription = {
    id: '5001',
    type: 'Weekly',
    nextDelivery: 'March 27, 2025',
    items: [
      { productName: '20L Standard Water Jar', quantity: 2 }
    ],
    totalAmount: 240.00,
  };

  const mockRecentOrders = [
    {
      id: '1234',
      date: 'March 20, 2025',
      status: 'Delivered',
      items: [
        { productName: '20L Standard Water Jar', quantity: 3 }
      ],
      totalAmount: 360.00,
    },
    {
      id: '1233',
      date: 'March 13, 2025',
      status: 'Delivered',
      items: [
        { productName: '20L Standard Water Jar', quantity: 2 }
      ],
      totalAmount: 240.00,
    }
  ];

  const mockPromotions = [
    {
      id: '1',
      title: 'Summer Special',
      description: 'Get 10% off on all subscriptions',
      imageUrl: 'https://example.com/promo1.jpg',
      expiryDate: 'April 30, 2025',
    },
    {
      id: '2',
      title: 'Refer a Friend',
      description: 'Get ₹100 for each referral',
      imageUrl: 'https://example.com/promo2.jpg',
      expiryDate: 'May 15, 2025',
    }
  ];

  useEffect(() => {
    // In a real app, this would fetch data from the API
    // For the prototype, we'll use mock data
    setTimeout(() => {
      setUserProfile(mockUserProfile);
      setUpcomingDelivery(mockUpcomingDelivery);
      setActiveSubscription(mockActiveSubscription);
      setRecentOrders(mockRecentOrders);
      setPromotions(mockPromotions);
      setLoading(false);
    }, 1000);
  }, []);

  const onRefresh = () => {
    setRefreshing(true);
    // In a real app, this would refetch the latest data
    setTimeout(() => {
      setUserProfile(mockUserProfile);
      setUpcomingDelivery(mockUpcomingDelivery);
      setActiveSubscription(mockActiveSubscription);
      setRecentOrders(mockRecentOrders);
      setPromotions(mockPromotions);
      setRefreshing(false);
    }, 1000);
  };

  const handleNewOrder = () => {
    navigation.navigate('OrderWaterJar');
  };

  const handleReorder = (orderId) => {
    // Find the order to reorder
    const orderToReorder = recentOrders.find(order => order.id === orderId);
    if (orderToReorder) {
      // Navigate to order screen with pre-filled data
      navigation.navigate('OrderWaterJar', { reorderItems: orderToReorder.items });
    }
  };

  const handleManageSubscription = () => {
    navigation.navigate('SubscriptionManagement');
  };

  const handleTrackDelivery = () => {
    navigation.navigate('TrackDelivery', { deliveryId: upcomingDelivery.id });
  };

  const handleViewAllOrders = () => {
    navigation.navigate('OrderHistory');
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView 
        style={styles.scrollView}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        {/* Header with greeting and wallet */}
        <View style={styles.header}>
          <View>
            <Text style={styles.greeting}>Hello, {userProfile.name.split(' ')[0]}</Text>
            <Text style={styles.address} numberOfLines={1}>{userProfile.address}</Text>
          </View>
          <TouchableOpacity 
            style={styles.walletContainer}
            onPress={() => navigation.navigate('Wallet')}
          >
            <Icon name="wallet" size={24} color="#3498db" />
            <Text style={styles.walletBalance}>₹{userProfile.walletBalance.toFixed(2)}</Text>
          </TouchableOpacity>
        </View>

        {/* Quick Order Buttons */}
        <View style={styles.quickActionContainer}>
          <TouchableOpacity 
            style={styles.orderButton}
            onPress={handleNewOrder}
          >
            <Icon name="water" size={24} color="#FFFFFF" />
            <Text style={styles.orderButtonText}>Order Water Jar</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={styles.subscriptionButton}
            onPress={handleManageSubscription}
          >
            <Icon name="calendar-check" size={24} color="#FFFFFF" />
            <Text style={styles.orderButtonText}>Manage Subscription</Text>
          </TouchableOpacity>
        </View>

        {/* Upcoming Delivery */}
        {upcomingDelivery ? (
          <Card style={styles.sectionCard}>
            <Card.Content>
              <View style={styles.sectionHeader}>
                <Title style={styles.sectionTitle}>Upcoming Delivery</Title>
                <Button 
                  mode="text" 
                  onPress={handleTrackDelivery}
                  labelStyle={styles.trackButtonLabel}
                >
                  Track
                </Button>
              </View>
              <UpcomingDelivery delivery={upcomingDelivery} onPress={handleTrackDelivery} />
            </Card.Content>
          </Card>
        ) : (
          <Card style={styles.sectionCard}>
            <Card.Content>
              <Title style={styles.sectionTitle}>No Upcoming Deliveries</Title>
              <Paragraph>You don't have any scheduled deliveries.</Paragraph>
              <Button 
                mode="contained" 
                onPress={handleNewOrder}
                style={styles.noDeliveryButton}
              >
                Order Now
              </Button>
            </Card.Content>
          </Card>
        )}

        {/* Active Subscription */}
        {activeSubscription ? (
          <Card style={styles.sectionCard}>
            <Card.Content>
              <View style={styles.sectionHeader}>
                <Title style={styles.sectionTitle}>Active Subscription</Title>
                <Button 
                  mode="text" 
                  onPress={handleManageSubscription}
                  labelStyle={styles.manageButtonLabel}
                >
                  Manage
                </Button>
              </View>
              <SubscriptionCard subscription={activeSubscription} />
            </Card.Content>
          </Card>
        ) : (
          <Card style={styles.sectionCard}>
            <Card.Content>
              <Title style={styles.sectionTitle}>No Active Subscription</Title>
              <Paragraph>Subscribe for regular water jar deliveries and never run out.</Paragraph>
              <Button 
                mode="contained" 
                onPress={() => navigation.navigate('CreateSubscription')}
                style={styles.noSubscriptionButton}
              >
                Subscribe Now
              </Button>
            </Card.Content>
          </Card>
        )}

        {/* Promotions */}
        <View style={styles.promotionsContainer}>
          <Title style={styles.sectionTitle}>Special Offers</Title>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {promotions.map((promotion) => (
              <PromotionBanner key={promotion.id} promotion={promotion} />
            ))}
          </ScrollView>
        </View>

        {/* Recent Orders */}
        <Card style={styles.sectionCard}>
          <Card.Content>
            <View style={styles.sectionHeader}>
              <Title style={styles.sectionTitle}>Recent Orders</Title>
              <Button 
                mode="text" 
                onPress={handleViewAllOrders}
                labelStyle={styles.viewAllButtonLabel}
              >
                View All
              </Button>
            </View>
            
            {recentOrders.map((order) => (
              <View key={order.id} style={styles.recentOrderContainer}>
                <View style={styles.orderInfo}>
                  <Text style={styles.orderId}>Order #{order.id}</Text>
                  <Text style={styles.orderDate}>{order.date}</Text>
                  <Text style={styles.orderItems}>
                    {order.items.map(item => `${item.quantity} × ${item.productName}`).join(', ')}
                  </Text>
                </View>
                <Button 
                  mode="outlined" 
                  onPress={() => handleReorder(order.id)}
                  style={styles.reorderButton}
                >
                  Reorder
                </Button>
              </View>
            ))}
          </Card.Content>
        </Card>
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
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  greeting: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#2c3e50',
  },
  address: {
    fontSize: 14,
    color: '#7f8c8d',
    maxWidth: 250,
  },
  walletContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ecf0f1',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
  },
  walletBalance: {
    marginLeft: 6,
    fontWeight: 'bold',
    color: '#2c3e50',
  },
  quickActionContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  orderButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#3498db',
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 16,
    flex: 1,
    marginRight: 8,
  },
  subscriptionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#2ecc71',
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 16,
    flex: 1,
    marginLeft: 8,
  },
  orderButtonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    marginLeft: 8,
  },
  sectionCard: {
    marginBottom: 16,
    borderRadius: 8,
    elevation: 2,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  noDeliveryButton: {
    marginTop: 12,
    backgroundColor: '#3498db',
  },
  noSubscriptionButton: {
    marginTop: 12,
    backgroundColor: '#2ecc71',
  },
  trackButtonLabel: {
    color: '#3498db',
  },
  manageButtonLabel: {
    color: '#2ecc71',
  },
  viewAllButtonLabel: {
    color: '#7f8c8d',
  },
  promotionsContainer: {
    marginBottom: 16,
  },
  recentOrderContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#ecf0f1',
  },
  orderInfo: {
    flex: 1,
  },
  orderId: {
    fontWeight: 'bold',
    fontSize: 14,
    color: '#2c3e50',
  },
  orderDate: {
    fontSize: 12,
    color: '#7f8c8d',
    marginBottom: 4,
  },
  orderItems: {
    fontSize: 14,
    color: '#34495e',
  },
  reorderButton: {
    borderColor: '#3498db',
  },
});

export default HomeScreen;
