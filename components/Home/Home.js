import Page from 'common/Page/Page';
import { LocalizationContext } from 'localization';
import React, { useContext } from 'react';
import { Button, Text } from 'react-native';

const Home = ({ navigation }) => {
  const { t, setLanguage } = useContext(LocalizationContext);
  return (
    <Page>
      <Text>{t('hello')}</Text>
      <Button
        title="Go to Login"
        onPress={() => navigation.navigate('login')}
      />
      <Button title="Go to Post" onPress={() => navigation.navigate('post')} />
      <Button title="Arabic" onPress={() => setLanguage('ar')} />
      <Button title="English" onPress={() => setLanguage('en')} />
      <Text>{t('hello')}</Text>
    </Page>
  );
};

export default Home;
