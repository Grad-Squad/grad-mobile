import React from 'react';
import { StyleSheet, View } from 'react-native';
import EduText from 'common/EduText';
import { useLocalization } from 'localization';
import { Colors, Constants, Styles } from 'styles';
import { useStore } from 'globalStore/GlobalStore';
import BookmarksList from 'components/Bookmarks/BookmarksList';
import NoInternetConnectionText from 'common/NoInternetConnectionText';

const Bookmarks = () => {
  const { t } = useLocalization();
  const [state] = useStore();
  return (
    <View style={styles.wrapper}>
      <View style={styles.header}>
        <EduText style={styles.headerText}>
          {t('BookmarksTab/Your Bookmarks')}
        </EduText>
      </View>
      <NoInternetConnectionText />
      <BookmarksList profileId={state.profileId} />
    </View>
  );
};

Bookmarks.propTypes = {};
Bookmarks.defaultProps = {};

export default Bookmarks;

const styles = StyleSheet.create({
  wrapper: { flex: 1 },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',

    paddingVertical: 8,
    paddingTop: 8 + Constants.fromScreenStartPadding,
    paddingHorizontal: 15,

    backgroundColor: Colors.foreground,
    ...Styles.bottomBorder,
    ...Styles.dropShadow,
  },
  headerText: {
    fontSize: 22,
    fontFamily: 'Poppins_400Regular',
  },
});
