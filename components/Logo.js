import React from 'react';
import { Image, StyleSheet, View } from 'react-native';

export default function Logo() {
  return (
    <View style={styles.logoContainer}>
      <Image 
        style={styles.logo} 
        source={require('../assets/logo_cap.png')} 
      />
    </View>
  );
}

const styles = StyleSheet.create({
  logoContainer: {
    marginBottom: 20, 
  },
  logo: {
    width: 300,
    height: 150, 
    resizeMode: 'contain',
  },
});