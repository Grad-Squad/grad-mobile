import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import FollowerCard from 'components/Profile/FollowerCard';
import { navigationBarPropType } from 'proptypes';
import { StyleSheet, View } from 'react-native';
import { Styles } from 'styles';
import FollowerCardSkeleton from 'components/Profile/FollowerCardSkeleton';
import EduText from 'common/EduText';
import { useLocalization } from 'localization';
import PaginatedFlatList from 'common/PaginatedFlatList';
import { searchPeopleQueryKey, useAPISearchPeople } from 'api/endpoints/search';
import { useSelector } from 'react-redux';
import SearchContext from './SearchContext';

const SearchPeople = ({ navigation, numOfProfiles, listKey }) => {
  const { isLoading, searchText } = useContext(SearchContext);
  const { t } = useLocalization();
  const params = useSelector((state) => state.search.params);

  return (
    <>
      {isLoading ? (
        <FollowerCardSkeleton />
      ) : (
        <PaginatedFlatList
          paginatedReactQuery={useAPISearchPeople}
          maxNumOfItems={numOfProfiles}
          paginatedReactQueryParams={[searchText]}
          hideNothingLeftToShow
          reactQueryKey={searchPeopleQueryKey(searchText, params)}
          renderItem={({ item }) => (
            <View style={{ width: '100%' }}>
              <FollowerCard profile={item} navigation={navigation} />
            </View>
          )}
          ListEmptyComponent={
            <EduText style={[Styles.errorText, styles.notFoundText]}>
              {t('Search/NoProfiles')}
            </EduText>
          }
          listKey={listKey}
          errorLocalizationKey="Feed/Error:Couldn't load posts"
          SkeletonComponent={
            <>
              {Array(numOfProfiles || 5)
                .fill()
                .map((_, index) => (
                  // eslint-disable-next-line react/no-array-index-key
                  <FollowerCardSkeleton key={index + 1} />
                ))}
            </>
          }
        />
      )}
    </>
  );
};

SearchPeople.propTypes = {
  navigation: navigationBarPropType.isRequired,
  listKey: PropTypes.string,
  numOfProfiles: PropTypes.number,
};
SearchPeople.defaultProps = {
  numOfProfiles: null,
  listKey: 'SearchPeopleList',
};

export default SearchPeople;

const styles = StyleSheet.create({
  notFoundText: {
    textAlign: 'center',
  },
});
