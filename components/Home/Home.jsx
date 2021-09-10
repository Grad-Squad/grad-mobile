import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, Text } from 'react-native';
import Page from 'common/Page/Page';
import EduText from 'common/EduText';
import Header from './Header';

const Home = () => {
  return (
    <Page>
      <Header />
      <EduText style={{ fontSize: 100 }}>Home</EduText>
    </Page>
  );
};

Home.propTypes = {};
Home.defaultProps = {};

export default Home;

const styles = StyleSheet.create({});
