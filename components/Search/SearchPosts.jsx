import EduText from 'common/EduText';
import React from 'react';
import PropTypes from 'prop-types';

// eslint-disable-next-line arrow-body-style
const SearchPosts = ({searchText}) => {
    return(
        <EduText>{searchText} In Posts</EduText>
    )
}

SearchPosts.propTypes = {
    searchText: PropTypes.string.isRequired,
};
SearchPosts.defaultProps = {};

export default SearchPosts;