import React, { useContext, useEffect, useState } from 'react';
import { Alert, StyleSheet, Text } from 'react-native';
import * as Clipboard from 'expo-clipboard';

import { LocalizationContext } from 'localization';
import { navigationPropType } from 'proptypes';
import { Colors, Styles, Typography } from 'styles';
import LoginBack from 'common/backgrounds/LoginBack';
import { TransparentButton, WhiteButton } from 'common/Input/Button';
import CodeTextInput from './CodeTextInput';

const CELL_COUNT = 6;

const SixDigit = ({ navigation }) => {
  const { t } = useContext(LocalizationContext);
  const [code, setCode] = useState('');
  const [error, setError] = useState(false);

  const attemptSubmit = () => {
    if (code && code.length === CELL_COUNT) {
      navigation.navigate('forgotPassword/newPassword');
    }
  };

  useEffect(() => {
    attemptSubmit();
  }, [code]);

  const onPasteClick = () => {
    Clipboard.getStringAsync()
      .then((value) => {
        setCode(value.replace(/[^0-9]/g, ''));
      })
      .catch(() => Alert.alert("Sorry, Couldn't paste from clipboard"));
  };

  return (
    <LoginBack>
      <Text style={[Styles.forgotPasswordHeader, styles.enterCode]}>
        {t('ForgotPassword/Please enter the 6 digit code sent to your email')}
      </Text>
      {error ? (
        <Text style={styles.wrongCode}>{t('ForgotPassword/wrong code')}</Text>
      ) : (
        <Text style={[Styles.forgotPasswordSubtitle, styles.junkFolder]}>
          {t('ForgotPassword/you might need to check the junk folder')}
        </Text>
      )}

      <CodeTextInput
        cellCount={CELL_COUNT}
        value={code}
        setValue={setCode}
        onFinish={attemptSubmit}
        style={styles.CodeTextInput}
        error={error}
      />

      <TransparentButton
        text={t('ForgotPassword/paste from clipboard')}
        onPress={onPasteClick}
        textStyle={styles.pasteText}
        style={styles.paste}
      />
      <WhiteButton text={t('ForgotPassword/DONE')} onPress={attemptSubmit} />
    </LoginBack>
  );
};

export default SixDigit;

SixDigit.propTypes = {
  navigation: navigationPropType.isRequired,
};

const styles = StyleSheet.create({
  enterCode: {
    ...Typography.forgotPassword.header,
    marginBottom: 12,
  },
  junkFolder: {
    ...Typography.forgotPassword.subtitle,
  },
  wrongCode: {
    ...Typography.forgotPassword.subtitle,
    color: Colors.error,
  },
  CodeTextInput: {
    marginTop: 30,
    marginBottom: 20,
  },
  paste: {
    marginBottom: 12,
  },
  pasteText: {
    textDecorationLine: 'underline',
    fontFamily: 'Lato_300Light',
    fontSize: 17,
    color: Colors.black,
  },
});
