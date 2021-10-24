import React, { useEffect, useState } from 'react';
import { View, StyleSheet, StatusBar, Alert } from 'react-native';
import { Modal, Portal } from 'react-native-paper';
import { Constants } from 'styles';
import { useAPIAddComment, useAPIGetComments } from 'api/endpoints/posts';

import Page from '../_common/Page/Page';
import TitleRegion from './TitleRegion';
import FooterRegion from '../Post/FooterRegion';
import AddCommentButton from './AddCommentButton';
import CommentList from './CommentList';
import NewComment from './NewComment';

const statusBarPadding = StatusBar.currentHeight || 0;

const postData = {
  // todo remove hardcoded data
  id: 4,
  title: 'KMS',
  priceInCents: 10,
  subject: 'advanced nothing',
  rating: {
    id: 4,
    entityId: 0,
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
  const [commentList, setCommentList] = useState([]);

  const { title, subject, author, rating, priceInCents, createdAt, id } =
    postData;

  const getCommentsMutation = useAPIGetComments({
    onError: () => {
      Alert.alert('Cannot fetch comments')
    },
  })

  useEffect(() => {
    getCommentsMutation.mutate(id)
  }, [])

  const addCommentMutation = useAPIAddComment({
    onSuccess: () => {
      Alert.alert('added new comment') // TODO show new comments list
    },
  });

  const onSubmitHandle = (content) =>{
    addCommentMutation.mutate({ postID:id,content });
  }
  if(addCommentMutation.error){
    console.log("🚀 ~ file: ExpandedPost.jsx ~ line 53 ~ ExpandedPost ~ commentMutation.error.response", addCommentMutation.error.response) // TODO error message
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
          <FooterRegion
            rating={rating}
            commentCount={priceInCents}
            isPost
            onEdit={() => {}}
            contentProfileId={-1}
          />
        </View>

        <CommentList commentsData={commentsData}/>
        <AddCommentButton postID={id} onPressHandler={() => setIsModalVisible(true)} disabled={addCommentMutation.isLoading} />
        <Modal
          visible={isModalVisible}
          onDismiss={() => setIsModalVisible(false)}
          contentContainerStyle={styles.modalWrapper}
          style={styles.modal}
        >
          <NewComment
            profileImageURI={author.profilePicture}
            onSubmitHandleFunction={onSubmitHandle}
          />
        </Modal>
      </Portal>
    </Page>
  );
}

export default ExpandedPost;

ExpandedPost.propTypes = {};

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
