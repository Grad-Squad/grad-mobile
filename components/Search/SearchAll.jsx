import EduText from 'common/EduText';
import React from 'react';
import PropTypes from 'prop-types';

// eslint-disable-next-line arrow-body-style
const SearchAll = ({searchText}) => {
    return(
        <EduText>{searchText} In All</EduText>
    )
}

SearchAll.propTypes = {
    searchText: PropTypes.string.isRequired,
};
SearchAll.defaultProps = {};

export default SearchAll;