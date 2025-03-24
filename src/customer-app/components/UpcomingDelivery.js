import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Divider, Badge } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const UpcomingDelivery = ({ delivery, onPress }) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.container}>
      <View style={styles.headerContainer}>
        <View style={styles.timeSlotContainer}>
          <Icon name="clock-outline" size={16} color="#7f8c8d" />
          <Text style={styles.timeSlot}>{delivery.scheduledDate}, {delivery.timeSlot}</Text>
        </View>
        <Badge style={styles.statusBadge}>
          {delivery.status}
        </Badge>
      </View>
      
      <Divider style={styles.divider} />
      
      <View style={styles.detailsContainer}>
        <View style={styles.itemsContainer}>
          {delivery.items.map((item, index) => (
            <View key={index} style={styles.itemRow}>
              <Icon name="water" size={16} color="#3498db" />
              <Text style={styles.itemText}>
                {item.quantity} × {item.productName}
              </Text>
            </View>
          ))}
        </View>
        
        <View style={styles.amountContainer}>
          <Text style={styles.amountLabel}>Total:</Text>
          <Text style={styles.amount}>₹{delivery.totalAmount.toFixed(2)}</Text>
        </View>
      </View>
      
      <View style={styles.trackingContainer}>
        <Icon name="map-marker" size={16} color="#e74c3c" />
        <Text style={styles.trackingText}>Tap to Track</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f8f9fa',
    borderRadius: 8,
    padding: 12,
    marginTop: 8,
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  timeSlotContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  timeSlot: {
    marginLeft: 4,
    fontSize: 14,
    color: '#34495e',
  },
  statusBadge: {
    backgroundColor: '#3498db',
  },
  divider: {
    marginVertical: 10,
  },
  detailsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 10,
  },
  itemsContainer: {
    flex: 1,
  },
  itemRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  itemText: {
    marginLeft: 4,
    fontSize: 14,
    color: '#2c3e50',
  },
  amountContainer: {
    alignItems: 'flex-end',
  },
  amountLabel: {
    fontSize: 12,
    color: '#7f8c8d',
  },
  amount: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2c3e50',
  },
  trackingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f2f6ff',
    paddingVertical: 8,
    borderRadius: 4,
  },
  trackingText: {
    marginLeft: 4,
    color: '#3498db',
    fontSize: 14,
    fontWeight: '500',
  },
});

export default UpcomingDelivery;
