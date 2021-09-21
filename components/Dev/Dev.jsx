import EduText from 'common/EduText';
import Page from 'common/Page/Page';
import { LocalizationContext } from 'localization';
import React, { useContext } from 'react';
import { Button } from 'react-native';

const Dev = ({ navigation }) => {
  const { t, setLanguage } = useContext(LocalizationContext);

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
  return (
    <Page>
      <EduText>{t('hello')}</EduText>
      <Button
        title="Go to Login"
        onPress={() => navigation.navigate('login')}
      />
      <Button title="Go to Home" onPress={() => navigation.navigate('home')} />
      <Button
        title="Go to Post"
        onPress={() => navigation.navigate('post', postData)}
      />
      <Button
        title="Go to mcq"
        onPress={() => navigation.navigate('solveMcq')}
      />
      <Button title="Arabic" onPress={() => setLanguage('ar')} />
      <Button title="English" onPress={() => setLanguage('en')} />
      <EduText>{t('hello')}</EduText>
    </Page>
  );
};

export default Dev;
