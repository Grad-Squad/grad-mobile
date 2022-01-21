import React from 'react';
import PropTypes from 'prop-types';
import { Pressable, StyleSheet, View } from 'react-native';
import { Icon, PressableIcon } from 'common/Icon';
import { IconNames } from 'common/Icon/Icon';
import { Colors, Constants } from 'styles';
import EduText from 'common/EduText';
import pressableAndroidRipple from 'common/pressableAndroidRipple';

const BookmarksFolder = ({ name, onPress, onOptionsPress }) => (
  <Pressable
    style={styles.container}
    onPress={onPress}
    android_ripple={pressableAndroidRipple}
  >
    <View style={styles.leftSideContainer}>
      <Icon name={IconNames.Folder} size={32} />
      <EduText style={styles.text} numberOfLines={1}>
        {name}
      </EduText>
    </View>
    <PressableIcon name={IconNames.dotsVertical} onPress={onOptionsPress} />
  </Pressable>
);

BookmarksFolder.propTypes = {
  name: PropTypes.string.isRequired,
  onPress: PropTypes.func.isRequired,
  onOptionsPress: PropTypes.func.isRequired,
};
BookmarksFolder.defaultProps = {};

export default BookmarksFolder;

export const folderSpacingStyle = {
  marginHorizontal: Constants.commonMargin,
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',

    padding: Constants.commonMargin / 2,
    ...folderSpacingStyle,
    borderWidth: 1,
    borderColor: Colors.offBlack,
    borderRadius: Constants.borderRadius,
  },
  text: {
    marginLeft: 5,
  },
  leftSideContainer: {
    flexDirection: 'row',
    alignItems: 'center',

    flex: 1,

    marginRight: 30,
  },
});
