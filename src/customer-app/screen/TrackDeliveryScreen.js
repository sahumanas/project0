import React, { useState, useEffect, useRef } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  SafeAreaView,
  Linking,
  Platform,
} from 'react-native';
import { 
  Card, 
  Title, 
  Paragraph, 
  Button, 
  Badge, 
  Divider,
  Portal,
  Dialog,
  IconButton
} from 'react-native-paper';
import { useNavigation, useRoute } from '@react-navigation/native';
import MapView, { Marker, Polyline, PROVIDER_GOOGLE } from 'react-native-maps';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import LoadingSpinner from '../../shared/components/LoadingSpinner';

const TrackDeliveryScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { deliveryId } = route.params;
  const mapRef = useRef(null);
  
  const [loading, setLoading] = useState(true);
  const [delivery, setDelivery] = useState(null);
  const [deliveryPersonnel, setDeliveryPersonnel] = useState(null);
  const [dialogVisible, setDialogVisible] = useState(false);
  const [tracking, setTracking] = useState(false);
  
  // Mock data for the prototype
  const mockDelivery = {
    id: '1235',
    status: 'In Transit',
    scheduledDate: 'Today',
    timeSlot: '2:00-4:00 PM',
    estimatedArrival: '15 minutes',
    items: [
      { productName: '20L Standard Water Jar', quantity: 2 }
    ],
    totalAmount: 240.00,
    address: {
      fullAddress: '123 Main Street, Apt 4B, Cityville, State',
      coordinates: {
        latitude: 37.78825,
        longitude: -122.4324,
      }
    },
    specialInstructions: 'Please call when nearby.',
  };
  
  const mockDeliveryPersonnel = {
    id: 'DP001',
    name: 'John Smith',
    phone: '(555) 987-6543',
    rating: 4.8,
    location: {
      latitude: 37.78525,
      longitude: -122.4354,
    },
    eta: '15 minutes',
  };
  
  useEffect(() => {
    // In a real app, this would fetch data from the API
    // For the prototype, we'll use mock data
    setTimeout(() => {
      setDelivery(mockDelivery);
      setDeliveryPersonnel(mockDeliveryPersonnel);
      setLoading(false);
    }, 1000);
    
    // Start location tracking (simulation for prototype)
    const trackingInterval = setInterval(() => {
      if (tracking) {
        // Simulate delivery personnel movement (small random changes to coordinates)
        setDeliveryPersonnel(prevState => {
          if (!prevState) return null;
          
          return {
            ...prevState,
            location: {
              latitude: prevState.location.latitude + (Math.random() * 0.0005 - 0.00025),
              longitude: prevState.location.longitude + (Math.random() * 0.0005 - 0.00025),
            },
            eta: Math.max(parseInt(prevState.eta) - 1, 1) + ' minutes',
          };
        });
      }
    }, 5000);
    
    return () => clearInterval(trackingInterval);
  }, [deliveryId, tracking]);
  
  useEffect(() => {
    // Set tracking state to true once data is loaded
    if (delivery && deliveryPersonnel) {
      setTracking(true);
    }
  }, [delivery, deliveryPersonnel]);
  
  useEffect(() => {
    // Fit the map to show both customer and delivery personnel locations
    if (mapRef.current && delivery && deliveryPersonnel) {
      mapRef.current.fitToCoordinates(
        [delivery.address.coordinates, deliveryPersonnel.location],
        {
          edgePadding: { top: 50, right: 50, bottom: 50, left: 50 },
          animated: true,
        }
      );
    }
  }, [delivery, deliveryPersonnel]);
  
  const handleCallDeliveryPersonnel = () => {
    if (deliveryPersonnel?.phone) {
      Linking.openURL(`tel:${deliveryPersonnel.phone.replace(/\D/g, '')}`);
    }
  };
  
  const getStatusColor = (status) => {
    switch (status) {
      case 'Confirmed':
        return '#f39c12';
      case 'Assigned':
        return '#3498db';
      case 'In Transit':
        return '#2980b9';
      case 'Arriving':
        return '#27ae60';
      case 'Delivered':
        return '#2ecc71';
      case 'Cancelled':
        return '#e74c3c';
      default:
        return '#7f8c8d';
    }
  };
  
  const getStatusStep = (status) => {
    switch (status) {
      case 'Confirmed':
        return 1;
      case 'Assigned':
        return 2;
      case 'In Transit':
        return 3;
      case 'Delivered':
        return 4;
      default:
        return 1;
    }
  };
  
  if (loading) {
    return <LoadingSpinner />;
  }
  
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.mapContainer}>
        <MapView
          ref={mapRef}
          provider={PROVIDER_GOOGLE}
          style={styles.map}
          initialRegion={{
            latitude: delivery.address.coordinates.latitude,
            longitude: delivery.address.coordinates.longitude,
            latitudeDelta: 0.01,
            longitudeDelta: 0.01,
          }}
        >
          {/* Customer Location Marker */}
          <Marker
            coordinate={delivery.address.coordinates}
            title="Delivery Address"
            description={delivery.address.fullAddress}
            pinColor="#e74c3c"
          >
            <Icon name="home" size={24} color="#e74c3c" />
          </Marker>
          
          {/* Delivery Personnel Location Marker */}
          {deliveryPersonnel && (
            <Marker
              coordinate={deliveryPersonnel.location}
              title={`${deliveryPersonnel.name} - Delivery Personnel`}
              description={`ETA: ${deliveryPersonnel.eta}`}
            >
              <View style={styles.deliveryMarker}>
                <Icon name="truck-delivery" size={20} color="#FFFFFF" />
              </View>
            </Marker>
          )}
          
          {/* Route Line */}
          {deliveryPersonnel && (
            <Polyline
              coordinates={[deliveryPersonnel.location, delivery.address.coordinates]}
              strokeWidth={3}
              strokeColor="#3498db"
              lineDashPattern={[1]}
            />
          )}
        </MapView>
        
        <TouchableOpacity
          style={styles.mapInfoBanner}
          onPress={() => setDialogVisible(true)}
        >
          <View style={styles.etaContainer}>
            <Icon name="clock-outline" size={20} color="#FFFFFF" />
            <Text style={styles.etaText}>
              ETA: {deliveryPersonnel ? deliveryPersonnel.eta : 'Calculating...'}
            </Text>
          </View>
          
          <Text style={styles.tapForDetailsText}>Tap for details</Text>
        </TouchableOpacity>
      </View>
      
      <View style={styles.contentContainer}>
        {/* Status Tracker */}
        <Card style={styles.statusCard}>
          <Card.Content>
            <Title style={styles.statusTitle}>Order #{delivery.id}</Title>
            <Badge
              style={[
                styles.statusBadge,
                { backgroundColor: getStatusColor(delivery.status) }
              ]}
            >
              {delivery.status}
            </Badge>
            
            <View style={styles.statusTrackerContainer}>
              <View style={styles.statusTracker}>
                <View style={[
                  styles.statusLine,
                  { backgroundColor: getStatusStep(delivery.status) >= 2 ? '#3498db' : '#ecf0f1' }
                ]} />
                
                <View style={styles.statusNodes}>
                  <View style={[
                    styles.statusNode,
                    { backgroundColor: getStatusStep(delivery.status) >= 1 ? '#3498db' : '#ecf0f1' }
                  ]}>
                    {getStatusStep(delivery.status) >= 1 && (
                      <Icon name="check" size={16} color="#FFFFFF" />
                    )}
                  </View>
                  
                  <View style={[
                    styles.statusNode,
                    { backgroundColor: getStatusStep(delivery.status) >= 2 ? '#3498db' : '#ecf0f1' }
                  ]}>
                    {getStatusStep(delivery.status) >= 2 && (
                      <Icon name="check" size={16} color="#FFFFFF" />
                    )}
                  </View>
                  
                  <View style={[
                    styles.statusNode,
                    { backgroundColor: getStatusStep(delivery.status) >= 3 ? '#3498db' : '#ecf0f1' }
                  ]}>
                    {getStatusStep(delivery.status) >= 3 && (
                      <Icon name="check" size={16} color="#FFFFFF" />
                    )}
                  </View>
                  
                  <View style={[
                    styles.statusNode,
                    { backgroundColor: getStatusStep(delivery.status) >= 4 ? '#3498db' : '#ecf0f1' }
                  ]}>
                    {getStatusStep(delivery.status) >= 4 && (
                      <Icon name="check" size={16} color="#FFFFFF" />
                    )}
                  </View>
                </View>
              </View>
              
              <View style={styles.statusLabels}>
                <Text style={[
                  styles.statusLabel,
                  getStatusStep(delivery.status) >= 1 && styles.activeStatusLabel
                ]}>
                  Confirmed
                </Text>
                
                <Text style={[
                  styles.statusLabel,
                  getStatusStep(delivery.status) >= 2 && styles.activeStatusLabel
                ]}>
                  Assigned
                </Text>
                
                <Text style={[
                  styles.statusLabel,
                  getStatusStep(delivery.status) >= 3 && styles.activeStatusLabel
                ]}>
                  In Transit
                </Text>
                
                <Text style={[
                  styles.statusLabel,
                  getStatusStep(delivery.status) >= 4 && styles.activeStatusLabel
                ]}>
                  Delivered
                </Text>
              </View>
            </View>
          </Card.Content>
        </Card>
        
        {/* Delivery Personnel Info */}
        {deliveryPersonnel && delivery.status !== 'Confirmed' && (
          <Card style={styles.personnelCard}>
            <Card.Content>
              <View style={styles.personnelHeader}>
                <Title style={styles.personnelTitle}>Delivery Agent</Title>
                <View style={styles.ratingContainer}>
                  <Icon name="star" size={16} color="#f39c12" />
                  <Text style={styles.ratingText}>{deliveryPersonnel.rating}</Text>
                </View>
              </View>
              
              <View style={styles.personnelInfo}>
                <Icon name="account" size={24} color="#3498db" />
                <Text style={styles.personnelName}>{deliveryPersonnel.name}</Text>
              </View>
              
              <Button
                mode="contained"
                onPress={handleCallDeliveryPersonnel}
                style={styles.callButton}
                icon="phone"
              >
                Call Agent
              </Button>
            </Card.Content>
          </Card>
        )}
      </View>
      
      <Portal>
        <Dialog
          visible={dialogVisible}
          onDismiss={() => setDialogVisible(false)}
          style={styles.dialog}
        >
          <Dialog.Title>Delivery Details</Dialog.Title>
          <Dialog.Content>
            <View style={styles.dialogContent}>
              <View style={styles.dialogSection}>
                <Text style={styles.dialogSectionTitle}>Order Items</Text>
                {delivery.items.map((item, index) => (
                  <Text key={index} style={styles.dialogItemText}>
                    {item.quantity} × {item.productName}
                  </Text>
                ))}
              </View>
              
              <Divider style={styles.dialogDivider} />
              
              <View style={styles.dialogSection}>
                <Text style={styles.dialogSectionTitle}>Delivery Address</Text>
                <Text style={styles.dialogAddressText}>{delivery.address.fullAddress}</Text>
              </View>
              
              <Divider style={styles.dialogDivider} />
              
              <View style={styles.dialogSection}>
                <Text style={styles.dialogSectionTitle}>Delivery Schedule</Text>
                <Text style={styles.dialogScheduleText}>
                  {delivery.scheduledDate}, {delivery.timeSlot}
                </Text>
                <Text style={styles.dialogEtaText}>
                  Estimated arrival in {deliveryPersonnel ? deliveryPersonnel.eta : 'calculating...'}
                </Text>
              </View>
              
              {delivery.specialInstructions && (
                <>
                  <Divider style={styles.dialogDivider} />
                  
                  <View style={styles.dialogSection}>
                    <Text style={styles.dialogSectionTitle}>Special Instructions</Text>
                    <Text style={styles.dialogInstructionsText}>{delivery.specialInstructions}</Text>
                  </View>
                </>
              )}
            </View>
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={() => setDialogVisible(false)}>Close</Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  mapContainer: {
    height: '50%',
    position: 'relative',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  deliveryMarker: {
    backgroundColor: '#3498db',
    padding: 6,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#FFFFFF',
  },
  mapInfoBanner: {
    position: 'absolute',
    bottom: 16,
    left: 16,
    right: 16,
    backgroundColor: 'rgba(52, 152, 219, 0.9)',
    borderRadius: 8,
    padding: 12,
    alignItems: 'center',
  },
  etaContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  etaText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginLeft: 8,
  },
  tapForDetailsText: {
    fontSize: 12,
    color: '#FFFFFF',
    opacity: 0.8,
  },
  contentContainer: {
    flex: 1,
    padding: 16,
  },
  statusCard: {
    marginBottom: 16,
    borderRadius: 8,
    elevation: 2,
  },
  statusTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  statusBadge: {
    alignSelf: 'flex-start',
    marginVertical: 8,
  },
  statusTrackerContainer: {
    marginTop: 16,
  },
  statusTracker: {
    position: 'relative',
    height: 24,
    marginBottom: 8,
  },
  statusLine: {
    position: 'absolute',
    height: 3,
    top: 10,
    left: 0,
    right: 0,
    backgroundColor: '#ecf0f1',
    zIndex: 1,
  },
  statusNodes: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    position: 'relative',
    zIndex: 2,
  },
  statusNode: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#ecf0f1',
    justifyContent: 'center',
    alignItems: 'center',
  },
  statusLabel: {
    fontSize: 10,
    color: '#7f8c8d',
    textAlign: 'center',
    width: 60,
    marginHorizontal: -18, // Adjust for offset
  },
  activeStatusLabel: {
    color: '#3498db',
    fontWeight: '500',
  },
  personnelCard: {
    borderRadius: 8,
    elevation: 2,
  },
  personnelHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  personnelTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff8e1',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  ratingText: {
    marginLeft: 4,
    color: '#f39c12',
    fontWeight: 'bold',
  },
  personnelInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  personnelName: {
    fontSize: 16,
    marginLeft: 8,
    color: '#2c3e50',
  },
  callButton: {
    backgroundColor: '#3498db',
  },
  dialog: {
    borderRadius: 8,
  },
  dialogContent: {
    paddingVertical: 8,
  },
  dialogSection: {
    marginBottom: 16,
  },
  dialogSectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 8,
  },
  dialogItemText: {
    fontSize: 14,
    color: '#2c3e50',
    marginBottom: 4,
  },
  dialogDivider: {
    marginBottom: 16,
  },
  dialogAddressText: {
    fontSize: 14,
    color: '#2c3e50',
  },
  dialogScheduleText: {
    fontSize: 14,
    color: '#2c3e50',
    marginBottom: 4,
  },
  dialogEtaText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#3498db',
  },
  dialogInstructionsText: {
    fontSize: 14,
    color: '#2c3e50',
    fontStyle: 'italic',
  },
});

export default TrackDeliveryScreen;s: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  statusLabel