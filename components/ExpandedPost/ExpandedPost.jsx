import React, {useContext, useState } from 'react';
import { View, StyleSheet, StatusBar } from 'react-native';
import { Modal, Portal } from 'react-native-paper';

import PropTypes from 'prop-types';

import Page from '../_common/Page/Page';
import TitleRegion from './TitleRegion';
import FooterRegion from '../Post/FooterRegion';
import AddCommentButton from './AddCommentButton';
import CommentList from './CommentList';
import NewComment from './NewComment';


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
  modalWrapper:{
    marginTop:'auto',
  },
});

function ExpandedPost({ route, postData }) {
  const [isModalVisible, setIsModalVisible] = useState(false);

  //todo remove hardcoded data
  const { title, subject, author, rating, priceInCents, createdAt, id } =
    route.params;

  return (
    <Page>
      <Portal>
        <TitleRegion
          style={styles.container}
          title={title}
          profileName={author.name}
          postDate={createdAt}
          profileImageURI={author.profilePicture}
          upvotePercentage={
            (rating.upvotes * 100) / (rating.upvotes + rating.downvotes)
          }
          courseName={subject}
        />
        <View style={styles.footerContainer}>
          <FooterRegion rating={rating} commentCount={priceInCents} isPost />
        </View>

        <CommentList />
        <AddCommentButton postID={id} onPress={() => setIsModalVisible(true)} />
        <Modal
          visible={isModalVisible}
          onDismiss={() => setIsModalVisible(false)}
          contentContainerStyle={styles.modalWrapper}
          style={styles.modal}
        >
          <NewComment
            profileImageURI={author.profilePicture}
          />
        </Modal>
      </Portal>
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
