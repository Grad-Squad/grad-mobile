import GoBackButton from 'common/GoBackButton';
import { navigationPropType } from 'proptypes';
import React from 'react';
import { View, StyleSheet } from 'react-native';
import {
  Fade,
  Placeholder,
  PlaceholderLine,
  PlaceholderMedia,
} from 'rn-placeholder';
import { Constants } from 'styles';

const ProfileHeaderLoading = ({ navigation }) => (
  <View style={styles.container}>
    <GoBackButton
      onPress={() => {
        navigation.goBack();
      }}
      otherComponent={
        <View
          style={{
            flex: 1,
          }}
        >
          <Placeholder Animation={Fade} style={{ height: 24, width: '100%' }}>
            <PlaceholderLine width={60} height={24} />
          </Placeholder>
        </View>
      }
    />
    <Placeholder
      Animation={Fade}
      Left={() => (
        <View
          style={{
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <PlaceholderMedia isRound size={110} style={[styles.marginBottom]} />
          <PlaceholderLine style={{ alignSelf: 'center' }} />
        </View>
      )}
    >
      <View style={{ justifyContent: 'center', flex: 1 }}>
        <View
          style={{
            flexDirection: 'row',
            alignSelf: 'center',
          }}
        >
          <View style={{ flexGrow: 1, alignItems: 'center' }}>
            <PlaceholderLine width={60} />
            <PlaceholderLine width={60} />
          </View>
          <View style={{ flexGrow: 1, alignItems: 'center' }}>
            <PlaceholderLine width={60} />
            <PlaceholderLine width={60} />
          </View>
        </View>
        <View
          style={{
            height: 30,
          }}
        >
          <PlaceholderLine
            width={80}
            height={30}
            style={{
              alignSelf: 'center',
            }}
          />
        </View>
      </View>
    </Placeholder>
    <Placeholder Animation={Fade}>
      <PlaceholderLine width={100} />
      <PlaceholderLine width={100} />
      <PlaceholderLine width={100} />
    </Placeholder>
  </View>
);

ProfileHeaderLoading.propTypes = {
  navigation: navigationPropType.isRequired,
};

export default ProfileHeaderLoading;

const styles = StyleSheet.create({
  container: {
    marginHorizontal: Constants.commonMargin,
  },
  marginBottom: {
    marginBottom: Constants.commonMargin / 2,
  },
});
