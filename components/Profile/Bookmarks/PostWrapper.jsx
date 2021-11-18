import Post from 'components/Post/Post';
import { postPropType } from 'proptypes';
import React from 'react';

const PostWrapper = ({
  item: { title, author, rating, createdAt, id, commentCount, materials },
}) => (
  <Post
    title={title}
    author={author}
    rating={rating}
    createdAt={createdAt}
    id={id}
    style={styles.post}
    commentCount={commentCount}
    materials={materials}
  />
);

PostWrapper.propTypes = {
  item: postPropType.isRequired,
};

const styles = StyleSheet.create({
  post: {
    width: '90%',
    alignSelf: 'center',
  },
});

export default PostWrapper;
