import React from 'react';
import { View } from 'react-native';
import { Placeholder, PlaceholderLine, PlaceholderMedia } from 'rn-placeholder';
import DarkFade from 'common/skeleton/DarkFade';
import { styles } from './TitleRegion/TitleRegion';

const PostSkeleton = () => (
  <View
    style={{
      marginBottom: 30,
      width: '90%',
      alignSelf: 'center',
    }}
  >
    <View style={styles.outerContainer}>
      <View>
        <View style={[styles.imageContainer, { width: 80 }]}>
          <Placeholder Animation={DarkFade}>
            <PlaceholderMedia size={50} style={styles.profileImage} />
          </Placeholder>
        </View>
        <View style={styles.innerContainer}>
          <View style={styles.profileInfoContainer}>
            <Placeholder Animation={DarkFade}>
              <PlaceholderLine width={20} />
            </Placeholder>
          </View>
          <View style={styles.postTitle}>
            <Placeholder Animation={DarkFade}>
              <PlaceholderLine width={20} />
            </Placeholder>
          </View>
        </View>
      </View>
      <View style={styles.contentContainer}>
        <View style={styles.material}>
          <Placeholder Animation={DarkFade}>
            <PlaceholderLine height={24} />
            <PlaceholderLine height={24} />
            <PlaceholderLine height={24} />
          </Placeholder>
        </View>
      </View>
      <Placeholder Animation={DarkFade}>
        <PlaceholderLine width={20} style={styles.date} />
      </Placeholder>
    </View>
  </View>
);

PostSkeleton.propTypes = {};

export default PostSkeleton;
