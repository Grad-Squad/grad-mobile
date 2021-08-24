import React, { useContext } from 'react';
import {
  StyleSheet,
  Text,
  TextInput as TextInputNative,
  View,
  ViewPropTypes,
} from 'react-native';
import PropTypes from 'prop-types';

import { Colors, Fonts, Styles } from '../../../styles';
import { LocalizationContext } from '../../../localization/LocalizationProvider';

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
}) => {
  const { isRTL } = useContext(LocalizationContext);
  return (
    <View style={[styles.wrapper, style]}>
      <View style={[styles.titleRow, isRTL && styles.titleRowRTL]}>
        <Text style={[styles.title, error && styles.errorText]}>{title}</Text>
        <Text style={[styles.subtitle, error && styles.errorText]}>
          {(subtitle || error) &&
            `(${error ? errorMsg : ''}${
              subtitle && error && errorMsg ? ', ' : ''
            }${subtitle})`}
        </Text>
      </View>
      <TextInputNative
        placeholder={placeholder}
        style={[styles.textInput, error && Styles.textInputError]}
        value={text}
        onChangeText={(txt) => setText(txt)}
        defaultValue={defaultValue}
        secureTextEntry={isPassword}
        keyboardType={isEmail ? 'email-address' : 'default'}
        {...TextInputProps}
      />
    </View>
  );
};

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
  title: {
    marginLeft: 5,
    fontFamily: Fonts.titles,
    color: Colors.offBlack,
    fontSize: 20,
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
  textInput: {
    ...Styles.textInput,
    fontFamily: Fonts.default,
    paddingHorizontal: 10,
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
};
