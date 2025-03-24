import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { RadioButton, Button, Divider } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const AddressSelector = ({ addresses, selectedAddress, onAddressChange, onAddNewAddress }) => {
  const renderAddress = (address) => {
    const isSelected = selectedAddress && selectedAddress.id === address.id;
    const getIconForLabel = (label) => {
      switch (label.toLowerCase()) {
        case 'home':
          return 'home';
        case 'office':
        case 'work':
          return 'office-building';
        default:
          return 'map-marker';
      }
    };

    return (
      <TouchableOpacity
        key={address.id}
        style={[
          styles.addressCard,
          isSelected && styles.selectedAddressCard
        ]}
        onPress={() => onAddressChange(address)}
      >
        <View style={styles.radioContainer}>
          <RadioButton
            value={address.id}
            status={isSelected ? 'checked' : 'unchecked'}
            onPress={() => onAddressChange(address)}
            color="#3498db"
          />
        </View>
        
        <View style={styles.addressContainer}>
          <View style={styles.labelContainer}>
            <Icon name={getIconForLabel(address.label)} size={16} color="#3498db" />
            <Text style={styles.labelText}>{address.label}</Text>
            {address.isDefault && (
              <View style={styles.defaultBadge}>
                <Text style={styles.defaultText}>Default</Text>
              </View>
            )}
          </View>
          
          <Text style={styles.addressText}>{address.address}</Text>
          <Text style={styles.cityStateText}>
            {address.city}, {address.state} {address.postalCode}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <ScrollView 
        horizontal={false}
        showsVerticalScrollIndicator={false}
        style={styles.addressList}
      >
        {addresses.map(renderAddress)}
      </ScrollView>
      
      <Button
        mode="outlined"
        onPress={onAddNewAddress}
        style={styles.addButton}
        icon="plus"
      >
        Add New Address
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 8,
  },
  addressList: {
    maxHeight: 220,
  },
  addressCard: {
    flexDirection: 'row',
    marginBottom: 12,
    padding: 12,
    borderRadius: 8,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#ecf0f1',
  },
  selectedAddressCard: {
    borderColor: '#3498db',
    backgroundColor: '#f2f6ff',
  },
  radioContainer: {
    justifyContent: 'center',
    marginRight: 8,
  },
  addressContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  labelContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  labelText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#2c3e50',
    marginLeft: 6,
  },
  defaultBadge: {
    backgroundColor: '#e8f8f0',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
    marginLeft: 8,
  },
  defaultText: {
    fontSize: 10,
    color: '#27ae60',
    fontWeight: '500',
  },
  addressText: {
    fontSize: 14,
    color: '#2c3e50',