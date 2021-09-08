import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, Text } from 'react-native';
import Page from 'common/Page/Page';
import Header from './Header';

const Home = () => {
  return (
    <Page>
      <Header />
      <Text style={{ fontSize: 100 }}>Home</Text>
    </Page>
  );
};

Home.propTypes = {};
Home.defaultProps = {};

export default Home;

const styles = StyleSheet.create({});
