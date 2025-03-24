import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  TouchableOpacity, 
  Linking,
  SafeAreaView,
  Alert
} from 'react-native';
import { Card, Button, Divider, Badge, Title, Paragraph, List } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import MapView, { Marker } from 'react-native-maps';
import { useNavigation, useRoute } from '@react-navigation/native';
import LoadingSpinner from '../../shared/components/LoadingSpinner';

const DeliveryDetailsScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { deliveryId } = route.params;
  const [delivery, setDelivery] = useState(null);
  const [loading, setLoading] = useState(true);

  // Mock data for the prototype
  const mockDelivery = {
    id: '1235',
    customer: {
      name: 'Sarah Johnson',
      phone: '(555) 123-4567',
      address: '123 Main Street, Apt 4B, Cityville, State',
      location: {
        latitude: 37.78825,
        longitude: -122.4324,
      }
    },
    orderDetails: {
      items: [{ productName: '20L Standard Water Jar', quantity: 2, price: 120.00 }],
      totalAmount: 240.00,
      paymentStatus: 'Prepaid',
      specialInstructions: 'Please call when nearby.',
    },
    status: 'In Transit',
    timeSlot: '2:00-4:00 PM',
    eta: '15 minutes',
    distance: '2.1 km',
    emptyJarsToCollect: 2,
  };

  useEffect(() => {
    // In a real app, this would fetch data from the API
    // For the prototype, we'll use mock data
    setTimeout(() => {
      setDelivery(mockDelivery);
      setLoading(false);
    }, 1000);
  }, [deliveryId]);

  const handleCallCustomer = () => {
    if (delivery?.customer?.phone) {
      Linking.openURL(`tel:${delivery.customer.phone}`);
    }
  };

  const handleNavigate = () => {
    navigation.navigate('Navigation', { deliveryId });
  };

  const handleCompleteDelivery = () => {
    navigation.navigate('DeliveryConfirmation', { deliveryId });
  };

  const handleCancelDelivery = () => {
    Alert.alert(
      "Cancel Delivery",
      "Are you sure you want to mark this delivery as failed?",
      [
        {
          text: "No",
          style: "cancel"
        },
        { 
          text: "Yes", 
          onPress: () => {
            navigation.navigate('FailureReason', { deliveryId });
          }
        }
      ]
    );
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <Card style={styles.headerCard}>
          <Card.Content>
            <View style={styles.headerRow}>
              <Text style={styles.orderId}>Order #{delivery.id}</Text>
              <Badge style={styles.statusBadge}>
                {delivery.status}
              </Badge>
            </View>
            <Divider style={styles.divider} />
            <Text style={styles.timeSlot}>Time Slot: {delivery.timeSlot}</Text>
          </Card.Content>
        </Card>

        <Card style={styles.card}>
          <Card.Content>
            <Title style={styles.sectionTitle}>Customer</Title>
            <View style={styles.customerInfo}>
              <Icon name="account" size={24} color="#555" />
              <Text style={styles.customerName}>{delivery.customer.name}</Text>
            </View>
            <TouchableOpacity style={styles.phoneContainer} onPress={handleCallCustomer}>
              <Icon name="phone" size={24} color="#27ae60" />
              <Text style={styles.phoneNumber}>{delivery.customer.phone}</Text>
            </TouchableOpacity>
          </Card.Content>
          <Card.Actions style={styles.cardActions}>
            <Button 
              mode="contained" 
              onPress={handleCallCustomer}
              style={styles.callButton}
              icon="phone"
            >
              Call Customer
            </Button>
          </Card.Actions>
        </Card>

        <Card style={styles.card}>
          <Card.Content>
            <Title style={styles.sectionTitle}>Delivery Address</Title>
            <View style={styles.addressContainer}>
              <Icon name="map-marker" size={24} color="#555" />
              <Text style={styles.address}>{delivery.customer.address}</Text>
            </View>

            <View style={styles.mapContainer}>
              <MapView
                style={styles.map}
                initialRegion={{
                  latitude: delivery.customer.location.latitude,
                  longitude: delivery.customer.location.longitude,
                  latitudeDelta: 0.01,
                  longitudeDelta: 0.01,
                }}
              >
                <Marker
                  coordinate={{
                    latitude: delivery.customer.location.latitude,
                    longitude: delivery.customer.location.longitude,
                  }}
                  title={delivery.customer.name}
                  description={delivery.customer.address}
                />
              </MapView>
            </View>
          </Card.Content>
          <Card.Actions style={styles.cardActions}>
            <Button 
              mode="contained" 
              onPress={handleNavigate}
              style={styles.navigateButton}
              icon="navigation"
            >
              Navigate
            </Button>
          </Card.Actions>
        </Card>

        <Card style={styles.card}>
          <Card.Content>
            <Title style={styles.sectionTitle}>Order Details</Title>
            <List.Section>
              {delivery.orderDetails.items.map((item, index) => (
                <List.Item
                  key={index}
                  title={item.productName}
                  description={`₹${item.price} x ${item.quantity}`}
                  left={props => <List.Icon {...props} icon="water" />}
                  right={props => <Text style={styles.itemTotal}>₹{item.price * item.quantity}</Text>}
                />
              ))}
            </List.Section>
            <Divider style={styles.divider} />
            <View style={styles.totalContainer}>
              <Text style={styles.totalLabel}>Total Amount:</Text>
              <Text style={styles.totalAmount}>₹{delivery.orderDetails.totalAmount}</Text>
            </View>
            <View style={styles.paymentStatusContainer}>
              <Text style={styles.paymentStatusLabel}>Payment Status:</Text>
              <Badge 
                style={[
                  styles.paymentStatusBadge, 
                  delivery.orderDetails.paymentStatus === 'Prepaid' 
                    ? styles.prepaidBadge 
                    : styles.codBadge
                ]}
              >
                {delivery.orderDetails.paymentStatus}
              </Badge>
            </View>
          </Card.Content>
        </Card>

        <Card style={styles.card}>
          <Card.Content>
            <Title style={styles.sectionTitle}>Empty Jars to Collect</Title>
            <View style={styles.emptyJarsContainer}>
              <Icon name="bottle-wine-outline" size={24} color="#555" />
              <Text style={styles.emptyJarsCount}>{delivery.emptyJarsToCollect} jars</Text>
            </View>
          </Card.Content>
        </Card>

        {delivery.orderDetails.specialInstructions ? (
          <Card style={styles.card}>
            <Card.Content>
              <Title style={styles.sectionTitle}>Special Instructions</Title>
              <Text style={styles.specialInstructions}>
                {delivery.orderDetails.specialInstructions}
              </Text>
            </Card.Content>
          </Card>
        ) : null}

        <View style={styles.actionButtonsContainer}>
          <Button 
            mode="contained" 
            onPress={handleCompleteDelivery}
            style={styles.completeButton}
            contentStyle={styles.actionButtonContent}
          >
            Mark as Delivered
          </Button>
          <Button 
            mode="outlined" 
            onPress={handleCancelDelivery}
            style={styles.cancelButton}
            contentStyle={styles.actionButtonContent}
          >
            Delivery Failed
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
  headerCard: {
    borderRadius: 8,
    marginBottom: 16,
    elevation: 4,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  orderId: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  statusBadge: {
    backgroundColor: '#3498db',
    paddingHorizontal: 8,
  },
  timeSlot: {
    marginTop: 8,
    fontSize: 16,
    color: '#555',
  },
  divider: {
    marginVertical: 12,
  },
  card: {
    borderRadius: 8,
    marginBottom: 16,
    elevation: 2,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  customerInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  customerName: {
    marginLeft: 12,
    fontSize: 16,
    fontWeight: '500',
  },
  phoneContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  phoneNumber: {
    marginLeft: 12,
    fontSize: 16,
    color: '#27ae60',
    textDecorationLine: 'underline',
  },
  addressContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  address: {
    marginLeft: 12,
    fontSize: 16,
    color: '#555',
    flex: 1,
  },
  mapContainer: {
    height: 200,
    borderRadius: 8,
    overflow: 'hidden',
    marginVertical: 8,
  },
  map: {
    width: '100%',
    height: '100%',
  },
  emptyJarsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  emptyJarsCount: {
    marginLeft: 12,
    fontSize: 16,
  },
  specialInstructions: {
    fontSize: 16,
    fontStyle: 'italic',
    color: '#555',
  },
  itemTotal: {
    fontSize: 16,
    fontWeight: 'bold',
    alignSelf: 'center',
  },
  totalContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
  },
  totalLabel: {
    fontSize: 16,
    fontWeight: '500',
  },
  totalAmount: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  paymentStatusContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 8,
  },
  paymentStatusLabel: {
    fontSize: 16,
    fontWeight: '500',
  },
  paymentStatusBadge: {
    paddingHorizontal: 8,
  },
  prepaidBadge: {
    backgroundColor: '#27ae60',
  },
  codBadge: {
    backgroundColor: '#e67e22',
  },
  cardActions: {
    justifyContent: 'center',
    paddingBottom: 16,
  },
  callButton: {
    backgroundColor: '#27ae60',
  },
  navigateButton: {
    backgroundColor: '#3498db',
  },
  actionButtonsContainer: {
    marginBottom: 24,
  },
  completeButton: {
    backgroundColor: '#27ae60',
    marginBottom: 12,
    borderRadius: 8,
    padding: 4,
  },
  cancelButton: {
    borderColor: '#e74c3c',
    borderRadius: 8,
    padding: 4,
  },
  actionButtonContent: {
    height: 48,
  },
});

export default DeliveryDetailsScreen;
