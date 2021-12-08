import React from 'react';
import { View } from 'react-native';
import { Colors, Constants } from 'styles';
import {
  Fade,
  Placeholder,
  PlaceholderLine,
  PlaceholderMedia,
} from 'rn-placeholder';
import { styles } from './Comment';

const CommentSkeleton = () => (
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

CommentSkeleton.propTypes = {};

export default CommentSkeleton;
