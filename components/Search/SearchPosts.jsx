import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { apiFeedQueryKey, useAPIFeed } from 'api/endpoints/posts';
import PostsContainer from 'components/Post/PostsContainer';
import SearchContext from './SearchContext';

const SearchPosts = ({numOfPosts}) => { // ? I don't think this is right

    const { formik, t } = useContext(SearchContext); // todo use search with for query

    return(
        <PostsContainer
            reactQueryKey={apiFeedQueryKey}
            paginatedReactQuery={useAPIFeed}
        />
    )
}

SearchPosts.propTypes = {
    numOfPosts: PropTypes.number,
};
SearchPosts.defaultProps = {
    numOfPosts: null,
};

export default SearchPosts;