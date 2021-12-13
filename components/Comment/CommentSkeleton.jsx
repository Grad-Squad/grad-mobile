import React from 'react';
import { View } from 'react-native';
import { Colors, Constants } from 'styles';
import {
  Fade,
  Placeholder,
  PlaceholderLine,
  PlaceholderMedia,
} from 'rn-placeholder';
import DarkFade from 'common/skeleton/DarkFade';
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
          <Placeholder Animation={DarkFade}>
            <PlaceholderMedia isRound style={styles.profileImage} />
          </Placeholder>
        </View>
        <View style={styles.innerContainer}>
          <View>
            <Placeholder Animation={DarkFade}>
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
