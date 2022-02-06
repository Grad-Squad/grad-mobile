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
  profilesFollowedKey,
  useAPIGetProfileFollowers,
  useAPIGetProfilesFollowed,
} from 'api/endpoints/profile';
import FollowerCard from './FollowerCard';
import FollowerCardSkeleton from './FollowerCardSkeleton';

const Followers = ({ navigation, route }) => {
  const { profileId, peopleYouFollow } = route.params;
  const { t } = useLocalization();
  return (
    <Page style={styles.container}>
      <GoBackButton
        onPress={() => {
          navigation.goBack();
        }}
        otherComponent={
          <EduText style={styles.titleText}>
            {peopleYouFollow
              ? t('Profile/People Followed')
              : t('Profile/Followers')}
          </EduText>
        }
      />
      <PaginatedFlatList
        contentContainerStyle={styles.container}
        paginatedReactQuery={
          peopleYouFollow
            ? useAPIGetProfilesFollowed
            : useAPIGetProfileFollowers
        }
        paginatedReactQueryParams={[profileId]}
        reactQueryKey={
          peopleYouFollow ? profilesFollowedKey : getFollowersKey(profileId)
        }
        renderItem={({ item }) => (
          <FollowerCard profile={item} navigation={navigation} />
        )}
        ItemSeparatorComponent={() => <View style={styles.cardsSeparator} />}
        errorLocalizationKey={
          peopleYouFollow
            ? "Followed/Error: Couldn't load people you follow"
            : "Followers/Error: Couldn't Load Followers"
        }
        noItemsLocalizationKey={
          peopleYouFollow
            ? "Followed/You haven't followed anyone yet!"
            : 'Followers/This Account does not have any followers!'
        }
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
    </Page>
  );
};

Followers.propTypes = {
  navigation: navigationPropType.isRequired,
  route: routeParamPropType(
    PropTypes.exact({
      profileId: PropTypes.number,
      peopleYouFollow: PropTypes.bool,
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
