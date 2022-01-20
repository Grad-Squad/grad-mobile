import React from 'react';
import { StyleSheet, View } from 'react-native';
import { useLocalization } from 'localization';
import EduText from 'common/EduText';
import RoundedImage from 'common/RoundedImage';

const NoBookmarks = () => {
  const { t } = useLocalization();
  return (
    <View style={styles.wrapper}>
      <RoundedImage
        imageURI="https://c.tenor.com/LwQ4CWuGCtsAAAAC/empty-shelves-where-is-it.gif"
        canMaximize={false}
        maxWidthRatio={0.82}
      />
      <EduText style={styles.title}>
        {t("BookmarksList/Empty/You haven't bookmarked any post yet")}
      </EduText>
      <EduText style={styles.subtitle}>
        {t(
          'BookmarksList/Empty/You can bookmark posts to view them later. You can even organize them into folders and folders within folders.'
        )}
      </EduText>
    </View>
  );
};

NoBookmarks.propTypes = {};
NoBookmarks.defaultProps = {};

export default React.memo(NoBookmarks);

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  title: {
    fontFamily: 'Poppins_400Regular',
    fontSize: 28,
    textAlign: 'center',
    marginTop: 20,
  },
  subtitle: {
    fontSize: 18,
    marginBottom: 20,
    textAlign: 'center',
  },
});
