import React, { useContext } from 'react';
import { Alert, StyleSheet, View } from 'react-native';
import { LocalizationContext } from '../../../localization/LocalizationProvider';
import { Styles } from '../../../styles';
import { Button } from '../../_common/Input';
import Facebook from './Facebook/Facebook';
import Google from './Google/Google';

const SignInWith = () => {
  const { t } = useContext(LocalizationContext);
  return (
    <View style={[Styles.cardFooter, styles.background]}>
      <Button
        text={t('Login/Sign In With Google')}
        onPress={() => Alert.alert('google')}
        leftIcon={<Google />}
        style={styles.firstButtonGap}
      />
      <Button
        text={t('Login/Sign In With Facebook')}
        onPress={() => Alert.alert('facebook')}
        leftIcon={<Facebook />}
      />
    </View>
  );
};

export default SignInWith;

const styles = StyleSheet.create({
  background: {
    paddingTop: 20,
    paddingBottom: 18,
    paddingHorizontal: 17,
    alignSelf: 'center',
    top: -10,

    elevation: 2, // ! temp
  },
  firstButtonGap: { marginBottom: 10 },
});
