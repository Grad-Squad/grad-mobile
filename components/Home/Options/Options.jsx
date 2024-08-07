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
      <OptionButton
        label={t('Options/People you follow')}
        onPress={() => {
          navigation.navigate(ScreenNames.FOLLOWERS, {
            profileId: null,
            peopleYouFollow: true,
          });
        }}
      />
      <OptionButton
        label={t('Options/Change Language')}
        onPress={() => {
          navigation.navigate(ScreenNames.Options.CHANGE_LANGUAGE);
        }}
        iconName={IconNames.language}
      />
      <Separator />
      <OptionButton
        label={t('Options/Logout')}
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
