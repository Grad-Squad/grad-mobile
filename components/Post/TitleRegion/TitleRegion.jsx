import React, { useMemo } from 'react';
import { View, Image, StyleSheet, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';

import EduText from 'common/EduText';
import PostContentList from 'common/Post/PostContentList';
import { Colors } from 'styles';
import { formatDate } from 'utility';
import { materialsPropType, subjectPropType } from 'proptypes';
import { useNavigation } from '@react-navigation/native';
import ScreenNames from 'navigation/ScreenNames';
import { BASIC_5V_HIT_SLOP_OBJECT, AssetsConstants } from 'constants';
import { useLocalization } from 'localization';

const imageWidth = 70;
const imageOffset = -25;

function TitleRegion({
  title,
  author,
  createdAt,
  materials,
  subject,
  wasEdited,
}) {
  const { t } = useLocalization();
  const postDate = useMemo(() => new Date(createdAt), [createdAt]);
  const authorId = author.id;

  const navigation = useNavigation();
  const navigateToProfile = () =>
    navigation.navigate(ScreenNames.PROFILE, { profileId: authorId });

  return (
    <View style={styles.outerContainer}>
      <View>
        <View style={styles.imageContainer}>
          <TouchableOpacity onPress={navigateToProfile}>
            <Image
              style={styles.profileImage}
              source={{
                uri: author?.profilePicture?.uri,
              }}
              defaultSource={AssetsConstants.images.defaultProfile}
              resizeMode="cover"
            />
          </TouchableOpacity>
        </View>
        <View style={styles.innerContainer}>
          <TouchableOpacity
            onPress={navigateToProfile}
            hitSlop={BASIC_5V_HIT_SLOP_OBJECT}
          >
            <View style={styles.profileInfoContainer}>
              <EduText style={styles.profileName}>{author.name}</EduText>
            </View>
          </TouchableOpacity>
          <View style={styles.postTitle}>
            <EduText style={styles.titleText}>{title}</EduText>
          </View>
        </View>
      </View>
      <View style={styles.contentContainer}>
        <View style={styles.material}>
          <PostContentList materials={materials} notClickable />
        </View>
      </View>
      <EduText style={styles.date}>{`${subject.content}, ${formatDate(
        postDate
      )}${wasEdited ? `, ${t('Post/edited')}` : ''}`}</EduText>
    </View>
  );
}

export default React.memo(TitleRegion);

export const styles = StyleSheet.create({
  profileImage: {
    borderRadius: 70,
    width: imageWidth,
    height: 70,
    alignSelf: 'center',
  },
  imageContainer: {
    position: 'absolute',
    top: -25,
    left: imageOffset,
    padding: 5,
    borderRadius: 50,
    borderTopWidth: 0,
    borderRightWidth: 0.1,
    borderBottomWidth: 0.1,
    borderColor: Colors.background,
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
  },
  titleText: {
    fontWeight: 'normal',
    fontSize: 18,
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

  contentContainer: {
    marginTop: 5,
  },
  date: {
    marginLeft: 'auto',
    // marginRight: 10,
    fontSize: 9,
  },
  material: {
    marginVertical: 5,
    minHeight: 90,
    width: '100%',
  },
});

TitleRegion.propTypes = {
  author: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    profilePicture: PropTypes.shape({
      uri: PropTypes.string.isRequired,
    }),
  }).isRequired,
  title: PropTypes.string.isRequired,
  createdAt: PropTypes.string.isRequired,
  materials: materialsPropType.isRequired,
  subject: subjectPropType.isRequired,
  wasEdited: PropTypes.bool.isRequired,
};
