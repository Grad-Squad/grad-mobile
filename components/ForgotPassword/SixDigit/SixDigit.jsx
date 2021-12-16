import React, { useEffect, useState } from 'react';
import { Alert, StyleSheet } from 'react-native';
import * as Clipboard from 'expo-clipboard';

import { useLocalization } from 'localization';
import { navigationPropType } from 'proptypes';
import { Colors, Styles, Typography } from 'styles';
import LoginBack from 'common/backgrounds/LoginBack';
import { TransparentButton, WhiteButton } from 'common/Input/Button';
import EduText from 'common/EduText';
import ScreenNames from 'navigation/ScreenNames';
import { useAPIVerifyCode } from 'api/endpoints/resetPassword';
import { useDispatch, useSelector } from 'react-redux';
import { setToken } from 'globalStore/forgotPasswordSlice';
import CodeTextInput from './CodeTextInput';

const CELL_COUNT = 6;
const TRAILS_LIMIT = 3;

const SixDigit = ({ navigation }) => {
  const { t } = useLocalization();
  const [code, setCode] = useState('');
  const [numberOfTrails, setNumberOfTrails] = useState(0);

  const email = useSelector((state) => state.forgotPassword.email);
  const dispatch = useDispatch();

  const verifyCodeMutation = useAPIVerifyCode({
    onError: () => {
      if (numberOfTrails === TRAILS_LIMIT) {
        navigation.navigate(ScreenNames.ForgotPassword.SIX_DIGIT_FAILED);
      }
    },
    onSuccess: (data) => {
      dispatch(setToken(data.token));
      navigation.navigate(ScreenNames.ForgotPassword.NEW_PASSWORD);
    },
  });

  const attemptSubmit = () => {
    if (code && code.length === CELL_COUNT) {
      setNumberOfTrails((oldValue) => oldValue + 1);
      verifyCodeMutation.mutate({ email, code });
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
      {verifyCodeMutation.isError ? (
        <EduText style={styles.wrongCode}>
          {t('ForgotPassword/wrong code (attempt)', {
            current: numberOfTrails,
            limit: TRAILS_LIMIT,
          })}
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
        error={verifyCodeMutation.isError}
      />

      <TransparentButton
        text={t('ForgotPassword/paste from clipboard')}
        onPress={onPasteClick}
        textStyle={styles.pasteText}
        style={styles.paste}
        disabled={verifyCodeMutation.isLoading}
      />
      <WhiteButton
        text={t('ForgotPassword/DONE')}
        onPress={attemptSubmit}
        disabled={verifyCodeMutation.isLoading}
        loading={verifyCodeMutation.isLoading}
      />
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
    ...Styles.errorText,
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
