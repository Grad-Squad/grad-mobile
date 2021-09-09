import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, Text, View, ViewPropTypes } from 'react-native';

import { Colors, Typography } from 'styles';
import { LocalizationContext } from 'localization';

const TitleText = ({ title, subtitle, showSubtitle, error, style }) => {
  const { isRTL } = useContext(LocalizationContext);
  return (
    <View
      style={[
        styles.titleRow,
        isRTL && styles.titleRowRTL,
        subtitle.indexOf('\n') !== -1 && styles.titleCol,
        style,
      ]}
    >
      <Text style={[Typography.userInput.title, error && styles.errorText]}>
        {title}
      </Text>
      {showSubtitle && (
        <Text style={[styles.subtitle, error && styles.errorText]}>
          {subtitle}
        </Text>
      )}
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
    flexWrap: 'wrap',
    marginBottom: 7,
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
