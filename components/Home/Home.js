import React from 'react';
import { StatusBar, StyleSheet, Text, View } from 'react-native';

const Home = () => (
  <View style={styles.container}>
    <Text>Open up App.js to start working on your app! Nice</Text>
    <StatusBar style="auto" />
  </View>
);

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
