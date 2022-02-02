import React, { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import FollowerCard from 'components/Profile/FollowerCard';
import { navigationBarPropType } from 'proptypes';
import { FlatList, StyleSheet, View } from 'react-native';
import { Styles } from 'styles';
import FollowerCardSkeleton from 'components/Profile/FollowerCardSkeleton';
import EduText from 'common/EduText';
import { useLocalization } from 'localization';
import SearchContext from './SearchContext';

const SearchPeople = ({ navigation, numOfProfiles, listKey }) => {
  // ? I don't think this is right

  const { isLoading, fetchedSearchData } = useContext(SearchContext);

  const [results, setResults] = useState([]);

  const { t } = useLocalization();

  useEffect(() => {
    if (!isLoading) {
      if (numOfProfiles && fetchedSearchData?.profiles.count > numOfProfiles) {
        setResults(fetchedSearchData?.profiles.data.splice(0, numOfProfiles));
      } else {
        setResults(fetchedSearchData?.profiles.data);
      }
    }
  }, [isLoading]);

  return (
    <>
      {isLoading ? (
        <FollowerCardSkeleton />
      ) : (
        <FlatList
          data={results}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View style={{ width: '100%' }}>
              <FollowerCard profile={item} navigation={navigation} />
            </View>
          )}
          contentContainerStyle={{ paddingTop: 10, marginTop: 5 }}
          ListEmptyComponent={() => (
            <EduText style={[Styles.errorText, styles.notFoundText]}>
              {t('Search/NoProfiles')}
            </EduText>
          )}
          listKey={listKey}
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
