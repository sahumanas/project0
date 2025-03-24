import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  TouchableOpacity, 
  Alert,
  SafeAreaView 
} from 'react-native';
import { 
  Card, 
  Button, 
  Divider, 
  Title, 
  DataTable,
  IconButton,
  Dialog,
  Portal,
  TextInput,
  Paragraph
} from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';
import { BarChart } from 'react-native-chart-kit';
import { Dimensions } from 'react-native';
import LoadingSpinner from '../../shared/components/LoadingSpinner';

const screenWidth = Dimensions.get('window').width;

const InventoryManagementScreen = () => {
  const navigation = useNavigation();
  const [loading, setLoading] = useState(true);
  const [inventory, setInventory] = useState([]);
  const [dialogVisible, setDialogVisible] = useState(false);
  const [adjustmentItem, setAdjustmentItem] = useState(null);
  const [adjustmentValue, setAdjustmentValue] = useState('');
  const [damageReportVisible, setDamageReportVisible] = useState(false);
  const [damageItem, setDamageItem] = useState(null);
  const [damageCount, setDamageCount] = useState('');
  const [damageReason, setDamageReason] = useState('');
  
  // Mock data for the prototype
  const mockInventory = [
    {
      id: 1,
      name: '20L Standard Water Jar',
      fullJars: 12,
      emptyJars: 15,
      type: 'standard',
    },
    {
      id: 2,
      name: '20L Mineral Water Jar',
      fullJars: 8,
      emptyJars: 7,
      type: 'mineral',
    },
    {
      id: 3,
      name: '10L Standard Water Jar',
      fullJars: 6,
      emptyJars: 4,
      type: 'standard_small',
    },
  ];

  useEffect(() => {
    // In a real app, this would fetch data from the API
    // For the prototype, we'll use mock data
    setTimeout(() => {
      setInventory(mockInventory);
      setLoading(false);
    }, 1000);
  }, []);

  const handleAdjustInventory = (item) => {
    setAdjustmentItem(item);
    setAdjustmentValue(String(item.fullJars));
    setDialogVisible(true);
  };

  const chartData = {
    labels: inventory.map(item => item.name.replace('Water Jar', '').trim()),
    datasets: [
      {
        data: inventory.map(item => item.fullJars),
        color: (opacity = 1) => `rgba(52, 152, 219, ${opacity})`,
        strokeWidth: 2
      }
    ]
  };
  
  const chartConfig = {
    backgroundGradientFrom: '#ffffff',
    backgroundGradientTo: '#ffffff',
    color: (opacity = 1) => `rgba(52, 152, 219, ${opacity})`,
    strokeWidth: 2,
    barPercentage: 0.6,
    decimalPlaces: 0
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  const { fullJars, emptyJars } = getTotalJars();

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <Title style={styles.screenTitle}>Inventory Management</Title>
        
        <Card style={styles.summaryCard}>
          <Card.Content>
            <Title style={styles.sectionTitle}>Current Load</Title>
            <View style={styles.summaryContainer}>
              <View style={styles.summaryItem}>
                <Text style={styles.summaryLabel}>Full Jars</Text>
                <Text style={styles.summaryValue}>{fullJars}</Text>
              </View>
              <View style={styles.summaryDivider} />
              <View style={styles.summaryItem}>
                <Text style={styles.summaryLabel}>Empty Jars</Text>
                <Text style={styles.summaryValue}>{emptyJars}</Text>
              </View>
            </View>

            <Title style={[styles.sectionTitle, { marginTop: 16 }]}>Inventory Breakdown</Title>
            <View style={styles.chartContainer}>
              <BarChart
                data={chartData}
                width={screenWidth - 64}
                height={200}
                chartConfig={chartConfig}
                verticalLabelRotation={30}
                fromZero
                showValuesOnTopOfBars
              />
            </View>
          </Card.Content>
        </Card>

        <Card style={styles.inventoryCard}>
          <Card.Content>
            <Title style={styles.sectionTitle}>Detailed Inventory</Title>
            <DataTable>
              <DataTable.Header>
                <DataTable.Title>Item</DataTable.Title>
                <DataTable.Title numeric>Full</DataTable.Title>
                <DataTable.Title numeric>Empty</DataTable.Title>
                <DataTable.Title numeric>Actions</DataTable.Title>
              </DataTable.Header>

              {inventory.map((item) => (
                <DataTable.Row key={item.id}>
                  <DataTable.Cell>{item.name}</DataTable.Cell>
                  <DataTable.Cell numeric>{item.fullJars}</DataTable.Cell>
                  <DataTable.Cell numeric>{item.emptyJars}</DataTable.Cell>
                  <DataTable.Cell numeric style={styles.actionCell}>
                    <IconButton
                      icon="pencil-outline"
                      size={20}
                      onPress={() => handleAdjustInventory(item)}
                    />
                    <IconButton
                      icon="alert-circle-outline"
                      size={20}
                      color="#e74c3c"
                      onPress={() => handleReportDamage(item)}
                    />
                  </DataTable.Cell>
                </DataTable.Row>
              ))}
            </DataTable>
          </Card.Content>
        </Card>

        <Card style={styles.card}>
          <Card.Content>
            <Title style={styles.sectionTitle}>End of Day Reconciliation</Title>
            <Paragraph>
              At the end of your shift, please ensure all inventory counts are accurate
              and report any discrepancies.
            </Paragraph>
          </Card.Content>
          <Card.Actions style={styles.cardActions}>
            <Button 
              mode="contained" 
              onPress={() => navigation.navigate('InventoryReconciliation')}
              style={styles.reconcileButton}
            >
              Start Reconciliation
            </Button>
          </Card.Actions>
        </Card>
      </ScrollView>

      <Portal>
        <Dialog visible={dialogVisible} onDismiss={() => setDialogVisible(false)}>
          <Dialog.Title>Adjust Inventory</Dialog.Title>
          <Dialog.Content>
            <Paragraph style={styles.dialogText}>
              {adjustmentItem ? adjustmentItem.name : ''}
            </Paragraph>
            <TextInput
              label="Full Jars Count"
              value={adjustmentValue}
              onChangeText={setAdjustmentValue}
              keyboardType="numeric"
              mode="outlined"
              style={styles.dialogInput}
            />
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={() => setDialogVisible(false)}>Cancel</Button>
            <Button onPress={saveAdjustment}>Save</Button>
          </Dialog.Actions>
        </Dialog>

        <Dialog visible={damageReportVisible} onDismiss={() => setDamageReportVisible(false)}>
          <Dialog.Title>Report Damaged Jars</Dialog.Title>
          <Dialog.Content>
            <Paragraph style={styles.dialogText}>
              {damageItem ? damageItem.name : ''}
            </Paragraph>
            <TextInput
              label="Number of Damaged Jars"
              value={damageCount}
              onChangeText={setDamageCount}
              keyboardType="numeric"
              mode="outlined"
              style={styles.dialogInput}
            />
            <TextInput
              label="Reason for Damage"
              value={damageReason}
              onChangeText={setDamageReason}
              mode="outlined"
              multiline
              numberOfLines={3}
              style={styles.dialogInput}
            />
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={() => setDamageReportVisible(false)}>Cancel</Button>
            <Button onPress={submitDamageReport}>Submit</Button>
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
  scrollView: {
    flex: 1,
    padding: 16,
  },
  screenTitle: {
    marginBottom: 16,
    fontWeight: 'bold',
  },
  summaryCard: {
    borderRadius: 8,
    marginBottom: 16,
    elevation: 4,
  },
  inventoryCard: {
    borderRadius: 8,
    marginBottom: 16,
    elevation: 2,
  },
  card: {
    borderRadius: 8,
    marginBottom: 24,
    elevation: 2,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  summaryContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginVertical: 8,
    backgroundColor: '#ecf0f1',
    borderRadius: 8,
    padding: 16,
  },
  summaryItem: {
    alignItems: 'center',
  },
  summaryLabel: {
    fontSize: 14,
    color: '#555',
    marginBottom: 4,
  },
  summaryValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2c3e50',
  },
  summaryDivider: {
    height: 40,
    width: 1,
    backgroundColor: '#bdc3c7',
  },
  chartContainer: {
    alignItems: 'center',
    marginVertical: 12,
  },
  actionCell: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  cardActions: {
    justifyContent: 'flex-end',
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
  reconcileButton: {
    backgroundColor: '#2c3e50',
  },
  dialogText: {
    marginBottom: 16,
  },
  dialogInput: {
    marginBottom: 12,
  },
});

export default InventoryManagementScreen;

  const saveAdjustment = () => {
    const value = parseInt(adjustmentValue);
    if (isNaN(value) || value < 0) {
      Alert.alert("Error", "Please enter a valid number");
      return;
    }

    // Update inventory (in a real app, this would send to the server)
    const updatedInventory = inventory.map(item => {
      if (item.id === adjustmentItem.id) {
        return { ...item, fullJars: value };
      }
      return item;
    });

    setInventory(updatedInventory);
    setDialogVisible(false);
    
    // Show confirmation to user
    Alert.alert(
      "Inventory Updated",
      `${adjustmentItem.name} adjusted to ${value} full jars`,
      [{ text: "OK" }]
    );
  };

  const handleReportDamage = (item) => {
    setDamageItem(item);
    setDamageCount('1');
    setDamageReason('');
    setDamageReportVisible(true);
  };

  const submitDamageReport = () => {
    const count = parseInt(damageCount);
    if (isNaN(count) || count <= 0 || count > damageItem.fullJars) {
      Alert.alert("Error", "Please enter a valid number");
      return;
    }

    if (damageReason.trim() === '') {
      Alert.alert("Error", "Please provide a reason for the damage");
      return;
    }

    // Update inventory (in a real app, this would send to the server)
    const updatedInventory = inventory.map(item => {
      if (item.id === damageItem.id) {
        return { ...item, fullJars: item.fullJars - count };
      }
      return item;
    });

    setInventory(updatedInventory);
    setDamageReportVisible(false);
    
    // Show confirmation to user
    Alert.alert(
      "Damage Reported",
      `${count} damaged ${damageItem.name}(s) reported`,
      [{ text: "OK" }]
    );
  };

  const getTotalJars = () => {
    const fullJars = inventory.reduce((sum, item) => sum + item.fullJars, 0);
    const emptyJars = inventory.reduce((sum, item) => sum + item.emptyJars, 0);
    return { fullJars, emptyJars };
  };