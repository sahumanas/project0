const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  scrollView: {
    flex: 1,
    padding: 16,
  },
  screenTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#2c3e50',
  },
  emptyCard: {
    borderRadius: 8,
    elevation: 2,
    marginBottom: 16,
  },
  emptyCardContent: {
    alignItems: 'center',
    padding: 24,
  },
  emptyTitle: {
    marginTop: 16,
    fontSize: 20,
    textAlign: 'center',
    color: '#2c3e50',
  },
  emptyText: {
    textAlign: 'center',
    marginBottom: 24,
    color: '#7f8c8d',
  },
  createButton: {
    backgroundColor: '#3498db',
  },
  subscriptionCard: {
    borderRadius: 8,
    elevation: 2,
    marginBottom: 16,
    borderLeftWidth: 5,
    borderLeftColor: '#3498db',
  },
  pausedCard: {
    borderLeftColor: '#f39c12',
  },
  cancelledCard: {
    borderLeftColor: '#95a5a6',
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  frequencyContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  frequencyText: {
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 8,
    color: '#2c3e50',
  },
  statusChip: {
    height: 26,
  },
  activeChip: {
    backgroundColor: '#e8f8f0',
  },
  pausedChip: {
    backgroundColor: '#fff8e1',
  },
  cancelledChip: {
    backgroundColor: '#ecf0f1',
  },
  statusChipText: {
    fontSize: 12,
  },
  itemsContainer: {
    marginBottom: 12,
  },
  itemRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  itemText: {
    marginLeft: 8,
    fontSize: 14,
    color: '#2c3e50',
  },
  divider: {
    marginVertical: 12,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  detailText: {
    marginLeft: 8,
    fontSize: 14,
    color: '#7f8c8d',
  },
  amountContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 8,
  },
  amountLabel: {
    fontSize: 14,
    color: '#7f8c8d',
  },
  amount: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#3498db',
  },
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 16,
  },
  pauseButton: {
    flex: 1,
    marginRight: 8,
    borderColor: '#f39c12',
  },
  editButton: {
    flex: 1,
    marginHorizontal: 4,
    borderColor: '#3498db',
  },
  cancelButton: {
    flex: 1,
    marginLeft: 8,
    borderColor: '#e74c3c',
  },
  pausedInfo: {
    marginTop: 16,
    alignItems: 'center',
  },
  pausedText: {
    fontSize: 14,
    color: '#f39c12',
    marginBottom: 8,
  },
  resumeButton: {
    backgroundColor: '#f39c12',
  },
  cancelledInfo: {
    marginTop: 16,
    alignItems: 'center',
  },
  cancelledText: {
    fontSize: 14,
    color: '#7f8c8d',
    marginBottom: 8,
  },
  newSubscriptionButton: {
    borderColor: '#3498db',
  },
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
    backgroundColor: '#3498db',
  },
  dialog: {
    borderRadius: 8,
  },
  dialogText: {
    marginBottom: 16,
  },
  dateSelectRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  dateInputContainer: {
    flex: 1,
  },
  dateInputLabel: {
    fontSize: 14,
    color: '#7f8c8d',
    marginBottom: 4,
  },
  dateInput: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#dfe6e9',
    borderRadius: 4,
    padding: 12,
    backgroundColor: '#FFFFFF',
  },
  dateInputText: {
    fontSize: 14,
    color: '#2c3e50',
  },
  dateInputDivider: {
    width: 16,
  },
  calendarModal: {
    backgroundColor: 'white',
    margin: 20,
    borderRadius: 8,
    padding: 20,
  },
  calendarContainer: {
    backgroundColor: '#FFFFFF',
  },
  calendarTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
    color: '#2c3e50',
  },
  calendarCloseButton: {
    marginTop: 16,
  },
  listItem: {
    paddingVertical: 8,
  },
  summaryContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 16,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: '#ecf0f1',
  },
  summaryLabel: {
    fontSize: 14,
    color: '#7f8c8d',
  },
  summaryAmount: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#3498db',
  },
  quantityInputContainer: {
    alignItems: 'center',
    marginTop: 16,
  },
});

export default SubscriptionManagementScreen;import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  TouchableOpacity, 
  SafeAreaView,
  Alert
} from 'react-native';
import { 
  Card, 
  Title, 
  Paragraph, 
  Button, 
  Switch, 
  Divider,
  FAB,
  Portal,
  Dialog,
  RadioButton,
  List,
  IconButton,
  DatePickerInput,
  Modal,
  Chip
} from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';
import { Calendar } from 'react-native-calendars';
import NumericInput from 'react-native-numeric-input';
import LoadingSpinner from '../../shared/components/LoadingSpinner';

const SubscriptionManagementScreen = () => {
  const navigation = useNavigation();
  
  const [loading, setLoading] = useState(true);
  const [subscriptions, setSubscriptions] = useState([]);
  const [pauseDialogVisible, setPauseDialogVisible] = useState(false);
  const [selectedSubscription, setSelectedSubscription] = useState(null);
  const [pauseStartDate, setPauseStartDate] = useState('');
  const [pauseEndDate, setPauseEndDate] = useState('');
  const [calendarVisible, setCalendarVisible] = useState(false);
  const [dateSelectionMode, setDateSelectionMode] = useState('start'); // 'start' or 'end'
  const [selectedDates, setSelectedDates] = useState({});
  const [editDialogVisible, setEditDialogVisible] = useState(false);
  const [frequencyDialogVisible, setFrequencyDialogVisible] = useState(false);
  const [selectedFrequency, setSelectedFrequency] = useState('');
  const [quantityDialogVisible, setQuantityDialogVisible] = useState(false);
  const [selectedQuantity, setSelectedQuantity] = useState(1);
  
  // Mock data for prototype
  const mockSubscriptions = [
    {
      id: '5001',
      status: 'active',
      frequency: 'Weekly',
      startDate: '2025-03-01',
      nextDeliveryDate: '2025-03-27',
      pausedDates: [],
      address: {
        id: '1',
        label: 'Home',
        address: '123 Main Street, Apt 4B',
        city: 'Cityville',
        state: 'State',
        postalCode: '12345',
      },
      items: [
        { productId: '1', productName: '20L Standard Water Jar', quantity: 2, price: 120.00 }
      ],
      timeSlot: '2:00 PM - 4:00 PM',
      totalAmount: 240.00,
    },
    {
      id: '5002',
      status: 'paused',
      frequency: 'Monthly',
      startDate: '2025-02-15',
      nextDeliveryDate: '2025-04-15',
      pausedDates: [
        { start: '2025-03-15', end: '2025-04-14' }
      ],
      address: {
        id: '2',
        label: 'Office',
        address: '456 Work Avenue, Floor 5',
        city: 'Cityville',
        state: 'State',
        postalCode: '12345',
      },
      items: [
        { productId: '2', productName: '20L Mineral Water Jar', quantity: 1, price: 180.00 }
      ],
      timeSlot: '10:00 AM - 12:00 PM',
      totalAmount: 180.00,
    },
  ];
  
  useEffect(() => {
    // In a real app, this would fetch data from the API
    // For the prototype, we'll use mock data
    setTimeout(() => {
      setSubscriptions(mockSubscriptions);
      setLoading(false);
    }, 1000);
  }, []);
  
  const handleCreateSubscription = () => {
    navigation.navigate('CreateSubscription');
  };
  
  const handlePauseSubscription = (subscription) => {
    setSelectedSubscription(subscription);
    setPauseStartDate('');
    setPauseEndDate('');
    setSelectedDates({});
    setPauseDialogVisible(true);
  };
  
  const handleEditSubscription = (subscription) => {
    setSelectedSubscription(subscription);
    setEditDialogVisible(true);
  };
  
  const handleCancelSubscription = (subscription) => {
    Alert.alert(
      "Cancel Subscription",
      "Are you sure you want to cancel this subscription?",
      [
        {
          text: "No",
          style: "cancel"
        },
        {
          text: "Yes",
          onPress: () => {
            // In a real app, this would send a request to the API
            // For the prototype, we'll just update the local state
            const updatedSubscriptions = subscriptions.map(sub => {
              if (sub.id === subscription.id) {
                return { ...sub, status: 'cancelled' };
              }
              return sub;
            });
            setSubscriptions(updatedSubscriptions);
            
            Alert.alert(
              "Subscription Cancelled",
              "Your subscription has been successfully cancelled."
            );
          }
        }
      ]
    );
  };
  
  const handleResumeSubscription = (subscription) => {
    // In a real app, this would send a request to the API
    // For the prototype, we'll just update the local state
    const updatedSubscriptions = subscriptions.map(sub => {
      if (sub.id === subscription.id) {
        return { 
          ...sub, 
          status: 'active',
          pausedDates: [] 
        };
      }
      return sub;
    });
    setSubscriptions(updatedSubscriptions);
    
    Alert.alert(
      "Subscription Resumed",
      "Your subscription has been successfully resumed."
    );
  };
  
  const handleConfirmPause = () => {
    if (!pauseStartDate || !pauseEndDate) {
      Alert.alert("Error", "Please select both start and end dates");
      return;
    }
    
    // In a real app, this would send a request to the API
    // For the prototype, we'll just update the local state
    const updatedSubscriptions = subscriptions.map(sub => {
      if (sub.id === selectedSubscription.id) {
        return { 
          ...sub, 
          status: 'paused',
          pausedDates: [
            ...sub.pausedDates,
            { start: pauseStartDate, end: pauseEndDate }
          ] 
        };
      }
      return sub;
    });
    setSubscriptions(updatedSubscriptions);
    setPauseDialogVisible(false);
    
    Alert.alert(
      "Subscription Paused",
      `Your subscription has been paused from ${pauseStartDate} to ${pauseEndDate}.`
    );
  };
  
  const handleShowCalendar = (mode) => {
    setDateSelectionMode(mode);
    setCalendarVisible(true);
  };
  
  const handleDateSelect = (day) => {
    const date = day.dateString;
    
    if (dateSelectionMode === 'start') {
      setPauseStartDate(date);
      
      // Update marked dates
      setSelectedDates({
        ...selectedDates,
        [date]: { selected: true, startingDay: true, color: '#3498db' }
      });
      
      // Switch to end date selection
      setDateSelectionMode('end');
    } else {
      // Ensure end date is after start date
      if (date < pauseStartDate) {
        Alert.alert("Error", "End date must be after start date");
        return;
      }
      
      setPauseEndDate(date);
      
      // Update marked dates
      const markedDates = { ...selectedDates };
      markedDates[date] = { selected: true, endingDay: true, color: '#3498db' };
      
      // Mark all dates in between
      let currentDate = new Date(pauseStartDate);
      currentDate.setDate(currentDate.getDate() + 1);
      const endDate = new Date(date);
      
      while (currentDate < endDate) {
        const dateString = currentDate.toISOString().split('T')[0];
        markedDates[dateString] = { selected: true, color: '#3498db' };
        currentDate.setDate(currentDate.getDate() + 1);
      }
      
      setSelectedDates(markedDates);
      setCalendarVisible(false);
    }
  };
  
  const handleChangeFrequency = () => {
    if (!selectedSubscription) return;
    
    setSelectedFrequency(selectedSubscription.frequency);
    setFrequencyDialogVisible(true);
  };
  
  const handleConfirmFrequencyChange = () => {
    // In a real app, this would send a request to the API
    // For the prototype, we'll just update the local state
    const updatedSubscriptions = subscriptions.map(sub => {
      if (sub.id === selectedSubscription.id) {
        return { ...sub, frequency: selectedFrequency };
      }
      return sub;
    });
    setSubscriptions(updatedSubscriptions);
    setFrequencyDialogVisible(false);
    
    // Update selected subscription for the edit dialog
    setSelectedSubscription(prev => ({ ...prev, frequency: selectedFrequency }));
  };
  
  const handleChangeQuantity = () => {
    if (!selectedSubscription) return;
    
    // Use the quantity from the first item (simplified for prototype)
    setSelectedQuantity(selectedSubscription.items[0].quantity);
    setQuantityDialogVisible(true);
  };
  
  const handleConfirmQuantityChange = () => {
    // In a real app, this would send a request to the API
    // For the prototype, we'll just update the local state
    const updatedSubscriptions = subscriptions.map(sub => {
      if (sub.id === selectedSubscription.id) {
        // Update the quantity for all items (simplified for prototype)
        const updatedItems = sub.items.map(item => ({
          ...item,
          quantity: selectedQuantity
        }));
        
        // Recalculate total amount
        const newTotal = updatedItems.reduce(
          (sum, item) => sum + (item.price * selectedQuantity), 
          0
        );
        
        return { 
          ...sub, 
          items: updatedItems,
          totalAmount: newTotal
        };
      }
      return sub;
    });
    setSubscriptions(updatedSubscriptions);
    setQuantityDialogVisible(false);
    
    // Update selected subscription for the edit dialog
    const updatedItems = selectedSubscription.items.map(item => ({
      ...item,
      quantity: selectedQuantity
    }));
    
    const newTotal = updatedItems.reduce(
      (sum, item) => sum + (item.price * selectedQuantity), 
      0
    );
    
    setSelectedSubscription(prev => ({ 
      ...prev, 
      items: updatedItems,
      totalAmount: newTotal
    }));
  };
  
  if (loading) {
    return <LoadingSpinner />;
  }
  
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <Title style={styles.screenTitle}>My Subscriptions</Title>
        
        {subscriptions.length === 0 ? (
          <Card style={styles.emptyCard}>
            <Card.Content style={styles.emptyCardContent}>
              <Icon name="calendar-blank" size={64} color="#bdc3c7" />
              <Title style={styles.emptyTitle}>No Active Subscriptions</Title>
              <Paragraph style={styles.emptyText}>
                Subscribe for regular water jar deliveries and never run out.
              </Paragraph>
              <Button 
                mode="contained"
                onPress={handleCreateSubscription}
                style={styles.createButton}
              >
                Create Subscription
              </Button>
            </Card.Content>
          </Card>
        ) : (
          <>
            {subscriptions.map((subscription) => (
              <Card 
                key={subscription.id}
                style={[
                  styles.subscriptionCard,
                  subscription.status === 'paused' && styles.pausedCard,
                  subscription.status === 'cancelled' && styles.cancelledCard
                ]}
              >
                <Card.Content>
                  <View style={styles.cardHeader}>
                    <View style={styles.frequencyContainer}>
                      <Icon 
                        name="calendar-clock" 
                        size={20} 
                        color={
                          subscription.status === 'paused' ? '#f39c12' : 
                          subscription.status === 'cancelled' ? '#95a5a6' : 
                          '#3498db'
                        } 
                      />
                      <Text style={styles.frequencyText}>{subscription.frequency} Delivery</Text>
                    </View>
                    
                    <Chip 
                      style={[
                        styles.statusChip,
                        subscription.status === 'active' && styles.activeChip,
                        subscription.status === 'paused' && styles.pausedChip,
                        subscription.status === 'cancelled' && styles.cancelledChip,
                      ]}
                      textStyle={styles.statusChipText}
                    >
                      {subscription.status.charAt(0).toUpperCase() + subscription.status.slice(1)}
                    </Chip>
                  </View>
                  
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
                  
                  <Divider style={styles.divider} />
                  
                  <View style={styles.detailRow}>
                    <Icon name="home-outline" size={16} color="#7f8c8d" />
                    <Text style={styles.detailText}>
                      Delivering to: {subscription.address.label}
                    </Text>
                  </View>
                  
                  <View style={styles.detailRow}>
                    <Icon name="clock-outline" size={16} color="#7f8c8d" />
                    <Text style={styles.detailText}>
                      Time slot: {subscription.timeSlot}
                    </Text>
                  </View>
                  
                  {subscription.status !== 'cancelled' && (
                    <View style={styles.detailRow}>
                      <Icon name="calendar-check" size={16} color="#7f8c8d" />
                      <Text style={styles.detailText}>
                        Next delivery: {subscription.nextDeliveryDate}
                      </Text>
                    </View>
                  )}
                  
                  <View style={styles.amountContainer}>
                    <Text style={styles.amountLabel}>Subscription Amount:</Text>
                    <Text style={styles.amount}>₹{subscription.totalAmount.toFixed(2)}</Text>
                  </View>
                  
                  {subscription.status === 'active' && (
                    <View style={styles.actionButtons}>
                      <Button 
                        mode="outlined"
                        onPress={() => handlePauseSubscription(subscription)}
                        style={styles.pauseButton}
                        icon="pause"
                      >
                        Pause
                      </Button>
                      <Button 
                        mode="outlined"
                        onPress={() => handleEditSubscription(subscription)}
                        style={styles.editButton}
                        icon="pencil"
                      >
                        Edit
                      </Button>
                      <Button 
                        mode="outlined"
                        onPress={() => handleCancelSubscription(subscription)}
                        style={styles.cancelButton}
                        icon="close"
                      >
                        Cancel
                      </Button>
                    </View>
                  )}
                  
                  {subscription.status === 'paused' && (
                    <View style={styles.pausedInfo}>
                      <Text style={styles.pausedText}>
                        Paused until: {subscription.pausedDates[0].end}
                      </Text>
                      <Button 
                        mode="contained"
                        onPress={() => handleResumeSubscription(subscription)}
                        style={styles.resumeButton}
                        icon="play"
                      >
                        Resume Now
                      </Button>
                    </View>
                  )}
                  
                  {subscription.status === 'cancelled' && (
                    <View style={styles.cancelledInfo}>
                      <Text style={styles.cancelledText}>
                        This subscription has been cancelled.
                      </Text>
                      <Button 
                        mode="outlined"
                        onPress={handleCreateSubscription}
                        style={styles.newSubscriptionButton}
                        icon="plus"
                      >
                        New Subscription
                      </Button>
                    </View>
                  )}
                </Card.Content>
              </Card>
            ))}
          </>
        )}
      </ScrollView>
      
      {subscriptions.length > 0 && (
        <FAB
          style={styles.fab}
          icon="plus"
          label="New Subscription"
          onPress={handleCreateSubscription}
        />
      )}
      
      {/* Pause Subscription Dialog */}
      <Portal>
        <Dialog 
          visible={pauseDialogVisible} 
          onDismiss={() => setPauseDialogVisible(false)}
          style={styles.dialog}
        >
          <Dialog.Title>Pause Subscription</Dialog.Title>
          <Dialog.Content>
            <Paragraph style={styles.dialogText}>
              Select the dates you want to pause your subscription.
            </Paragraph>
            
            <View style={styles.dateSelectRow}>
              <View style={styles.dateInputContainer}>
                <Text style={styles.dateInputLabel}>Start Date:</Text>
                <TouchableOpacity 
                  style={styles.dateInput}
                  onPress={() => handleShowCalendar('start')}
                >
                  <Text style={styles.dateInputText}>
                    {pauseStartDate || 'Select date'}
                  </Text>
                  <Icon name="calendar" size={20} color="#3498db" />
                </TouchableOpacity>
              </View>
              
              <View style={styles.dateInputDivider} />
              
              <View style={styles.dateInputContainer}>
                <Text style={styles.dateInputLabel}>End Date:</Text>
                <TouchableOpacity 
                  style={styles.dateInput}
                  onPress={() => handleShowCalendar('end')}
                >
                  <Text style={styles.dateInputText}>
                    {pauseEndDate || 'Select date'}
                  </Text>
                  <Icon name="calendar" size={20} color="#3498db" />
                </TouchableOpacity>
              </View>
            </View>
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={() => setPauseDialogVisible(false)}>Cancel</Button>
            <Button onPress={handleConfirmPause}>Confirm</Button>
          </Dialog.Actions>
        </Dialog>
        
        {/* Calendar Modal */}
        <Modal 
          visible={calendarVisible} 
          onDismiss={() => setCalendarVisible(false)}
          contentContainerStyle={styles.calendarModal}
        >
          <View style={styles.calendarContainer}>
            <Text style={styles.calendarTitle}>
              Select {dateSelectionMode === 'start' ? 'Start' : 'End'} Date
            </Text>
            
            <Calendar
              onDayPress={handleDateSelect}
              markedDates={selectedDates}
              minDate={dateSelectionMode === 'start' ? new Date().toISOString().split('T')[0] : pauseStartDate}
              theme={{
                selectedDayBackgroundColor: '#3498db',
                todayTextColor: '#3498db',
                arrowColor: '#3498db',
              }}
            />
            
            <Button 
              onPress={() => setCalendarVisible(false)}
              style={styles.calendarCloseButton}
            >
              Cancel
            </Button>
          </View>
        </Modal>
        
        {/* Edit Subscription Dialog */}
        <Dialog 
          visible={editDialogVisible} 
          onDismiss={() => setEditDialogVisible(false)}
          style={styles.dialog}
        >
          <Dialog.Title>Edit Subscription</Dialog.Title>
          <Dialog.Content>
            <List.Item
              title="Delivery Frequency"
              description={selectedSubscription?.frequency || ''}
              left={props => <List.Icon {...props} icon="calendar-clock" />}
              right={props => <IconButton {...props} icon="pencil" onPress={handleChangeFrequency} />}
              style={styles.listItem}
            />
            
            <List.Item
              title="Quantity"
              description={`${selectedSubscription?.items[0]?.quantity || 0} jars`}
              left={props => <List.Icon {...props} icon="water" />}
              right={props => <IconButton {...props} icon="pencil" onPress={handleChangeQuantity} />}
              style={styles.listItem}
            />
            
            <List.Item
              title="Delivery Address"
              description={selectedSubscription?.address?.label || ''}
              left={props => <List.Icon {...props} icon="home-outline" />}
              right={props => <IconButton {...props} icon="pencil" onPress={() => {}} />}
              style={styles.listItem}
            />
            
            <List.Item
              title="Time Slot"
              description={selectedSubscription?.timeSlot || ''}
              left={props => <List.Icon {...props} icon="clock-outline" />}
              right={props => <IconButton {...props} icon="pencil" onPress={() => {}} />}
              style={styles.listItem}
            />
            
            {selectedSubscription && (
              <View style={styles.summaryContainer}>
                <Text style={styles.summaryLabel}>Subscription Amount:</Text>
                <Text style={styles.summaryAmount}>
                  ₹{selectedSubscription.totalAmount.toFixed(2)}
                </Text>
              </View>
            )}
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={() => setEditDialogVisible(false)}>Done</Button>
          </Dialog.Actions>
        </Dialog>
        
        {/* Frequency Change Dialog */}
        <Dialog 
          visible={frequencyDialogVisible} 
          onDismiss={() => setFrequencyDialogVisible(false)}
        >
          <Dialog.Title>Change Frequency</Dialog.Title>
          <Dialog.Content>
            <RadioButton.Group 
              onValueChange={value => setSelectedFrequency(value)} 
              value={selectedFrequency}
            >
              <RadioButton.Item label="Daily" value="Daily" />
              <RadioButton.Item label="Alternate Days" value="Alternate Days" />
              <RadioButton.Item label="Weekly" value="Weekly" />
              <RadioButton.Item label="Monthly" value="Monthly" />
            </RadioButton.Group>
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={() => setFrequencyDialogVisible(false)}>Cancel</Button>
            <Button onPress={handleConfirmFrequencyChange}>Save</Button>
          </Dialog.Actions>
        </Dialog>
        
        {/* Quantity Change Dialog */}
        <Dialog 
          visible={quantityDialogVisible} 
          onDismiss={() => setQuantityDialogVisible(false)}
        >
          <Dialog.Title>Change Quantity</Dialog.Title>
          <Dialog.Content>
            <Paragraph style={styles.dialogText}>
              Select the number of water jars for each delivery.
            </Paragraph>
            
            <View style={styles.quantityInputContainer}>
              <NumericInput
                value={selectedQuantity}
                onChange={value => setSelectedQuantity(value)}
                minValue={1}
                maxValue={10}
                totalWidth={200}
                totalHeight={50}
                iconSize={25}
                step={1}
                valueType="integer"
                rounded
                textColor="#2c3e50"
                iconStyle={{ color: 'white' }}
                rightButtonBackgroundColor="#3498db"
                leftButtonBackgroundColor="#3498db"
              />
            </View>
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={() => setQuantityDialogVisible(false)}>Cancel</Button>
            <Button onPress={handleConfirmQuantityChange}>Save</Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </SafeAreaView>
  );
};