import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, Text, View, ViewPropTypes } from 'react-native';

import { Colors, Typography } from 'styles';
import { LocalizationContext } from 'localization';

const TitleText = ({ title, subtitle, showSubtitle, error, style }) => {
  const { isRTL } = useContext(LocalizationContext);
  return (
    <View style={[styles.titleRow, isRTL && styles.titleRowRTL, style]}>
      <Text style={[Typography.userInput.title, error && styles.errorText]}>
        {title}
      </Text>
      <Text style={[styles.subtitle, error && styles.errorText]}>
        {showSubtitle && subtitle}
      </Text>
    </View>
  );
};

TitleText.propTypes = {
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string,
  showSubtitle: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
  error: PropTypes.bool,
  style: ViewPropTypes.style,
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
    alignItems: 'flex-end',
    flexWrap: 'wrap',
    marginBottom: 7,
  },
  titleRowRTL: {
    flexDirection: 'row-reverse',
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
