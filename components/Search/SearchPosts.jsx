import EduText from 'common/EduText';
import React, { useContext } from 'react';
import SearchContext from './SearchContext';

const SearchPosts = () => {

    const { formik } = useContext(SearchContext);

    return(
        <EduText>{formik.values.searchText} In Posts</EduText>
    )
}

SearchPosts.propTypes = {};
SearchPosts.defaultProps = {};

export default SearchPosts;