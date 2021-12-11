import GoBackButton from 'common/GoBackButton';
import { navigationPropType } from 'proptypes';
import React from 'react';
import { View } from 'react-native';
import {
  Fade,
  Placeholder,
  PlaceholderLine,
  PlaceholderMedia,
} from 'rn-placeholder';
import styles from './ExpandedPostContentStyles';

const ExpandedPostContentSkeleton = ({ navigation }) => {
  const animation = (props) => (
    // eslint-disable-next-line react/jsx-props-no-spreading
    <Fade {...props} style={styles.cgreyBackground} />
  );
  return (
    <>
      <View style={styles.outerContainer}>
        <GoBackButton
          onPress={() => navigation.goBack()}
          isPlaceholder
          placeholderAnimStyle={styles.cgreyBackground}
        />

        <Placeholder
          style={styles.innerContainer}
          Animation={animation}
          Left={() => (
            <View style={styles.skeletonColumn}>
              <PlaceholderMedia isRound size={50} style={styles.marginBottom} />
              <PlaceholderLine />
            </View>
          )}
        >
          <PlaceholderLine width={100} height={24} />
          <PlaceholderLine width={100} height={24} />
          <PlaceholderLine width={100} height={24} />
        </Placeholder>

        <Placeholder Animation={animation}>
          <PlaceholderLine width={20} style={styles.extraInfo} />
          <PlaceholderLine width={20} style={styles.extraInfo} />
        </Placeholder>
      </View>
    </>
  );
};

ExpandedPostContentSkeleton.propTypes = {
  navigation: navigationPropType.isRequired,
};

export default ExpandedPostContentSkeleton;
