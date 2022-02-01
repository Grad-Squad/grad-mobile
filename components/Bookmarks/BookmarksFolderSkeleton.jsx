import React from 'react';
import { View } from 'react-native';
import { Placeholder, PlaceholderLine } from 'rn-placeholder';
import DarkFade from 'common/skeleton/DarkFade';
import { folderSpacingStyle } from './BookmarksFolder';

const BookmarksFolderSkeleton = () => (
  <Placeholder Animation={DarkFade}>
    <View style={folderSpacingStyle}>
      <PlaceholderLine height={55} noMargin />
    </View>
  </Placeholder>
);

BookmarksFolderSkeleton.propTypes = {};
BookmarksFolderSkeleton.defaultProps = {};

export default BookmarksFolderSkeleton;
