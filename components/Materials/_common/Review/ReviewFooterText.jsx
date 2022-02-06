import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import { StyleSheet } from 'react-native';
import { useLocalization } from 'localization';
import EduText from 'common/EduText';
import { Constants } from 'styles';

const ReviewFooterText = ({ isPerfect, didPass }) => {
  const { t } = useLocalization();
  const footerText = useMemo(() => {
    if (isPerfect) {
      return t('McqReview/footerText/Wow! That’s perfect!');
    }
    if (didPass) {
      return t(
        'McqReview/footerText/Don’t stop now, Keep going until you do it perfectly!!'
      );
    }
    return t('McqReview/footerText/Take a deep breath and start again.');
  }, [isPerfect, didPass]);
  return <EduText style={styles.footerText}>{footerText}</EduText>;
};

ReviewFooterText.propTypes = {
  isPerfect: PropTypes.bool.isRequired,
  didPass: PropTypes.bool.isRequired,
};
ReviewFooterText.defaultProps = {};

export default React.memo(ReviewFooterText);

const styles = StyleSheet.create({
  footerText: {
    marginBottom: Constants.commonMargin / 2,
    fontSize: 20,
    textAlign: 'center',
  },
});
