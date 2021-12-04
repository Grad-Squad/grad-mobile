import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, View } from 'react-native';
import { navigationPropType, routeParamPropType } from 'proptypes';
import GoBackButton from 'common/GoBackButton';
import Page from 'common/Page/Page';
import PaginatedFlatList from 'common/PaginatedFlatList';
import { Constants } from 'styles';
import EduText from 'common/EduText';
import { useLocalization } from 'localization';
import {
  getFollowersKey,
  useAPIGetProfileFollowers,
} from 'api/endpoints/profile';
import FollowerCard from './FollowerCard';

const Followers = ({ navigation, route }) => {
  const { profileId } = route.params;
  const { t } = useLocalization();
  // todo axios get profile stuff
  return (
    <Page style={styles.container}>
      <GoBackButton
        onPress={() => {
          navigation.goBack();
        }}
        otherComponent={
          <EduText style={styles.titleText}>{t('Profile/Followers')}</EduText>
        }
      />
      <PaginatedFlatList
        contentContainerStyle={styles.container}
        paginatedReactQuery={useAPIGetProfileFollowers}
        paginatedReactQueryParams={[profileId]}
        reactQueryKey={[getFollowersKey, profileId]}
        renderItem={({ item }) => (
          <FollowerCard
            profile={item}
            onFollow={() => {}}
            onUnFollow={() => {}}
            navigation={navigation}
          />
        )}
        ItemSeparatorComponent={() => <View style={styles.cardsSeparator} />}
        errorLocalizationKey="Comment/Error: Couldn't Load Comments"
        noItemsLocalizationKey="Comment/No Comments on this post. Be the first to add a comment!"
        hideNothingLeftToShow
      />
    </Page>
  );
};

Followers.propTypes = {
  navigation: navigationPropType.isRequired,
  route: routeParamPropType(
    PropTypes.exact({
      profileId: PropTypes.number.isRequired,
    })
  ).isRequired,
};
Followers.defaultProps = {};

export default Followers;

const styles = StyleSheet.create({
  title: {
    marginLeft: '23%',
    height: '13%',
    justifyContent: 'center',
  },
  titleText: {
    fontSize: 24,
  },
  cardsSeparator: {
    margin: Constants.commonMargin / 4,
  },
  container: {
    paddingTop: Constants.fromScreenStartPadding,
  },
});
