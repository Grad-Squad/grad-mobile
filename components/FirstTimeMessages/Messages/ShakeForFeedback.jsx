import React from 'react';
import { StyleSheet, View } from 'react-native';
import EduText from 'common/EduText';
import { useLocalization } from 'localization';
import ResponsiveImage from 'common/ResponsiveImage';
import { Styles } from 'styles';

const ShakeForFeedback = () => {
  const { t } = useLocalization();
  return (
    <View>
      <View style={styles.topImageContainer}>
        <View style={styles.topImageRoundedCorner}>
          <ResponsiveImage
            imageURI="https://c.tenor.com/zON793rXmCMAAAAd/space-hamster-thebluehamham.gif"
            canMaximize={false}
            maxWidthRatio={0.52}
            style={styles.topImage}
          />
        </View>
      </View>
      <View style={styles.topImageGap} />
      <EduText style={styles.title}>
        {t('FirstTimeMessages/ShakeForFeedback/Let us hear from you')}
      </EduText>
      <EduText style={styles.subText}>
        {t(
          'FirstTimeMessages/ShakeForFeedback/At any time, You can shake your phone to send us feedback, whether it’s a bug you found, a suggestion you have, or you just wanna say something.'
        )}
      </EduText>
      <EduText style={styles.subText}>
        {t(
          'FirstTimeMessages/ShakeForFeedback/Whatever you want to say. We want to hear it.'
        )}
      </EduText>
    </View>
  );
};

ShakeForFeedback.propTypes = {};
ShakeForFeedback.defaultProps = {};

export default React.memo(ShakeForFeedback);

const styles = StyleSheet.create({
  topImageContainer: {
    position: 'absolute',
    top: '-50%',
    left: 0,
    alignItems: 'center',
    width: '100%',
  },
  topImageRoundedCorner: {
    borderRadius: 20,
    overflow: 'hidden',
    ...Styles.dropShadow,
  },
  topImage: {
    marginBottom: 0,
  },
  topImageGap: {
    marginTop: 80,
  },
  title: {
    fontFamily: 'Poppins_400Regular',
    fontSize: 31,
    textAlign: 'center',
  },
  subText: {
    fontSize: 16,
    marginBottom: 20,
    textAlign: 'justify',
  },
});
