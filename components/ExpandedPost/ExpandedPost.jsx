import React from 'react';
import { View, StyleSheet, StatusBar } from 'react-native';

import PropTypes from 'prop-types';

import Page from '../_common/Page/Page';
import TitleRegion from './TitleRegion';
import FooterRegion from '../Post/FooterRegion';
import AddCommentButton from './AddCommentButton';
import CommentList from './CommentList';

const statusBarPadding = StatusBar.currentHeight || 0;

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  footerContainer: {
    alignSelf: 'center',
    width: '90%',
    top: -1 * statusBarPadding,
  },
});

function ExpandedPost() {
  //todo remove hardcoded data
  //const { title, author, rating, priceInCents, createdAt, id } = postData;
  const creationDate = new Date(); //createdAt);
  const rating = {
    id: 0,
    upvotes: 69,
    downvotes: 31,
    currentUserStatus: 'yes',
  };

  return (
    <Page>
      <TitleRegion
        style={styles.container}
        title="{title}"
        profileName="{author.name}"
        postDate={creationDate}
        profileImageURI="https://cdn.discordapp.com/attachments/810207976232976446/873648416113192980/unknown.png"
        upvotePercentage={
          (rating.upvotes * 100) / (rating.upvotes + rating.downvotes)
        }
        courseName={'very advanced physics 2'}
      />
      <View style={styles.footerContainer}>
        <FooterRegion
          rating={{
            entityId: 0,
            upvotes: 5,
            downvotes: 3,
            currentUserStatus: 'upvoted',
          }}
          commentCount={0} //{priceInCents}
          isPost
        />
      </View>

      <CommentList />
      <AddCommentButton />
    </Page>
  );
}

export default ExpandedPost;

ExpandedPost.propTypes = {
  postData: PropTypes.exact({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    priceInCents: PropTypes.number.isRequired,
    subject: PropTypes.string.isRequired,
    rating: PropTypes.exact({
      id: PropTypes.number.isRequired,
      upvotes: PropTypes.number.isRequired,
      downvotes: PropTypes.number.isRequired,
      currentUserStatus: PropTypes.string.isRequired,
    }).isRequired,
    createdAt: PropTypes.string.isRequired,
    author: PropTypes.exact({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      profilePicture: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};
