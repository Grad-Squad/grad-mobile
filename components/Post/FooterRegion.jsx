import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

import PropTypes from 'prop-types';

import { Icon } from 'react-native-elements';
import Votes from '../Votes/Votes';
import Comments from '../Comments/Comments';
import { HIT_SLOP_OBJECT } from '../../constants';

const styles = StyleSheet.create({
  outerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 50,
    paddingTop: 10,
    paddingHorizontal: 10,
    borderRadius: 7,
    backgroundColor: '#e9e9e9',
    zIndex: -1,
    top: -10,
    // borderWidth: 0.1,
    borderColor: 'rgba(0 ,0 , 0,0.5)',
    shadowOpacity: 0.25,
    shadowColor: '#000000',
    shadowRadius: 7,
    shadowOffset: {
      width: 1,
      height: 2,
    },
    elevation: 1,
  },
  VotesContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  BookmarkContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  OptionsContainer: {
    alignItems: 'center',
  },
  arrow: {
    padding: 2,
  },
  button: {
    flexDirection: 'row',
  },
});

const onPress = () => console.log('Hi');

function FooterRegion({ votes, commentsCount }) {
  const [isSaved, setIsSaved] = useState(false);
  const savePostHandler = () => {
    if (!isSaved) {
      // do stuff
    } else {
      // do other stuff
    }
    setIsSaved(!isSaved);
  };

  return (
    <View style={styles.outerContainer}>
      <Votes votes={votes} />
      <Comments count={commentsCount} />
      <View>
        <TouchableOpacity
          style={styles.button}
          onPress={savePostHandler}
          hitSlop={HIT_SLOP_OBJECT}
        >
          <View style={styles.BookmarkContainer}>
            {isSaved ? (
              <>
                <Icon name="bookmark" type="material-community" />
                <Text>saved</Text>
              </>
            ) : (
              <>
                <Icon name="bookmark" type="feather" />
                <Text>save</Text>
              </>
            )}
          </View>
        </TouchableOpacity>
      </View>
      <View style={styles.OptionsContainer}>
        <TouchableOpacity
          style={styles.button}
          onPress={onPress}
          hitSlop={HIT_SLOP_OBJECT}
        >
          <Icon name="options" type="simple-line-icon" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default FooterRegion;

FooterRegion.propTypes = {
  votes: PropTypes.number.isRequired,
  commentsCount: PropTypes.number.isRequired,
};
