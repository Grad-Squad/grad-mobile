import React, { useContext } from 'react';
import { StatusBar, StyleSheet, Text, View } from 'react-native';
import { LocalizationContext } from '../../localization/LocalizationProvider';

const Home = () => {
  const { t } = useContext(LocalizationContext);
  return (
    <View style={styles.container}>
      <Text>{t('hello')}</Text>
      <StatusBar style="auto" />
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
