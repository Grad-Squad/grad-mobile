import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet } from 'react-native';
import { stylePropType } from 'proptypes';
import { TextInput } from 'react-native-paper';
import TextInputFormikHOC from './TextInputFormikHOC';
import { errorSubtitleRender } from './textInputUtil';

const TransparentTextInput = ({
  text,
  setText,
  title,
  subtitle,
  style,
  error,
  errorMsg,
  TextInputProps,
  ...props
}) => (
  <TextInput
    value={text}
    onChangeText={setText}
    label={`${title} ${errorSubtitleRender(error, errorMsg, subtitle)}`}
    style={[styles.textInput, style]}
    error={error}
    dense
    {...TextInputProps}
    {...props}
  />
);

TransparentTextInput.propTypes = {
  text: PropTypes.string.isRequired,
  setText: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string,
  style: stylePropType,
  error: PropTypes.bool,
  errorMsg: PropTypes.string,
};
TransparentTextInput.defaultProps = {
  subtitle: '',
  style: {},
  error: false,
  errorMsg: '',
};

export default TransparentTextInput;

const styles = StyleSheet.create({
  textInput: {
    fontSize: 20,
    backgroundColor: 'transparent',
  },
});

export const TransparentTextInputFormik =
  TextInputFormikHOC(TransparentTextInput);
