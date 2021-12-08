import React from 'react';
import {
  Placeholder,
  PlaceholderLine,
  PlaceholderMedia,
  Fade,
} from 'rn-placeholder';
import { View } from 'react-native';
import { Constants } from 'styles';

const FollowerCardSkeleton = () => (
  <View
    style={{
      paddingHorizontal: Constants.commonMargin,
      marginBottom: Constants.commonMargin,
    }}
  >
    <Placeholder
      Animation={Fade}
      Left={() => (
        <PlaceholderMedia
          size={70}
          isRound
          style={{ marginRight: Constants.commonMargin / 2 }}
        />
      )}
      // Right={() => (
      //   <View style={{ justifyContent: 'center', width: '25%' }}>
      //     <PlaceholderLine height={20} noMargin />
      //   </View>
      // )}
    >
      <PlaceholderLine
        style={{ marginTop: Constants.commonMargin / 2 }}
        width={80}
      />
      <PlaceholderLine width={40} />
    </Placeholder>
  </View>
);

FollowerCardSkeleton.propTypes = {};

export default FollowerCardSkeleton;
