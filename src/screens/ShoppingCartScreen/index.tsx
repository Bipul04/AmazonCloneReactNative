/* eslint-disable prettier/prettier */
import { useNavigation } from '@react-navigation/native';
import React from 'react';
import {View, StyleSheet, FlatList, Text} from 'react-native';
import Button from '../../components/Button';
import CartProductItem from '../../components/CartProductItem';

import products from '../../data/cart';

const ShoppingCartScreen = () => {
  const navigation = useNavigation();

  const totalPrice = products.reduce((summedPrice, product) =>(
    summedPrice + product.item.price * product.quantity
  ), 0);

  const onCheckout = () => {
    navigation.navigate('Address');
  };

  return (
    <View style={styles.page}>
      {/* Render Product Compomnent */}
      <FlatList
        data={products}
        renderItem={({item}) => <CartProductItem cartItem={item}/>}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={()=>(
          <View>
          <Text style={{fontSize: 18}}>Subtotal ({products.length} items):{' '}
            <Text style={{color: '#e47911', fontWeight: 'bold'}}>{totalPrice.toFixed(2)}</Text>
          </Text>
          <Button text='Proceed to checkout'
          onPress={onCheckout}
          containerStyles={{backgroundColor: '#f7e300', borderColor: '#c7b702'}}/>
        </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
    page: {
        padding: 10,
    },
});
export default ShoppingCartScreen;
