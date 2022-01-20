import React, { useEffect, useState } from 'react';
import { StyleSheet } from 'react-native';
import { useNetInfo } from '@react-native-community/netinfo';
import { Colors } from 'styles';
import { useLocalization } from 'localization';
import EduText from './EduText';

const NoInternetConnectionText = () => {
  const { t } = useLocalization();

  const [isLoading, setIsLoading] = useState(true);

  const { type, isInternetReachable } = useNetInfo();

  useEffect(() => {
    if (type !== 'unknown' && typeof isInternetReachable === 'boolean') {
      setIsLoading(false);
    }
  }, [type, isInternetReachable]);

  return (
    !(!isLoading && isInternetReachable) && (
      <EduText style={styles.text}>
        {t('General/No Internet Connection')}
      </EduText>
    )
  );
};

NoInternetConnectionText.propTypes = {};
NoInternetConnectionText.defaultProps = {};

export default React.memo(NoInternetConnectionText);

const styles = StyleSheet.create({
  text: {
    backgroundColor: Colors.error,
    textAlign: 'center',
    color: Colors.white,
    padding: 5,
  },
});
