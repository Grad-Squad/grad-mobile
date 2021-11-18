import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, View } from 'react-native';
import { routeParamPropType } from 'proptypes';
import ProfileContext from './ProfileContext';

const Bookmarks = () => {
  const { offset } = useContext(ProfileContext);
  return <View></View>;
};

Bookmarks.propTypes = {};
Bookmarks.defaultProps = {};

export default Bookmarks;

const styles = StyleSheet.create({});
