import React from 'react';
import PropTypes from 'prop-types';
import FilterItem from './FilterItem';
import FilterChoice from './FilterChoice';

const PageFilterer = ({ pages, setPagesStack, pagesStack }) => {
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

PageFilterer.propTypes = {
  pagesStack: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
  setPagesStack: PropTypes.func.isRequired,
  pages: PropTypes.arrayOf(
    PropTypes.exact({
      iconName: PropTypes.string.isRequired,
      text: PropTypes.string.isRequired,
      children: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
    }).isRequired
  ).isRequired,
};
PageFilterer.defaultProps = {};

export default PageFilterer;
