import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, Text } from 'react-native';
import Page from 'common/Page/Page';
import EduText from 'common/EduText';
import { Button } from 'common/Input/Button';
import Header from './Header';
import { useAPIAddComment } from 'api/endpoints/posts';

const Home = () => {
  const mutation = useAPIAddComment();
  return (
    <Page>
      <Header />
      <Button
        text="click me"
        onPress={() => {
          mutation.mutate({ postId: 1, content: 'hi, ana comment' });
        }}
      />

      <EduText style={{ fontSize: 100 }}>Home</EduText>
    </Page>
  );
};

Home.propTypes = {};
Home.defaultProps = {};

export default Home;

const styles = StyleSheet.create({});
