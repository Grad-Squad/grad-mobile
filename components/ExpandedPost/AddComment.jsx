import React, { useEffect, useState } from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';

import PropTypes from 'prop-types';

import EduText from 'common/EduText';
import { Icon } from 'common/Icon';
import { IconNames } from 'common/Icon/Icon';

import { Modal } from 'react-native-paper';
import { getCommentsKey, useAPIAddComment } from 'api/endpoints/posts';
import { Colors } from 'styles';
import { HIT_SLOP_OBJECT } from 'constants';
import { queryClient } from 'components/ReactQueryClient/ReactQueryClient';
import { deepCopy } from 'utility';
import { useAPIEditComment } from 'api/endpoints/comments';
import { replaceItemInPages } from 'api/util';
import NewComment from './NewComment';

const styles = StyleSheet.create({
  CommentsContainer: {
    flexDirection: 'row',
    alignSelf: 'center',
    alignItems: 'center',
    borderRadius: 7,
    borderWidth: 2,
    borderStyle: 'dashed',
    width: '90%',
    padding: 5,
    justifyContent: 'center',
    borderColor: Colors.addCommentBorder,
    marginVertical: 10,
  },
  button: {
    flexDirection: 'row',
  },
  modalWrapper: {
    marginTop: 'auto',
  },
});

function AddComment({ postID, commentToEdit }) {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const addCommentMutation = useAPIAddComment({
    onSuccess: (data) => {
      queryClient.setQueryData([getCommentsKey, postID], (oldData) => {
        const copy = deepCopy(oldData);
        copy.pages[0].data.unshift(data);
        return copy;
      });
      setIsModalVisible(false);
    },
  });
  const editCommentMutation = useAPIEditComment({
    onSuccess: (data) => {
      queryClient.setQueryData([getCommentsKey, postID], (oldData) =>
        replaceItemInPages(oldData, data.id, data)
      );
      setIsModalVisible(false);
    },
  });

  const onSubmitHandle = (content) => {
    if (commentToEdit) {
      editCommentMutation.mutate({
        postID,
        commentId: commentToEdit.id,
        content,
      });
    } else {
      addCommentMutation.mutate({ postID, content });
    }
  };

  useEffect(() => {
    if (commentToEdit) {
      setIsModalVisible(true);
    }
  }, [commentToEdit]);
  return (
    <>
      <TouchableOpacity
        style={styles.CommentsContainer}
        onPress={() => setIsModalVisible(true)}
        hitSlop={HIT_SLOP_OBJECT}
      >
        <Icon name={IconNames.plus} size={24} color={Colors.addCommentText} />
        <EduText style={{ color: Colors.addCommentText }}>Comment</EduText>
      </TouchableOpacity>

      <Modal
        visible={isModalVisible}
        onDismiss={() => setIsModalVisible(false)}
        contentContainerStyle={styles.modalWrapper}
      >
        <NewComment
          // profileImageURI={author.profilePicture}
          initialText={commentToEdit?.content}
          onSubmit={onSubmitHandle}
          isLoading={addCommentMutation.isLoading}
        />
      </Modal>
    </>
  );
}

export default AddComment;

AddComment.propTypes = {
  postID: PropTypes.number.isRequired,
  commentToEdit: PropTypes.shape({
    content: PropTypes.string.isRequired,
    id: PropTypes.number.isRequired,
  }),
};
AddComment.defaultProps = {
  commentToEdit: undefined,
};
