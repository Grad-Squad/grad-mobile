import React from 'react';
import { StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import { navigationPropType, routeParamPropType } from 'proptypes';
import Page from '../_common/Page/Page';
import AddComment from './AddComment';
import CommentList from './CommentList';
import ExpandedPostContent from './ExpandedPostContent/ExpandedPostContent';

function ExpandedPost({ navigation, route }) {
  const postID = route?.params.postID;
  return (
    <Page>
      <ExpandedPostContent navigation={navigation} postId={postID} />
      <CommentList postID={postID} />
      <AddComment postID={postID} />
    </Page>
  );
}

export default ExpandedPost;

ExpandedPost.propTypes = {
  navigation: navigationPropType.isRequired,
  route: routeParamPropType(
    PropTypes.exact({
      postID: PropTypes.number.isRequired,
    })
  ).isRequired,
};
ExpandedPost.defaultProps = {};

const styles = StyleSheet.create({});
