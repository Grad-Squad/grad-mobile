import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet } from 'react-native';
import { IconNames } from 'common/Icon/Icon';
import FilterItem from './FilterItem';
import FilterChoice from './FilterChoice';

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
  // {
  //   iconName: IconNames.sort,
  //   text: 'Sort',
  //   children: ['Latest', 'Most Relavent', 'Most Popular'],
  // },
];

const FilterPeople = ({ setPagesStack, pagesStack }) => {
  const currentPage = pages.find(
    (page) => page.text === pagesStack?.[pagesStack.length - 1]
  );
  return (
    <>
      {pagesStack.length === 1 &&
        pages.map((page) => (
          <FilterItem
            page={page}
            key={page.text}
            onPress={() => setPagesStack([...pagesStack, page.text])}
          />
        ))}
      {pagesStack.length === 2 &&
        currentPage?.children.map((choice) => (
          <FilterChoice
            key={`${choice} choice`}
            text={choice}
            parent={currentPage.text}
          />
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
