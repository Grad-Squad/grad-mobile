import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';

import PropTypes from 'prop-types';

import EduText from 'common/EduText';
import { Icon } from 'react-native-elements';
import { BOOKMARK_HIT_SLOP_OBJECT } from '../../../constants';

const styles = StyleSheet.create({
  BookmarkContainer: {
    flexDirection: 'row',
    //alignItems: 'center',
    maxWidth: 60,
    paddingLeft: 10,
  },
  button: {
    flexDirection: 'row',
  },
});

export default function Bookmark({ saved }) {
  const [isSaved, setIsSaved] = useState(saved);
  const savePostHandler = () => {
    if (!isSaved) {
      // do stuff
    } else {
      // do other stuff
    }
    setIsSaved(!isSaved);
  };

  return (
    <View style={styles.OptionsContainer}>
      <TouchableOpacity
        style={styles.button}
        onPress={savePostHandler}
        hitSlop={BOOKMARK_HIT_SLOP_OBJECT}
      >
        <View style={styles.BookmarkContainer}>
          {isSaved ? (
            <>
              <Icon name="bookmark" type="material-community" />
              <EduText>saved</EduText>
            </>
          ) : (
            <>
              <Icon name="bookmark" type="feather" />
              <EduText>save</EduText>
            </>
          )}
        </View>
      </TouchableOpacity>
    </View>
  );
}

Bookmark.propTypes = {
  saved: PropTypes.bool,
};
Bookmark.defaultProps = {
  saved: false,
};
