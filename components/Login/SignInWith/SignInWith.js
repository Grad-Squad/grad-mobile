import { Button } from 'common/Input';
import { LocalizationContext } from 'localization';
import React, { useContext } from 'react';
import { Alert, StyleSheet, View } from 'react-native';
import { Styles } from 'styles';
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
        smallButton
      />
      <Button
        text={t('Login/Sign In With Facebook')}
        onPress={() => Alert.alert('facebook')}
        leftIcon={<Facebook />}
        smallButton
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
    zIndex: -1,
    top: -10,

    elevation: 2, // ! temp
  },
  firstButtonGap: { marginBottom: 10 },
});
