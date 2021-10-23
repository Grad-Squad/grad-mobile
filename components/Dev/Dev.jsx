import { useAxios } from 'api/AxiosProvider';
import { Alert, Button, LogBox } from 'react-native';
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
  const postData = {
    id: 4,
    title: 'KMS',
    priceInCents: 10,
    subject: 'advanced nothing',
    rating: { id: 0, upvotes: 100, downvotes: 50, currentUserStatus: 'sad' },
    createdAt: new Date(),
    author: {
      id: 0,
      name: 'sad ek',
      profilePicture: 'https://pbs.twimg.com/media/EVgKUNnWoAIX9MF.jpg',
    },
  };

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
        title="Go to Post"
        onPress={() => navigation.navigate(ScreenNames.POST, postData.id)}
      />
      <Button
        title="Go to mcq"
        onPress={() =>
          navigation.navigate(ScreenNames.SOLVE_MCQ, { materialID: '1' })
        }
      />
      <Button title="Arabic" onPress={() => setLanguage('ar')} />
      <Button title="English" onPress={() => setLanguage('en')} />
      <EduText>{t('hello')}</EduText>
      <Button
        title="Show Error"
        onPress={() => showErrorSnackbar('the potatoes nooo')}
      />
    </Page>
  );
};
Dev.propTypes = {
  navigation: navigationPropType.isRequired,
};
export default Dev;
