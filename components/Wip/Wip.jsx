import React from 'react';
import { Image, StyleSheet, View } from 'react-native';
import EduText from 'common/EduText';
import { Colors } from 'styles';
import { useLocalization } from 'localization';

const Wip = () => {
  const { t } = useLocalization();
  return (
    <View style={styles.background}>
      <Image
        style={styles.wipGif}
        source={require('../../assets/gifs/WIP.gif')}
      />
      <EduText style={styles.header}>{t('WIP/WIP')}</EduText>
      <EduText style={styles.text}>
        {t(
          'WIP/We are currently working on this feature. It will be available as soon as possible.'
        )}
      </EduText>
    </View>
  );
};

Wip.propTypes = {};
Wip.defaultProps = {};

export default Wip;

const styles = StyleSheet.create({
  background: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.background,
  },
  wipGif: {},
  header: {
    fontFamily: 'Lato_700Bold',
    fontSize: 72,
    marginTop: 35,
    marginBottom: 6,
  },
  text: {
    fontSize: 18,
    width: 250,
  },
});
