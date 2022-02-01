import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, View } from 'react-native';
import { Button } from 'common/Input/Button';
import { Icon } from 'common/Icon';
import { IconNames } from 'common/Icon/Icon';
import FilterItem from './FilterItem';

const FilterPeople = ({ setPagesStack, pagesStack }) => {
  const x = 0;
  return <></>;
};

FilterPeople.propTypes = {
  pagesStack: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
  setPagesStack: PropTypes.func.isRequired,
};
FilterPeople.defaultProps = {};

export default FilterPeople;

const styles = StyleSheet.create({});
