import { useAxios } from 'api/AxiosProvider';
import { Alert, Button } from 'react-native';
import React, { useContext, useEffect } from 'react';
import { navigationPropType } from 'proptypes';
import { LocalizationContext } from 'localization';
import EduText from 'common/EduText';
import Page from 'common/Page/Page';
import { Constants } from 'styles';
import { useErrorSnackbar } from 'common/ErrorSnackbar/ErrorSnackbarProvider';

const Dev = ({ navigation }) => {
  const { t, setLanguage } = useContext(LocalizationContext);

  //! temp: should be moved somewhere else where it will always get called
  const { setUnauthorizedRedirect } = useAxios();

  useEffect(() => {
    setUnauthorizedRedirect(() => () => {
      navigation.navigate('login');
      Alert.alert('Sorry, You have to login again');
    });
  }, []);
  const postData = {
    id: 0,
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
        onPress={() => navigation.navigate('login')}
      />
      <Button title="Go to Home" onPress={() => navigation.navigate('home')} />
      <Button title="Go to Post" onPress={() => navigation.navigate('post')} />
      <Button
        title="Go to mcq"
        onPress={() => navigation.navigate('solveMcq')}
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
