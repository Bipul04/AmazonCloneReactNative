/* eslint-disable prettier/prettier */
import React, { useState } from 'react';
import { View, Text, TextInput, Alert, ScrollView,  KeyboardAvoidingView, Platform } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import styles from './styles';
import countryList from 'country-list';
import Button from '../../components/Button';

const countries = countryList.getData();

const AddressScreen = () => {
    const [country, setCountry] = useState(countries[0].code);
    const [fullname, setFullname] = useState('');
    const [phone, setPhone] = useState('');

    const [address, setAddress] = useState('');
    const [addressError, setAddressError] = useState('');

    const [city, setCity] = useState('');

    const onCheckout = () => {
        if (!!addressError) {
            Alert.alert('Fix all errors before submitting');
            return;
        }
        if (!fullname) {
            Alert.alert('Please fill in the full name field');
            return;
        }
        if (!phone) {
            Alert.alert('Please fill in the phone number field');
            return;
        }
        if (!address) {
            Alert.alert('Please fill in the address field');
            return;
        }

        console.warn('Success. Checkout');
    };

    const validateAddress = () => {
        if (address.length < 3){
            setAddressError('Address is too short');
        }
    };

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            keyboardVerticalOffset={Platform.OS === 'ios' ? 10 : 0}
        >
        <ScrollView style={styles.root}>
            <View style={styles.row}>
                <Picker
                  selectedValue={country}
                  onValueChange={setCountry}
                >
                    {countries.map(country => (
                        <Picker.Item value={country.code} label={country.name} />
                    ))}
                </Picker>
            </View>

            {/* Fullname */}
            <View style={styles.row}>
                <Text style={styles.label}>Full name (First and Last name)</Text>
                <TextInput style={styles.input}
                 placeholder='Full name'
                 value={fullname}
                 onChangeText={setFullname}
                />
            </View>

             {/* Phone number */}
             <View style={styles.row}>
                <Text style={styles.label}>Phone number</Text>
                <TextInput style={styles.input}
                 placeholder='Phone number'
                 value={phone}
                 onChangeText={setPhone}
                 keyboardType={'phone-pad'}
                />
            </View>

             {/* Address */}
             <View style={styles.row}>
                <Text style={styles.label}>Address</Text>
                <TextInput style={styles.input}
                 placeholder='Address'
                 value={address}
                 onEndEditing={validateAddress}
                 onChangeText={text => {
                     setAddress(text);
                     setAddressError('');
                }}
                />
                {!!addressError && (<Text style={styles.errorLabel}>{addressError}</Text>)}
            </View>

             {/* City */}
             <View style={styles.row}>
                <Text style={styles.label}>City</Text>
                <TextInput style={styles.input}
                 placeholder='City'
                 value={city}
                 onChangeText={setCity}
                />
            </View>
            <Button text='Checkout' onPress={onCheckout} containerStyles={undefined} />
        </ScrollView>
        </KeyboardAvoidingView>
     );
};

export default AddressScreen;
