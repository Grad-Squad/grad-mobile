import React from 'react';
import {
  StyleSheet,
  Text,
  TextInput as TextInputNative,
  View,
  ViewPropTypes,
} from 'react-native';
import PropTypes from 'prop-types';

import { Colors, Constants, Fonts } from '../../../../styles';

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
}) => (
  <View style={style}>
    <View style={styles.titleRow}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.subtitle}>{subtitle && `(${subtitle})`}</Text>
    </View>
    <TextInputNative
      placeholder={placeholder}
      style={styles.textInput}
      value={text}
      onChangeText={(txt) => setText(txt)}
      defaultValue={defaultValue}
      secureTextEntry={isPassword}
      keyboardType={isEmail ? 'email-address' : 'default'}
    />
  </View>
);

export default TextInput;

const styles = StyleSheet.create({
  titleRow: { flexDirection: 'row', alignItems: 'flex-end', marginBottom: 7 },
  title: {
    marginLeft: 5,
    fontFamily: Fonts.titles,
    color: Colors.offBlack,
    fontSize: 20,
  },
  subtitle: {
    fontFamily: 'Lato_300Light',
    fontSize: 16,
    marginLeft: 2,
  },
  textInput: {
    borderColor: Colors.border,
    borderRadius: Constants.borderRadius,
    borderWidth: 0.4,
    backgroundColor: Colors.white,
    fontFamily: Fonts.default,
    paddingHorizontal: 10,
    height: 45,
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
};

TextInput.defaultProps = {
  defaultValue: '',
  subtitle: '',
  placeholder: '',
  isPassword: false,
  isEmail: false,
  style: {},
};
