import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, View } from 'react-native';
import { Colors, Styles, Typography } from 'styles';
import { stylePropType } from 'proptypes';
import EduText from 'common/EduText';

const TitleText = ({ title, subtitle, showSubtitle, error, style }) => (
  <View
    style={[
      styles.titleRow,
      subtitle.indexOf('\n') !== -1 && styles.titleCol,
      style,
    ]}
  >
    <EduText style={[Typography.userInput.title, error && Styles.errorText]}>
      {title}
    </EduText>
    {showSubtitle && (
      <EduText style={[styles.subtitle, error && Styles.errorText]}>
        {subtitle}
      </EduText>
    )}
  </View>
);

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
});
