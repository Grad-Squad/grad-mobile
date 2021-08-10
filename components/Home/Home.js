import React, { useContext } from 'react';
import { Button, StatusBar, Text } from 'react-native';
import { LocalizationContext } from '../../localization/LocalizationProvider';
import Page from '../_common/Page/Page';

const Home = ({ navigation }) => {
  const { t } = useContext(LocalizationContext);
  return (
    <Page>
      <Text>{t('hello')}</Text>
      <Button
        title="Go to Login"
        onPress={() => navigation.navigate('login')}
      />
      <Text>{t('hello')}</Text>
    </Page>
  );
};

export default Home;
