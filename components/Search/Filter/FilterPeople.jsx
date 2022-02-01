import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, View } from 'react-native';
import { Button } from 'common/Input/Button';
import { Icon } from 'common/Icon';
import { IconNames } from 'common/Icon/Icon';
import FilterItem from './FilterItem';

const pages = [
  {
    iconName: IconNames.followStatus,
    text: 'Follow Status',
    children: ['Followed', 'Not Followed'],
  },
  {
    iconName: IconNames.role,
    text: 'Role',
    children: ['Teacher', 'Student'],
  },
  {
    iconName: IconNames.sort,
    text: 'Sort',
    children: ['Latest', 'Most Relavent', 'Most Popular'],
  },
];

const FilterPeople = ({ setPagesStack, pagesStack }) => {
  const x = 0;
  return (
    <>
      {pagesStack.length === 1 &&
        pages.map((page, index) => (
          <FilterItem
            page={page}
            key={page.text}
            onPress={() => setPagesStack([...pagesStack, page.text])}
          />
        ))}
      {pagesStack.length === 2 &&
        pages.map((page) => (
          <FilterItem page={page} key={page.text} onPress={() => pagesStack} />
        ))}
    </>
  );
};

FilterPeople.propTypes = {
  pagesStack: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
  setPagesStack: PropTypes.func.isRequired,
};
FilterPeople.defaultProps = {};

export default FilterPeople;

const styles = StyleSheet.create({});
