import React, { useContext } from 'react';
import { Button, Text } from 'react-native';
import { LocalizationContext } from '../../localization/LocalizationProvider';
import Page from '../_common/Page/Page';

const Home = ({ navigation }) => {
  const { t, setLanguage } = useContext(LocalizationContext);
  return (
    <Page>
      <Text>{t('hello')}</Text>
      <Button
        title="Go to Login"
        onPress={() => navigation.navigate('login')}
      />
      <Button title="Arabic" onPress={() => setLanguage('ar')} />
      <Button title="English" onPress={() => setLanguage('en')} />
      <Text>{t('hello')}</Text>
    </Page>
  );
};

export default Home;
