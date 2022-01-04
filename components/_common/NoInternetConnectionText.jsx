import React from 'react';
import { StyleSheet } from 'react-native';
import { useNetInfo } from '@react-native-community/netinfo';
import { Colors } from 'styles';
import { useLocalization } from 'localization';
import EduText from './EduText';

const NoInternetConnectionText = () => {
  const netInfo = useNetInfo();
  const { t } = useLocalization();
  return netInfo.isConnected ? null : (
    <EduText style={styles.text}>{t('General/No Internet Connection')}</EduText>
  );
};

NoInternetConnectionText.propTypes = {};
NoInternetConnectionText.defaultProps = {};

export default NoInternetConnectionText;

const styles = StyleSheet.create({
  text: {
    backgroundColor: Colors.error,
    textAlign: 'center',
    color: Colors.white,
    padding: 5,
  },
});
