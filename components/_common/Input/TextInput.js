import React from 'react';
import {
  StyleSheet,
  TextInput as TextInputNative,
  View,
  ViewPropTypes,
} from 'react-native';
import PropTypes from 'prop-types';

import TitleText from 'common/Input/TitleText';
import { Fonts, Styles } from 'styles';

const TextInput = ({
  text,
  setText,
  title,
  subtitle,
  placeholder,
  defaultValue,
  isPassword,
  isEmail,
  style,
  TextInputProps,
  error,
  errorMsg,
  multiline,
}) => (
  <View style={[styles.wrapper, style]}>
    <TitleText
      title={title}
      subtitle={`${error ? errorMsg : ''}${
        subtitle && error && errorMsg ? ', ' : ''
      }${subtitle}`}
      showSubtitle={subtitle || error}
      error={error}
    />
    <TextInputNative
      placeholder={placeholder}
      style={[
        styles.textInput,
        error && Styles.textInputError,
        multiline && styles.multilineTextInput,
      ]}
      value={text}
      onChangeText={(txt) => setText(txt)}
      defaultValue={defaultValue}
      secureTextEntry={isPassword}
      keyboardType={isEmail ? 'email-address' : 'default'}
      multiline={multiline}
      {...TextInputProps}
    />
  </View>
);

export default TextInput;

const styles = StyleSheet.create({
  wrapper: {
    width: '100%',
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    flexWrap: 'wrap',
    marginBottom: 7,
  },
  titleRowRTL: {
    flexDirection: 'row-reverse',
  },
  textInput: {
    ...Styles.textInput,
    fontFamily: Fonts.default,
    paddingHorizontal: 10,
  },
  multilineTextInput: {
    minHeight: 45,
    maxHeight: 90,
    textAlignVertical: 'top',
    paddingVertical: 10,
  },
});

TextInput.propTypes = {
  text: PropTypes.string.isRequired,
  setText: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string,
  placeholder: PropTypes.string,
  defaultValue: PropTypes.string,
  isPassword: PropTypes.bool,
  isEmail: PropTypes.bool,
  style: ViewPropTypes.style,
  TextInputProps: PropTypes.object, // ? TextInputProps interface from react-native
  error: PropTypes.bool,
  errorMsg: PropTypes.string,
  multiline: PropTypes.bool,
};

TextInput.defaultProps = {
  defaultValue: '',
  subtitle: '',
  placeholder: '',
  isPassword: false,
  isEmail: false,
  style: {},
  TextInputProps: {},
  error: false,
  errorMsg: '',
  multiline: false,
};
