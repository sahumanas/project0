import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { Card, Paragraph, Badge } from 'react-native-paper';
import NumericInput from 'react-native-numeric-input';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const ProductItem = ({ product, onQuantityChange, initialQuantity = 0 }) => {
  const [quantity, setQuantity] = useState(initialQuantity);

  useEffect(() => {
    setQuantity(initialQuantity);
  }, [initialQuantity]);

  const handleQuantityChange = (value) => {
    setQuantity(value);
    onQuantityChange(value);
  };

  // For the prototype, we'll use a placeholder icon instead of loading images
  const getIconForProduct = (productName) => {
    if (productName.includes('Standard')) return 'water';
    if (productName.includes('Mineral')) return 'water-plus';
    if (productName.includes('Bottle')) return 'bottle-wine';
    return 'bottle-tonic';
  };

  return (
    <Card style={styles.container}>
      <Card.Content style={styles.contentContainer}>
        <View style={styles.iconContainer}>
          <Icon 
            name={getIconForProduct(product.name)} 
            size={40} 
            color="#3498db" 
          />
          {!product.inStock && (
            <Badge style={styles.outOfStockBadge}>Out of Stock</Badge>
          )}
        </View>
        
        <View style={styles.infoContainer}>
          <Text style={styles.productName}>{product.name}</Text>
          <Paragraph style={styles.description}>{product.description}</Paragraph>
          <Text style={styles.price}>₹{product.price.toFixed(2)}</Text>
        </View>
        
        <View style={styles.quantityContainer}>
          <NumericInput
            value={quantity}
            onChange={handleQuantityChange}
            minValue={0}
            maxValue={10}
            totalWidth={90}
            totalHeight={40}
            iconSize={25}
            step={1}
            valueType="integer"
            rounded
            textColor="#2c3e50"
            iconStyle={{ color: 'white' }}
            rightButtonBackgroundColor="#3498db"
            leftButtonBackgroundColor="#3498db"
            disabled={!product.inStock}
          />
        </View>
      </Card.Content>
    </Card>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 12,
    borderRadius: 8,
    elevation: 1,
  },
  contentContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconContainer: {
    width: 60,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ecf0f1',
    borderRadius: 8,
    marginRight: 12,
  },
  infoContainer: {
    flex: 1,
    paddingRight: 8,
  },
  productName: {
    fontSize: 16,
    fontWeight: '500',
    color: '#2c3e50',
    marginBottom: 4,
  },
  description: {
    fontSize: 12,
    color: '#7f8c8d',
    marginBottom: 4,
  },
  price: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#3498db',
  },
  quantityContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  outOfStockBadge: {
    position: 'absolute',
    top: -8,
    right: -8,
    backgroundColor: '#e74c3c',
  },
});

export default ProductItem;
