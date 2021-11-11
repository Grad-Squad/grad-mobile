import { useAxios } from 'api/AxiosProvider';
import { Alert, Button, I18nManager, LogBox, View } from 'react-native';
import React, { useEffect } from 'react';
import { navigationPropType } from 'proptypes';
import { useLocalization } from 'localization';
import EduText from 'common/EduText';
import Page from 'common/Page/Page';
import { Constants } from 'styles';
import { useErrorSnackbar } from 'common/ErrorSnackbar/ErrorSnackbarProvider';
import ScreenNames from 'navigation/ScreenNames';

LogBox.ignoreLogs(['Setting a timer']);

const Dev = ({ navigation }) => {
  const { t, setLanguage } = useLocalization();

  //! temp: should be moved somewhere else where it will always get called
  const { setUnauthorizedRedirect } = useAxios();

  useEffect(() => {
    setUnauthorizedRedirect(() => () => {
      navigation.navigate(ScreenNames.LOGIN);
      Alert.alert('Sorry, You have to login again');
    });
  }, []);

  const { showErrorSnackbar } = useErrorSnackbar();

  return (
    <Page style={{ paddingTop: Constants.fromScreenStartPadding }}>
      <EduText>{t('hello')}</EduText>
      <Button
        title="Go to Login"
        onPress={() => navigation.navigate(ScreenNames.LOGIN)}
      />
      <Button
        title="Go to Home"
        onPress={() => navigation.navigate(ScreenNames.HOME)}
      />
      <Button
        title="Go to Create Post"
        onPress={() => navigation.navigate(ScreenNames.CREATE_POST)}
      />
      <Button
        title="Go to Expanded Post"
        onPress={() => navigation.navigate(ScreenNames.POST, { postID: 4 })}
      />
      <Button
        title="Go to mcq"
        onPress={() =>
          navigation.navigate(ScreenNames.SOLVE_MCQ, { materialID: '1' })
        }
      />
      <Button
        title="Go to flashcard"
        onPress={() =>
          navigation.navigate(ScreenNames.SOLVE_FLASHCARD, { materialID: '1' })
        }
      />
      <Button title="Arabic" onPress={() => setLanguage('ar')} />
      <Button title="English" onPress={() => setLanguage('en')} />
      <EduText>{t('hello')}</EduText>
      <Button
        title="Show Error"
        onPress={() => showErrorSnackbar('the potatoes nooo')}
      />
      <EduText>{`RTL Check: (I18nManager.isRTL: ${I18nManager.isRTL})`}</EduText>
      <View style={{ width: 100, height: 100, backgroundColor: 'yellow' }} />
    </Page>
  );
};
Dev.propTypes = {
  navigation: navigationPropType.isRequired,
};
export default Dev;
