// SignInScreen.js
import React, { useState } from 'react';
import { Text, StyleSheet, TextInput, SafeAreaView, TouchableOpacity, View, Alert } from 'react-native';
import { usePhone } from '../bai8/PhoneContext';

const SignInScreen = ({ navigation }) => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [error, setError] = useState('');
  const { setPhoneNumber: savePhoneNumber } = usePhone();

  const formatPhoneNumber = (number) => {
    const cleaned = ('' + number).replace(/\D/g, '');
    const matchedArray = cleaned.match(/(\d{1,3})(\d{1,3})(\d{1,4})?/);

    if (matchedArray) {
      return matchedArray.slice(1, 4).filter(Boolean).join(' ');
    }
    return number;
  };

  const handlePhoneChange = (text) => {
    setError('');
    const formattedNumber = formatPhoneNumber(text);
    setPhoneNumber(formattedNumber);
  };

  const validatePhoneNumber = (number) => {
    const regex = /^(\d{3} )?(\d{3} )?(\d{4})$/;
    return regex.test(number);
  };

  const handleContinue = () => {
    if (validatePhoneNumber(phoneNumber)) {
      savePhoneNumber(phoneNumber);
      navigation.navigate('Home');
    } else {
      setError('Số điện thoại không hợp lệ. Vui lòng kiểm tra lại.');
      Alert.alert(
        "Lỗi",
        "Số điện thoại không hợp lệ. Vui lòng kiểm tra lại.",
        [{ text: "OK", onPress: () => console.log("Alert closed") }]
      );
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.titleText}>Đăng nhập</Text>
      </View>

      <Text style={styles.labelText}>Nhập số điện thoại</Text>
      <Text style={styles.bodyText}>
        Dùng số điện thoại để đăng nhập hoặc đăng ký tài khoản tại OneHousing Pro
      </Text>

      <TextInput
        style={[styles.input, error ? styles.inputError : null]}
        onChangeText={handlePhoneChange}
        value={phoneNumber}
        placeholder="Nhập số điện thoại của bạn"
        keyboardType="numeric"
        placeholderTextColor="#C4C4C4"
      />

      {error !== '' && <Text style={styles.errorText}>{error}</Text>}

      <TouchableOpacity style={styles.button} onPress={handleContinue}>
        <Text style={styles.buttonText}>Tiếp tục</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  titleContainer: {
    borderBottomWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 20,
    marginTop: 25,
  },
  titleText: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  labelText: {
    fontSize: 18,
    fontWeight: '500',
    marginBottom: 10,
  },
  bodyText: {
    fontSize: 14,
    color: '#6c6c6c',
    marginBottom: 30,
  },
  input: {
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  inputError: {
    borderColor: 'red',
  },
  button: {
    backgroundColor: 'blue',
    padding: 15,
    alignItems: 'center',
    borderRadius: 5,
  },
  buttonText: {
    fontSize: 16,
    color: '#fff',
  },
  errorText: {
    color: 'red',
    marginBottom: 20,
  },
});

export default SignInScreen;
