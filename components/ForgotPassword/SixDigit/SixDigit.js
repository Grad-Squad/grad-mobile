import React, { useContext, useEffect, useState } from 'react';
import { Alert, StyleSheet, Text } from 'react-native';
import * as Clipboard from 'expo-clipboard';

import { LocalizationContext } from '../../../localization/LocalizationProvider';
import { navigationPropType } from '../../../proptypes';
import { Styles, Typography } from '../../../styles';
import LoginBack from '../../_common/backgrounds/LoginBack';
import { Button } from '../../_common/Input';
import CodeTextInput from './CodeTextInput';

const CELL_COUNT = 6;

const SixDigit = ({ navigation }) => {
  const { t } = useContext(LocalizationContext);
  const [code, setCode] = useState('');

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
      <Text style={[Styles.forgotPasswordSubtitle, styles.junkFolder]}>
        {t('ForgotPassword/you might need to check the junk folder')}
      </Text>

      <CodeTextInput
        cellCount={CELL_COUNT}
        value={code}
        setValue={setCode}
        onFinish={attemptSubmit}
        style={styles.CodeTextInput}
      />

      <Button
        text={t('ForgotPassword/paste from clipboard')}
        onPress={onPasteClick}
        transparent
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
  CodeTextInput: {
    marginTop: 30,
    marginBottom: 20,
  },
  paste: {
    marginBottom: 12,
  },
});
