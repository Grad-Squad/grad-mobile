import React, { useContext, useState,useEffect } from 'react';
import PropTypes from 'prop-types';
import { navigationBarPropType } from 'proptypes';
import Post from 'components/Post/Post';
import { FlatList, StyleSheet } from 'react-native';
import FollowerCardSkeleton from 'components/Profile/FollowerCardSkeleton';
import EduText from 'common/EduText';
import { useLocalization } from 'localization';
import { Styles } from 'styles';
import SearchContext from './SearchContext';

const SearchPosts = ({navigation, numOfPosts, listKey}) => { // ? I don't think this is right

    const { isLoading, fetchedSearchData } = useContext(SearchContext);

    const [results, setResults] = useState([])

    const { t } = useLocalization();

    useEffect(() => {
        if(!isLoading){
            if(numOfPosts && fetchedSearchData?.posts.count > numOfPosts){
                setResults(fetchedSearchData?.posts.data.splice(0,numOfPosts))
            }else{
                setResults(fetchedSearchData?.posts.data)
            }
        }
    }, [isLoading])

    const renderItem=
        ({
          item: { title, author, rating, createdAt, id, commentCount, materials },
        }) => (
          <Post
            title={title}
            author={author}
            rating={rating}
            createdAt={createdAt}
            id={id}
            style={{width: '90%',alignSelf: 'center',}}
            commentCount={commentCount}
            materials={materials}
          />
        )

    return(
        <>
        {isLoading
            ?
            <FollowerCardSkeleton/>
            :
            <FlatList
            data={results}
            keyExtractor={(item) => item.id.toString()}
            renderItem={renderItem}
            contentContainerStyle={{paddingTop:20,marginTop:10}}
            ListEmptyComponent={() => <EduText style={[Styles.errorText,styles.notFoundText]}>{t('Search/NoPosts')}</EduText>}
            listKey={listKey}
            />
        }
        </>
    )
}

SearchPosts.propTypes = {
    navigation:navigationBarPropType.isRequired,
    listKey: PropTypes.string,
    numOfPosts: PropTypes.number,
};
SearchPosts.defaultProps = {
    numOfPosts: null,
    listKey: "SearchPostsList",
};

export default SearchPosts;

const styles = StyleSheet.create({
    notFoundText:{
        textAlign:'center',
    }
});