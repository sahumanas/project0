import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { Card, Title, Chip } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const TimeslotSelector = ({ timeslots, selectedTimeslot, onTimeslotSelect }) => {
  const [selectedDate, setSelectedDate] = useState(null);

  const handleDateSelect = (date) => {
    setSelectedDate(date);
  };

  const handleSlotSelect = (date, slot) => {
    onTimeslotSelect(date, slot);
  };

  return (
    <View style={styles.container}>
      {/* Date selection */}
      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false}
        style={styles.dateContainer}
      >
        {timeslots.map((item) => (
          <TouchableOpacity
            key={item.id}
            style={[
              styles.dateCard,
              selectedDate === item.date && styles.selectedDateCard
            ]}
            onPress={() => handleDateSelect(item.date)}
          >
            <Text style={[
              styles.dateText,
              selectedDate === item.date && styles.selectedDateText
            ]}>
              {item.date}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Time slots */}
      <View style={styles.slotsContainer}>
        {selectedDate ? (
          <View>
            <Text style={styles.slotsTitle}>Available Time Slots</Text>
            
            <View style={styles.slotChipsContainer}>
              {timeslots
                .find(item => item.date === selectedDate)
                ?.slots.map((slot, index) => (
                  <Chip
                    key={index}
                    mode="outlined"
                    style={[
                      styles.slotChip,
                      selectedTimeslot && 
                      selectedTimeslot.date === selectedDate && 
                      selectedTimeslot.slot === slot && 
                      styles.selectedSlotChip
                    ]}
                    textStyle={[
                      styles.slotChipText,
                      selectedTimeslot && 
                      selectedTimeslot.date === selectedDate && 
                      selectedTimeslot.slot === slot && 
                      styles.selectedSlotChipText
                    ]}
                    onPress={() => handleSlotSelect(selectedDate, slot)}
                    icon={() => (
                      <Icon 
                        name="clock-outline" 
                        size={16} 
                        color={
                          selectedTimeslot &&
                          selectedTimeslot.date === selectedDate &&
                          selectedTimeslot.slot === slot
                            ? '#FFFFFF'
                            : '#3498db'
                        } 
                      />
                    )}
                  >
                    {slot}
                  </Chip>
                ))}
            </View>
          </View>
        ) : (
          <Text style={styles.selectDatePrompt}>Please select a delivery date</Text>
        )}
      </View>

      {/* Selected slot summary */}
      {selectedTimeslot && (
        <View style={styles.summaryContainer}>
          <Icon name="check-circle" size={16} color="#27ae60" />
          <Text style={styles.summaryText}>
            Delivery on {selectedTimeslot.date} between {selectedTimeslot.slot}
          </Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 8,
  },
  dateContainer: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  dateCard: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
    marginRight: 12,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#ecf0f1',
  },
  selectedDateCard: {
    backgroundColor: '#3498db',
    borderColor: '#3498db',
  },
  dateText: {
    fontSize: 14,
    color: '#2c3e50',
  },
  selectedDateText: {
    color: '#FFFFFF',
    fontWeight: '500',
  },
  slotsContainer: {
    marginBottom: 16,
  },
  slotsTitle: {
    fontSize: 14,
    fontWeight: '500',
    color: '#2c3e50',
    marginBottom: 8,
  },
  slotChipsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  slotChip: {
    margin: 4,
    backgroundColor: '#FFFFFF',
    borderColor: '#3498db',
  },
  selectedSlotChip: {
    backgroundColor: '#3498db',
    borderColor: '#3498db',
  },
  slotChipText: {
    color: '#2c3e50',
  },
  selectedSlotChipText: {
    color: '#FFFFFF',
  },
  selectDatePrompt: {
    color: '#7f8c8d',
    fontStyle: 'italic',
    textAlign: 'center',
    padding: 16,
  },
  summaryContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#e8f8f0',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 4,
  },
  summaryText: {
    marginLeft: 8,
    color: '#27ae60',
    fontSize: 14,
  },
});

export default TimeslotSelector;
