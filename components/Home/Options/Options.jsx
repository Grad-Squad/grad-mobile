import React from 'react';
import { StyleSheet } from 'react-native';
import Page from 'common/Page/Page';
import { IconNames } from 'common/Icon/Icon';
import Separator from 'common/Separator';
// eslint-disable-next-line import/no-extraneous-dependencies
import { useNavigation } from '@react-navigation/core';
import ScreenNames from 'navigation/ScreenNames';
import { useAxios } from 'api/AxiosProvider';
import { useLocalization } from 'localization';
import OptionButton from './OptionButton';
import ProfileSection from './ProfileSection/ProfileSection';

const Options = () => {
  const navigation = useNavigation();
  const { updateAccessToken, updateRefreshToken } = useAxios();
  const { t } = useLocalization();

  return (
    <Page>
      <ProfileSection />
      <OptionButton
        label={t('Options/Change Subjects you follow')}
        onPress={() => {
          navigation.navigate(ScreenNames.Options.CHANGE_INTERESTS);
        }}
      />
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

const styles = StyleSheet.create({});
