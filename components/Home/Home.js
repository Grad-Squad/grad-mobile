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
      <Button title="Arabic" onPress={() => setLanguage('ar')} />
      <Button title="English" onPress={() => setLanguage('en')} />
      <Text>{t('hello')}</Text>
      <View style={{ alignItems: 'center' }}>
        <PostContainer />
        <Comment
          text="HELLO EVERYONE"
          profileName="user1"
          commentDate={new Date('2021-08-17T19:13:28.548Z')}
          voteCount={1}
        />
        <Comment
          text="Lorem ipsum dolor sit amet consectetur adipisicing elit. Cum similique, quia ipsam, earum quibusdam dolorem tenetur magni dolor esse modi accusantium. Quaerat eligendi aliquid cum quod delectus numquam accusantium fuga."
          profileName="user3"
          commentDate={new Date('2021-08-17T20:14:28.548Z')}
          voteCount={-123456}
        />
      </View>
    </Page>
  );
};

export default Home;
