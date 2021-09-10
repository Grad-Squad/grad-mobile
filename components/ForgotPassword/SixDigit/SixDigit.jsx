import React, { useContext, useEffect, useState } from 'react';
import { Alert, StyleSheet, Text } from 'react-native';
import * as Clipboard from 'expo-clipboard';

import { LocalizationContext } from 'localization';
import { navigationPropType } from 'proptypes';
import { Colors, Styles, Typography } from 'styles';
import LoginBack from 'common/backgrounds/LoginBack';
import { Button } from 'common/Input';
import CodeTextInput from './CodeTextInput';
import EduText from 'common/EduText';

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
      <EduText style={[Styles.forgotPasswordHeader, styles.enterCode]}>
        {t('ForgotPassword/Please enter the 6 digit code sent to your email')}
      </EduText>
      {error ? (
        <EduText style={styles.wrongCode}>
          {t('ForgotPassword/wrong code')}
        </EduText>
      ) : (
        <EduText style={[Styles.forgotPasswordSubtitle, styles.junkFolder]}>
          {t('ForgotPassword/you might need to check the junk folder')}
        </EduText>
      )}

      <CodeTextInput
        cellCount={CELL_COUNT}
        value={code}
        setValue={setCode}
        onFinish={attemptSubmit}
        style={styles.CodeTextInput}
        error={error}
      />

      <Button
        text={t('ForgotPassword/paste from clipboard')}
        onPress={onPasteClick}
        transparent
        underline
        lightText
        style={styles.paste}
      />
      <Button text={t('ForgotPassword/DONE')} onPress={attemptSubmit} />
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
});
