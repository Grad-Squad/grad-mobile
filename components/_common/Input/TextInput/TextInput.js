import React from 'react';
import {
  StyleSheet,
  Text,
  TextInput as TextInputNative,
  View,
} from 'react-native';
import PropTypes from 'prop-types';

import { Colors, Fonts } from '../../../../styles';

const TextInput = ({
  text,
  setText,
  title,
  subtitle,
  placeholder,
  defaultValue,
  isPassword,
  isEmail,
}) => (
  <>
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
  </>
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
    fontFamily: Fonts.default,
    borderColor: Colors.border,
    borderRadius: 2,
    borderWidth: 0.1,
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
};

TextInput.defaultProps = {
  defaultValue: '',
  subtitle: '',
  placeholder: '',
  isPassword: false,
  isEmail: false,
};
