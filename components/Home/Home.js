import React, { useContext } from 'react';
import { Button, Text, View } from 'react-native';
import { LocalizationContext } from '../../localization/LocalizationProvider';
import Page from '../_common/Page/Page';
import Post from '../Post/Post';
import Comment from '../Comment/Comment';
import PostContainer from '../Post/PostContainer';

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
      <View style={{ alignItems: 'center', width: '80%', alignSelf: 'center' }}>
        <PostContainer />
      </View>
    </Page>
  );
};

export default Home;
