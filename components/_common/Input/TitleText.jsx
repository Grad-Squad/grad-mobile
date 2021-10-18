import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, View } from 'react-native';
import { Colors, Typography } from 'styles';
import { stylePropType } from 'proptypes';
import { useLocalization } from 'localization';
import EduText from 'common/EduText';

const TitleText = ({ title, subtitle, showSubtitle, error, style }) => {
  const { isRTL } = useLocalization();
  return (
    <View
      style={[
        styles.titleRow,
        isRTL && styles.titleRowRTL,
        subtitle.indexOf('\n') !== -1 && styles.titleCol,
        style,
      ]}
    >
      <EduText style={[Typography.userInput.title, error && styles.errorText]}>
        {title}
      </EduText>
      {showSubtitle && (
        <EduText style={[styles.subtitle, error && styles.errorText]}>
          {subtitle}
        </EduText>
      )}
    </View>
  );
};

TitleText.propTypes = {
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string,
  showSubtitle: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
  error: PropTypes.bool,
  style: stylePropType,
};
TitleText.defaultProps = {
  subtitle: '',
  showSubtitle: false,
  error: false,
  style: {},
};

export default React.memo(TitleText);

const styles = StyleSheet.create({
  titleRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 7,
    alignItems: 'baseline',
  },
  titleRowRTL: {
    flexDirection: 'row-reverse',
  },
  titleCol: {
    flexDirection: 'column',
    flexWrap: 'nowrap',
  },
  subtitle: {
    fontFamily: 'Lato_300Light',
    fontSize: 16,
    color: Colors.offBlack,
    marginLeft: 2,
  },
  errorText: {
    color: Colors.error,
  },
});
