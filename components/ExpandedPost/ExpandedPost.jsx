import React, { useState } from 'react';
import { View, StyleSheet, StatusBar, Alert } from 'react-native';
import { Modal, Portal } from 'react-native-paper';
import { Constants } from 'styles';

import Page from '../_common/Page/Page';
import TitleRegion from './TitleRegion';
import FooterRegion from '../Post/FooterRegion';
import AddCommentButton from './AddCommentButton';
import CommentList from './CommentList';
import NewComment from './NewComment';

const statusBarPadding = StatusBar.currentHeight || 0;

const postData = { // todo remove hardcoded data
  id: 0,
  title: 'KMS',
  priceInCents: 10,
  subject: 'advanced nothing',
  rating: {
    id: 0,
    entityId:0,
    upvotes: 100,
    downvotes: 50,
    currentUserStatus: 'sad',
  },
  createdAt: new Date().toDateString(),
  author: {
    id: 0,
    name: 'sad ek',
    profilePicture: 'https://pbs.twimg.com/media/EVgKUNnWoAIX9MF.jpg',
  },
};

function ExpandedPost() {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const { title, subject, author, rating, priceInCents, createdAt, id } =
  postData;

  const onSubmitHandle = (text) =>{
    Alert.alert(`comment \n ${text}`)
  }

  return (
    <Page style={styles.page}>
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
        <AddCommentButton postID={id} onPressHandler={() => setIsModalVisible(true)} />
        <Modal
          visible={isModalVisible}
          onDismiss={() => setIsModalVisible(false)}
          contentContainerStyle={styles.modalWrapper}
          style={styles.modal}
        >
          <NewComment profileImageURI={author.profilePicture} onSubmitHandleFunction={onSubmitHandle}/>
        </Modal>
      </Portal>
    </Page>
  );
}

export default ExpandedPost;

ExpandedPost.propTypes = {
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  footerContainer: {
    alignSelf: 'center',
    width: '90%',
    top: -1 * statusBarPadding,
  },
  modalWrapper: {
    marginTop: 'auto',
  },
  page: {
    paddingTop: Constants.fromScreenStartPadding,
  },
});
