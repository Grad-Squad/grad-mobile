import React from 'react';
import { StyleSheet, View, Image } from 'react-native';
import EduText from 'common/EduText';
import Page from 'common/Page/Page';
import { IconNames } from 'common/Icon/Icon';
import { AssetsConstants } from 'constants';
import { Colors, Constants } from 'styles';
import Separator from 'common/Separator';
// eslint-disable-next-line import/no-extraneous-dependencies
import { useNavigation } from '@react-navigation/core';
import ScreenNames from 'navigation/ScreenNames';
import { useAxios } from 'api/AxiosProvider';
import OptionButton from './OptionButton';

const Options = () => {
  const navigation = useNavigation();
  const { updateAccessToken, updateRefreshToken } = useAxios();
  return (
    <Page>
      <View style={styles.userSection}>
        <Image
          style={styles.profilePic}
          source={AssetsConstants.images.defaultProfile}
        />
        <View style={styles.profileInfoSection}>
          <EduText style={styles.profileName}>Profile Name</EduText>
          <EduText style={styles.profileRole}>Role</EduText>
        </View>
      </View>
      <OptionButton label="Option Name 1" onPress={() => {}} />
      <OptionButton label="Option Name 2" onPress={() => {}} />
      <OptionButton label="Option Name 3" onPress={() => {}} />
      <OptionButton label="Option Name 4" onPress={() => {}} />
      <Separator />
      <OptionButton label="Option Name 5" onPress={() => {}} />
      <OptionButton
        label="Logout"
        iconName={IconNames.logout}
        onPress={() => {
          // todo logout instead then redirect to login
          updateAccessToken('');
          updateRefreshToken('');
          navigation.reset({
            index: 0,
            routes: [{ name: ScreenNames.LOGIN }],
          });
        }}
      />
    </Page>
  );
};

Options.propTypes = {};
Options.defaultProps = {};

export default Options;

const styles = StyleSheet.create({
  userSection: {
    backgroundColor: Colors.foreground,
    paddingHorizontal: 10,
    paddingTop: Constants.fromScreenStartPadding + 10,
    paddingBottom: 15,

    flexDirection: 'row',
    alignItems: 'flex-end',

    borderColor: Colors.border,
    borderBottomWidth: 0.2,
  },
  profilePic: {
    width: 80,
    height: 80,

    borderRadius: 80,
  },
  profileName: {
    fontSize: 28,
  },
  profileRole: {
    fontSize: 16,
    fontFamily: 'Lato_300Light',
  },
  profileInfoSection: {
    marginLeft: 15,
  },
});
