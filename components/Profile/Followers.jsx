import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, View } from 'react-native';
import { navigationPropType, routeParamPropType } from 'proptypes';
import GoBackButton from 'common/GoBackButton';
import Page from 'common/Page/Page';
import PaginatedFlatList from 'common/PaginatedFlatList';
import { useAPIGetComments } from 'api/endpoints/posts';
import FollowerCard from './FollowerCard';
import { Constants } from 'styles';
import EduText from 'common/EduText';
import { useLocalization } from 'localization';

const Followers = ({ navigation, route }) => {
  const { profileId } = route.params;
  const { t } = useLocalization();
  // todo axios get profile stuff
  console.log(profileId);
  return (
    <Page>
      <GoBackButton
        onPress={() => {
          navigation.goBack();
        }}
      />
      <View style={styles.title}>
        <EduText style={styles.titleText}>{t('Profile/Followers')}</EduText>
      </View>
      <FollowerCard
        profile={{
          id: 6,
          createdAt: '2021-09-26T17:49:56.650Z',
          updatedAt: '2021-11-14T14:50:32.584Z',
          name: 'Sameh Initial',
          role: 'student',
          profilePicture:
            'https://cdn.discordapp.com/attachments/810207976232976446/873648416113192980/unknown.png',
          isFollowed: Math.random() > 0.5,
        }}
        onFollow={() => {}}
        onUnFollow={() => {}}
        navigation={navigation}
      />

      <FollowerCard
        profile={{
          id: 4,
          createdAt: '2021-09-26T17:49:56.650Z',
          updatedAt: '2021-11-14T14:50:32.584Z',
          name: 'Sameh Initial',
          role: 'student',
          profilePicture:
            'https://cdn.discordapp.com/attachments/810207976232976446/873648416113192980/unknown.png',
          isFollowed: Math.random() > 0.5,
        }}
        onFollow={() => {}}
        onUnFollow={() => {}}
        navigation={navigation}
      />

      <FollowerCard
        profile={{
          id: 5,
          createdAt: '2021-09-26T17:49:56.650Z',
          updatedAt: '2021-11-14T14:50:32.584Z',
          name: 'Sameh Initial',
          role: 'student',
          profilePicture:
            'https://cdn.discordapp.com/attachments/810207976232976446/873648416113192980/unknown.png',
          isFollowed: Math.random() > 0.5,
        }}
        onFollow={() => {}}
        onUnFollow={() => {}}
        navigation={navigation}
      />

      {/* <PaginatedFlatList
        contentContainerStyle={styles.container}
        paginatedReactQuery={useAPIGetComments}
        paginatedReactQueryParams={[profileId]}
        reactQueryKey={[getCommentsKey, postID]}
        renderItem={({ item: { content, createdAt, author, rating } }) => (
          <Comment
            profileName={author.name}
            text={content}
            commentDate={createdAt}
            voteCount={rating.upvotes - rating.downvotes}
            profileId={author.id}
          />
        )}
        errorLocalizationKey="Comment/Error: Couldn't Load Comments"
        noItemsLocalizationKey="Comment/No Comments on this post. Be the first to add a comment!"
        hideNothingLeftToShow
      /> */}
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
});
