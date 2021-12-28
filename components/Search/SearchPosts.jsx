import React, { useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import { apiFeedQueryKey, useAPIFeed } from 'api/endpoints/posts';
import PostsContainer from 'components/Post/PostsContainer';
import { navigationBarPropType } from 'proptypes';
import SearchContext from './SearchContext';

const SearchPosts = ({navigation, numOfPosts}) => { // ? I don't think this is right

    const { formik, t, setFilterMode } = useContext(SearchContext); // todo use search with for query

    useEffect(() => {
        const unsubscribe = navigation?.addListener('tabPress', (e) => {
            setFilterMode("Posts")
        });

        return unsubscribe;
    }, [navigation]);

    return(
        <PostsContainer
            reactQueryKey={apiFeedQueryKey}
            paginatedReactQuery={useAPIFeed}
        />
    )
}

SearchPosts.propTypes = {
    navigation:navigationBarPropType.isRequired,
    numOfPosts: PropTypes.number,
};
SearchPosts.defaultProps = {
    numOfPosts: null,
};

export default SearchPosts;