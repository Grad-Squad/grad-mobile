import EduText from 'common/EduText';
import React from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import { Button } from 'react-native-paper';
import { navigationBarPropType } from 'proptypes';
import { Colors, Constants } from 'styles';
import { useLocalization } from 'localization';
import SearchPosts from './SearchPosts';
import SearchPeople from './Searchpeople';

// eslint-disable-next-line arrow-body-style
const SearchAll = ({ navigation }) => {
  const { t } = useLocalization();

  const DATA = [
    {
      key: 'SearchAllList',
    },
  ];

  const renderItem = (item) => (
    <View style={{ overflow: 'scroll' }}>
      <View style={styles.specificSearchContainer}>
        <EduText style={styles.specificSearchTitle}>
          {t('Search/People')}
        </EduText>
        <SearchPeople
          navigation={navigation}
          numOfProfiles={5}
          listKey="SearchPeopleList"
        />
        <Button
          mode="outlined"
          onPress={() => navigation.jumpTo('SearchPeople')}
          style={styles.viewMoreButton}
        >
          {t('Search/More')}
        </Button>
      </View>
      <View style={styles.specificSearchContainer}>
        <EduText
          style={[styles.specificSearchTitle, styles.specificSearchTitlePost]}
        >
          {t('Search/Posts')}
        </EduText>
        <SearchPosts
          navigation={navigation}
          numOfPosts={3}
          listKey="SearchPostsList"
        />
        <Button
          mode="outlined"
          onPress={() => navigation.jumpTo('SearchPosts')}
          style={styles.viewMoreButton}
        >
          {t('Search/More')}
        </Button>
      </View>
    </View>
  );
  return <FlatList data={DATA} renderItem={renderItem} />;
};

SearchAll.propTypes = {
  navigation: navigationBarPropType.isRequired,
};
SearchAll.defaultProps = {};

export default SearchAll;

const styles = StyleSheet.create({
  specificSearchContainer: {
    width: '100%',
    paddingVertical: 5,
    backgroundColor: Colors.background2,
    marginBottom: 5,
    borderColor: Colors.border,
    borderWidth: 0.25,
  },
  viewMoreButton: {
    alignSelf: 'center',
    width: '90%',
    borderColor: Colors.accent,
    borderRadius: Constants.borderRadius,
    margin: 5,
  },
  specificSearchTitle: {
    margin: 5,
    marginTop: 7,
    fontSize: 15,
  },
  specificSearchTitlePost: {
    marginBottom: 30,
  },
});
