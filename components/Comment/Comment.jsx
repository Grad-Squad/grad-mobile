import React from 'react';
import { View, Image, StyleSheet, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';

import { HIT_SLOP_OBJECT } from 'constants';
import EduText from 'common/EduText';
import { useNavigation } from '@react-navigation/native';
import ScreenNames from 'navigation/ScreenNames';
import { queryClient } from 'components/ReactQueryClient/ReactQueryClient';
import {
  useAPIDeleteComment,
  getCommentsKey,
  getPostByIdQueryKey,
  apiFeedQueryKey,
} from 'api/endpoints/posts';
import { useLocalization } from 'localization';
import FillLoadingIndicator from 'common/FillLoadingIndicator';
import { deleteItemInPages, updateItemInPages } from 'api/util';
import { ratingPropType } from 'proptypes';
import {
  Fade,
  Placeholder,
  PlaceholderLine,
  PlaceholderMedia,
} from 'rn-placeholder';
import { deepCopy, formatDate } from '../../utility';
import { Colors, Constants } from '../../styles';
import FooterRegion from '../Post/FooterRegion';
import CommentDeletionAlert from './CommentDeletionAlert';

const imageWidth = 55;
const imageOffset = -50;

const defaultProfileImage = require('../../assets/images/defaultUser.png');

function Comment({
  text,
  commentDate,
  rating,
  author,
  commentId,
  postId,
  onEdit,
  isPlaceholder,
}) {
  const navigation = useNavigation();

  const profileId = author.id;
  const { t } = useLocalization();

  const navigateToProfile = () =>
    navigation.navigate(ScreenNames.PROFILE, { profileId });

  const deleteCommentMutation = useAPIDeleteComment(postId, commentId, {
    onSuccess: () => {
      queryClient.setQueryData([getCommentsKey, postId], (oldData) =>
        deleteItemInPages(oldData, commentId)
      );
      queryClient.setQueryData(getPostByIdQueryKey(postId), (oldData) => {
        const copy = deepCopy(oldData);
        copy.commentCount -= 1;
        return copy;
      });
      queryClient.setQueryData(apiFeedQueryKey, (oldData) =>
        updateItemInPages(oldData, postId, (oldItem) => ({
          ...oldItem,
          commentCount: oldItem.commentCount - 1,
        }))
      );
    },
  });

  if (isPlaceholder) {
    return (
      <View
        style={{
          width: '100%',
          minWidth: '100%',
          marginBottom: Constants.commonMargin,
        }}
      >
        <View style={styles.outerContainer}>
          <View>
            <View style={styles.imageContainer}>
              <Placeholder
                Animation={(props) => (
                  // eslint-disable-next-line react/jsx-props-no-spreading
                  <Fade {...props} style={{ backgroundColor: Colors.cgrey }} />
                )}
              >
                <PlaceholderMedia isRound style={styles.profileImage} />
              </Placeholder>
            </View>
            <View style={styles.innerContainer}>
              <View>
                <Placeholder
                  Animation={(props) => (
                    <Fade
                      // eslint-disable-next-line react/jsx-props-no-spreading
                      {...props}
                      style={{ backgroundColor: Colors.cgrey }}
                    />
                  )}
                >
                  <PlaceholderLine />
                  <PlaceholderLine />
                  <PlaceholderLine width={40} />
                </Placeholder>
              </View>
            </View>
          </View>
        </View>
      </View>
    );
  }

  return (
    <View style={{ width: '100%', minWidth: '100%' }}>
      <View style={styles.outerContainer}>
        {deleteCommentMutation.isLoading && <FillLoadingIndicator />}
        <View>
          <View style={styles.imageContainer}>
            <TouchableOpacity
              onPress={navigateToProfile}
              hitSlop={HIT_SLOP_OBJECT}
            >
              <Image
                style={styles.profileImage}
                source={
                  author.profilePicture
                    ? {
                        uri: author.profilePicture.uri,
                      }
                    : defaultProfileImage
                }
              />
            </TouchableOpacity>
          </View>
          <View style={styles.innerContainer}>
            <TouchableOpacity
              onPress={navigateToProfile}
              hitSlop={{ top: 5, bottom: 5 }}
            >
              <View style={styles.profileInfoContainer}>
                <EduText style={styles.profileName}>{author.name}</EduText>
              </View>
            </TouchableOpacity>
            <View>
              <EduText style={styles.text}>{text}</EduText>
            </View>
          </View>
        </View>
        <EduText style={styles.date}>{formatDate(commentDate)}</EduText>
      </View>
      <View style={styles.footerContainer}>
        <FooterRegion
          rating={rating}
          postId={postId}
          style={styles.footer}
          onEdit={onEdit}
          onDelete={() => {
            CommentDeletionAlert(t, () => deleteCommentMutation.mutate());
          }}
          contentProfileId={profileId}
        />
      </View>
    </View>
  );
}

export default Comment;

Comment.propTypes = {
  author: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    profilePicture: PropTypes.shape({
      uri: PropTypes.string.isRequired,
    }),
  }).isRequired,
  text: PropTypes.string.isRequired,
  commentDate: PropTypes.string.isRequired,
  rating: ratingPropType.isRequired,
  commentId: PropTypes.number.isRequired,
  postId: PropTypes.number.isRequired,
  onEdit: PropTypes.func.isRequired,
  isPlaceholder: PropTypes.bool,
};

Comment.defaultProps = {
  profileImageURI: undefined,
  isPlaceholder: false,
};

export const styles = StyleSheet.create({
  profileImage: {
    borderRadius: 50,
    width: imageWidth,
    height: imageWidth,
    // borderWidth: 0.1,
    // borderColor: 'black',
  },
  imageContainer: {
    position: 'absolute',
    top: -5,
    left: imageOffset,
    padding: 5,
    borderRadius: 50,
    borderTopWidth: 0,
    borderRightWidth: 0.1,
    borderBottomWidth: 0.1,
    borderColor: 'rgba(0 ,0 , 0,0.5)',
    backgroundColor: Colors.background,
  },
  outerContainer: {
    justifyContent: 'space-between',
    borderRadius: 7,
    borderColor: 'rgba(0 ,0 , 0,0.5)',
    backgroundColor: Colors.cardBody,
    shadowOpacity: 0.25,
    shadowColor: '#000000',
    shadowRadius: 7,
    shadowOffset: {
      width: 1,
      height: 2,
    },
    elevation: 2,
    paddingTop: 5,
    paddingBottom: 5,
    paddingHorizontal: 15,
    minHeight: 60,
  },
  text: {
    fontWeight: 'normal',
    fontSize: 15,
    marginTop: 4,
  },
  profileName: {
    fontSize: 9,
  },
  profileInfoContainer: {
    flexDirection: 'row',
    width: '50%',
    marginRight: 'auto',
  },
  innerContainer: {
    marginLeft: imageWidth + imageOffset + 15,
    marginTop: 5,
  },
  date: {
    marginLeft: 'auto',
    fontSize: 9,
  },
  footerContainer: {
    marginLeft: 'auto',
    top: -6,
    zIndex: -1,
  },
  // footer: {
  //   marginLeft: 'auto',
  // },
});
