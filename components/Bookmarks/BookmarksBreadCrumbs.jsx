import React from 'react';
import PropTypes from 'prop-types';
import { Pressable, StyleSheet, View } from 'react-native';
import EduText from 'common/EduText';
import { Constants } from 'styles';
import pressableAndroidRipple from 'common/pressableAndroidRipple';
import { Icon } from 'common/Icon';
import { IconNames } from 'common/Icon/Icon';

const BookmarksBreadCrumbs = ({ path, onBackPress }) =>
  path.length !== 0 && (
    <View style={styles.header}>
      <View>
        <EduText>{path.join('/')}/</EduText>
        {path && (
          <View style={styles.row}>
            <Pressable
              android_ripple={pressableAndroidRipple}
              onPress={onBackPress}
            >
              <Icon name={IconNames.keyboardArrowLeft} size={32} />
            </Pressable>
            <EduText style={styles.currentFolder}>
              {path[path.length - 1]}
            </EduText>
          </View>
        )}
      </View>
    </View>
  );

BookmarksBreadCrumbs.propTypes = {
  path: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
  onBackPress: PropTypes.func.isRequired,
};
BookmarksBreadCrumbs.defaultProps = {};

export default BookmarksBreadCrumbs;

const styles = StyleSheet.create({
  header: {
    marginTop: Constants.commonMargin,
    marginHorizontal: Constants.commonMargin,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  currentFolder: {
    fontSize: 20,
  },
});
