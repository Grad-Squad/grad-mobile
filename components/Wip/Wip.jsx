import React from 'react';
import { StyleSheet, View } from 'react-native';
import EduText from 'common/EduText';
import { Colors } from 'styles';
import { useLocalization } from 'localization';
import { TransparentButton } from 'common/Input/Button';
import { useNavigation } from '@react-navigation/core';
import RoundedImage from 'common/RoundedImage';

const Wip = () => {
  const { t } = useLocalization();
  const navigation = useNavigation();
  return (
    <View style={styles.background}>
      <RoundedImage
        imageURI="https://c.tenor.com/DaSh5T93TgUAAAAC/cat-typing.gif"
        canMaximize={false}
        maxWidthRatio={0.8}
      />
      <EduText style={styles.header}>{t('WIP/WIP')}</EduText>
      <EduText style={styles.text}>
        {t(
          'WIP/We are currently working on this feature. It will be available as soon as possible.'
        )}
      </EduText>

      <TransparentButton
        text={t('WIP/Go back')}
        onPress={() => navigation.goBack()}
        style={styles.goBackButton}
      />
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
  goBackButton: {
    position: 'absolute',
    bottom: 10,
    alignSelf: 'center',
  },
});
