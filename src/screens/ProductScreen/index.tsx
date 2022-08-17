/* eslint-disable prettier/prettier */
import React, {useState} from 'react';
import {Text, ScrollView} from 'react-native';
import {Picker} from '@react-native-picker/picker';
import QuantitySelector from '../../components/QuantitySelector';
import styles from './styles';

import product from '../../data/product';
import Button from '../../components/Button';
import ImageCarousel from '../../components/ImageCarousel';
import { useRoute } from '@react-navigation/native';

const ProductScreen = () => {
  const [selectedOption, setSelectedOption] = useState(product.options ? product.options[0] : null);
  const [quantity, SetQuantity] = useState(1);

  const route = useRoute();
  return (
    <ScrollView style={styles.root}>
      <Text style={styles.title}>{product.title}</Text>

      {/* Image carousel */}
      <ImageCarousel images={product.images} />

      {/* Option Selector */}
      <Picker
        selectedValue={selectedOption}
        onValueChange={(itemValue) => setSelectedOption(itemValue)}>
        {product.options.map(option => (
          <Picker.Item label={option} value={option} />
        ))}
      </Picker>

      {/* Price */}

      <Text style={styles.price}>
        ${product.price}
        {product.oldPrice && (
          <Text style={styles.oldPrice}> ${product.oldPrice}</Text>
        )}
      </Text>

      {/* Description */}

      <Text style={styles.description}>{product.description}</Text>

      {/* Quantity selector */}
      <QuantitySelector quantity={quantity} setQuantity={SetQuantity} />

      {/* Button */}
      <Button text={'Add To Cart'} onPress={() => console.warn("Add to Cart")}
      // eslint-disable-next-line react-native/no-inline-styles
      containerStyles={{backgroundColor: '#e3c905'}}
      />
      <Button text={'Buy Now'} onPress={() => console.warn("Buy now")} containerStyles={undefined} />
    </ScrollView>
  );
};



export default ProductScreen;
