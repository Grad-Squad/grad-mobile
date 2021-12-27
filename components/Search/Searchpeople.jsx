import EduText from 'common/EduText';
import React from 'react';
import PropTypes from 'prop-types';

// eslint-disable-next-line arrow-body-style
const SearchPeople = ({searchText}) => {
    return(
        <EduText>{searchText} In People</EduText>
    )
}

SearchPeople.propTypes = {
    searchText: PropTypes.string.isRequired,
};
SearchPeople.defaultProps = {};

export default SearchPeople;