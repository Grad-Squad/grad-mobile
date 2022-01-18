import { stylePropType, TextPropType } from 'proptypes';
import PropTypes from 'prop-types';
import React from 'react';
import { StyleSheet } from 'react-native';
import { Colors } from 'styles';
import Button from './Button';

const MainActionButton = ({
  style,
  disabled,
  textStyle,
  loading,
  ...props
}) => {
  const isButtonDisabled = disabled || loading;
  return (
    <Button
      style={[styles.button, isButtonDisabled && styles.disabledButton, style]}
      textStyle={[styles.text, textStyle]}
      disabled={isButtonDisabled}
      loading={loading}
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...props}
    />
  );
};

MainActionButton.propTypes = {
  style: stylePropType,
  textStyle: TextPropType,
  disabled: PropTypes.bool,
  loading: PropTypes.bool,
};
MainActionButton.defaultProps = {
  style: {},
  textStyle: {},
  disabled: false,
  loading: false,
};

export default MainActionButton;

const styles = StyleSheet.create({
  button: {
    backgroundColor: Colors.accent,
    borderColor: Colors.accent,
    borderWidth: 2,
  },
  text: {
    color: Colors.white,
  },

  disabledButton: {
    // opacity: 0.3,
    borderColor: '#999',
    backgroundColor: '#999',
  },
});
