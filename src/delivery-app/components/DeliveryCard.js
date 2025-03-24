import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Card, Button, Divider, Badge } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const DeliveryCard = ({ delivery, onPress, onStartDelivery }) => {
  return (
    <Card style={styles.card} onPress={onPress}>
      <Card.Content>
        <View style={styles.headerRow}>
          <View style={styles.timeSlot}>
            <Icon name="clock-outline" size={18} color="#555" />
            <Text style={styles.timeSlotText}>{delivery.timeSlot}</Text>
          </View>
          <Badge style={styles.statusBadge}>
            {delivery.status}
          </Badge>
        </View>
        
        <Text style={styles.orderId}>Order #{delivery.id}</Text>
        <Text style={styles.items}>
          {delivery.orderDetails.items.map(item => 
            `${item.quantity} x ${item.productName}`
          ).join(', ')}
        </Text>
        
        <Divider style={styles.divider} />
        
        <View style={styles.addressRow}>
          <Icon name="map-marker" size={18} color="#555" />
          <Text style={styles.address} numberOfLines={2}>
            {delivery.customer.address}
          </Text>
          <View style={styles.distanceContainer}>
            <Icon name="compass" size={16} color="#3498db" />
            <Text style={styles.distance}>{delivery.distance}</Text>
          </View>
        </View>
        
        <View style={styles.customerInfo}>
          <Icon name="account" size={18} color="#555" />
          <Text style={styles.customerName}>{delivery.customer.name}</Text>
        </View>
      </Card.Content>
      
      <Card.Actions style={styles.cardActions}>
        <Button 
          mode="outlined" 
          onPress={onPress}
          style={styles.detailsButton}
        >
          Details
        </Button>
        <Button 
          mode="contained" 
          onPress={onStartDelivery}
          style={styles.startButton}
          icon="play"
        >
          Start Delivery
        </Button>
      </Card.Actions>
    </Card>
  );
};

const styles = StyleSheet.create({
  card: {
    borderRadius: 8,
    elevation: 2,
    marginBottom: 12,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  timeSlot: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  timeSlotText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#555',
    marginLeft: 4,
  },
  statusBadge: {
    backgroundColor: '#f39c12',
    paddingHorizontal: 8,
  },
  orderId: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  items: {
    fontSize: 14,
    color: '#555',
  },
  divider: {
    marginVertical: 10,
  },
  addressRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  address: {
    flex: 1,
    fontSize: 14,
    color: '#555',
    marginLeft: 4,
  },
  distanceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 8,
    backgroundColor: '#ecf0f1',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 12,
  },
  distance: {
    fontSize: 12,
    color: '#3498db',
    fontWeight: '600',
    marginLeft: 2,
  },
  customerInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  customerName: {
    fontSize: 14,
    marginLeft: 4,
  },
  cardActions: {
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
  detailsButton: {
    borderColor: '#3498db',
  },
  startButton: {
    backgroundColor: '#3498db',
  },
});

export default DeliveryCard;
