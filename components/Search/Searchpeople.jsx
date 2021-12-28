import React, { useContext, useEffect } from 'react';
import { getFollowersKey, useAPIGetProfileFollowers } from 'api/endpoints/profile';
import PropTypes from 'prop-types';
import PaginatedFlatList from 'common/PaginatedFlatList';
import FollowerCard from 'components/Profile/FollowerCard';
import FollowerCardSkeleton from 'components/Profile/FollowerCardSkeleton';
import { navigationBarPropType } from 'proptypes';
import { StyleSheet, View } from 'react-native';
import { Constants } from 'styles';
import SearchContext from './SearchContext';

const SearchPeople = ({navigation, numOfProfiles}) => { // ? I don't think this is right

    const { formik, t, setFilterMode } = useContext(SearchContext); // todo use search with for query
    const tmp = 1 // ! remove this

    useEffect(() => {
        const unsubscribe = navigation?.addListener('tabPress', (e) => {
            setFilterMode("People")
        });

        return unsubscribe;
    }, [navigation]);

    return(
        <PaginatedFlatList
            contentContainerStyle={styles.container}
            paginatedReactQuery={useAPIGetProfileFollowers}
            paginatedReactQueryParams={[tmp]}
            reactQueryKey={getFollowersKey(tmp)}
            renderItem={({ item }) => (
            <FollowerCard profile={item} navigation={navigation} />
            )}
            ItemSeparatorComponent={() => <View style={styles.cardsSeparator} />}
            errorLocalizationKey="Followers/Error: Couldn't Load Followers"
            noItemsLocalizationKey="Followers/This Account does not have any followers!"
            hideNothingLeftToShow
            SkeletonComponent={() => (
            <>
                {Array(10)
                .fill()
                .map((_, index) => (
                    // eslint-disable-next-line react/no-array-index-key
                    <FollowerCardSkeleton key={index + 1} />
                ))}
            </>
            )}
      />
    )
}

SearchPeople.propTypes = {
    navigation: navigationBarPropType.isRequired,
    numOfProfiles: PropTypes.number,
};
SearchPeople.defaultProps = {
    numOfProfiles: null,
};

export default SearchPeople;

const styles = StyleSheet.create({
    cardsSeparator: {
      margin: Constants.commonMargin / 4,
    },
    container: {
      paddingTop: Constants.fromScreenStartPadding,
    },
  });