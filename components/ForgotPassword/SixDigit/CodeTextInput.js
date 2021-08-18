import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, Text, View, ViewPropTypes } from 'react-native';
import {
  CodeField,
  Cursor,
  useClearByFocusCell,
} from 'react-native-confirmation-code-field';
import { Styles } from '../../../styles';

const CodeTextInput = ({ cellCount, value, setValue, onFinish, style }) => {
  const [props, getCellOnLayoutHandler] = useClearByFocusCell({
    value,
    setValue,
  });

  const updateValue = (newValue) => {
    setValue(newValue.replace(/[^0-9]/g, ''));
  };

  return (
    <View style={style}>
      <CodeField
        {...props}
        value={value}
        onChangeText={updateValue}
        cellCount={cellCount}
        rootStyle={styles.codeFiledRoot}
        keyboardType="number-pad"
        textContentType="oneTimeCode"
        onSubmitEditing={onFinish}
        renderCell={({ index, symbol, isFocused }) => (
          <Text
            key={index}
            style={[styles.cell]}
            onLayout={getCellOnLayoutHandler(index)}
          >
            {symbol || (isFocused && <Cursor />)}
          </Text>
        )}
      />
    </View>
  );
};

CodeTextInput.propTypes = {
  cellCount: PropTypes.number.isRequired,
  value: PropTypes.string.isRequired,
  setValue: PropTypes.func.isRequired,
  style: ViewPropTypes.style,
  onFinish: PropTypes.func.isRequired,
};
CodeTextInput.defaultProps = {
  style: {},
};

export default CodeTextInput;

const styles = StyleSheet.create({
  codeFiledRoot: {
    width: '100%',
    justifyContent: 'space-evenly',
  },
  cell: {
    ...Styles.textInput,
    fontFamily: 'RobotoMono_300Light',
    width: 37,
    lineHeight: 38,
    fontSize: 24,
    textAlign: 'center',
  },
});
