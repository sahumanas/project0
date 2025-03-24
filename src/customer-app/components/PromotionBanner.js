import React from 'react';
import { View, Text, StyleSheet, ImageBackground, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const PromotionBanner = ({ promotion, onPress }) => {
  // We're using a placeholder gradient instead of images for the prototype
  // In a real app, the imageUrl would be used to load actual promotional images
  
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={onPress}
    >
      <LinearGradient
        colors={['#3498db', '#2980b9']}
        style={styles.background}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        <View style={styles.contentContainer}>
          <View>
            <Text style={styles.title}>{promotion.title}</Text>
            <Text style={styles.description}>{promotion.description}</Text>
          </View>
          
          <View style={styles.expiryContainer}>
            <Icon name="clock-outline" size={14} color="#FFFFFF" />
            <Text style={styles.expiryText}>Expires: {promotion.expiryDate}</Text>
          </View>
        </View>
      </LinearGradient>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 280,
    height: 120,
    marginRight: 16,
    marginTop: 8,
    marginBottom: 8,
    borderRadius: 12,
    overflow: 'hidden',
  },
  background: {
    width: '100%',
    height: '100%',
    justifyContent: 'space-between',
    padding: 16,
  },
  contentContainer: {
    flex: 1,
    justifyContent: 'space-between',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  description: {
    fontSize: 14,
    color: '#FFFFFF',
    opacity: 0.9,
  },
  expiryContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
  },
  expiryText: {
    marginLeft: 4,
    fontSize: 12,
    color: '#FFFFFF',
    opacity: 0.8,
  },
});

export default PromotionBanner;
