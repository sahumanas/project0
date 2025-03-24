import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Divider } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const SubscriptionCard = ({ subscription }) => {
  // Get subscription icon based on type
  const getSubscriptionIcon = (type) => {
    switch (type.toLowerCase()) {
      case 'daily':
        return 'calendar-today';
      case 'alternate days':
        return 'calendar-weekend';
      case 'weekly':
        return 'calendar-week';
      case 'monthly':
        return 'calendar-month';
      default:
        return 'calendar-check';
    }
  };
  
  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <View style={styles.typeContainer}>
          <Icon 
            name={getSubscriptionIcon(subscription.type)} 
            size={18} 
            color="#2ecc71" 
          />
          <Text style={styles.type}>{subscription.type} Subscription</Text>
        </View>
      </View>
      
      <Divider style={styles.divider} />
      
      <View style={styles.detailsContainer}>
        <View style={styles.itemsContainer}>
          {subscription.items.map((item, index) => (
            <View key={index} style={styles.itemRow}>
              <Icon name="water" size={16} color="#3498db" />
              <Text style={styles.itemText}>
                {item.quantity} × {item.productName}
              </Text>
            </View>
          ))}
        </View>
        
        <View style={styles.amountContainer}>
          <Text style={styles.amountLabel}>Per delivery:</Text>
          <Text style={styles.amount}>₹{subscription.totalAmount.toFixed(2)}</Text>
        </View>
      </View>
      
      <View style={styles.nextDeliveryContainer}>
        <Text style={styles.nextDeliveryLabel}>Next delivery on:</Text>
        <Text style={styles.nextDeliveryDate}>{subscription.nextDelivery}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f0fbf6',
    borderRadius: 8,
    padding: 12,
    marginTop: 8,
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  typeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  type: {
    marginLeft: 6,
    fontSize: 16,
    color: '#2c3e50',
    fontWeight: '500',
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
  nextDeliveryContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#e8f8f0',
    paddingVertical: 8,
    paddingHorizontal: 10,
    borderRadius: 4,
  },
  nextDeliveryLabel: {
    fontSize: 14,
    color: '#2c3e50',
  },
  nextDeliveryDate: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#27ae60',
  },
});

export default SubscriptionCard;
