import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, View } from 'react-native';
import {
  CodeField,
  Cursor,
  useClearByFocusCell,
} from 'react-native-confirmation-code-field';
import { Styles } from 'styles';
import { stylePropType } from 'proptypes';
import EduText from 'common/EduText';
import { useLocalization } from 'localization';

/* eslint-disable react/jsx-props-no-spreading */
const CodeTextInput = ({
  cellCount,
  value,
  setValue,
  onFinish,
  style,
  error,
}) => {
  const [props, getCellOnLayoutHandler] = useClearByFocusCell({
    value,
    setValue,
  });

  const { isRTL } = useLocalization();
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
        rootStyle={[styles.codeFiledRoot, isRTL && styles.invertDirection]}
        keyboardType="number-pad"
        textContentType="oneTimeCode"
        onSubmitEditing={onFinish}
        renderCell={({ index, symbol, isFocused }) => (
          <EduText
            key={index}
            style={[styles.cell, error && Styles.textInputError]}
            onLayout={getCellOnLayoutHandler(index)}
          >
            {symbol || (isFocused && <Cursor />)}
          </EduText>
        )}
      />
    </View>
  );
};

CodeTextInput.propTypes = {
  cellCount: PropTypes.number.isRequired,
  value: PropTypes.string.isRequired,
  setValue: PropTypes.func.isRequired,
  style: stylePropType,
  onFinish: PropTypes.func.isRequired,
  error: PropTypes.bool,
};
CodeTextInput.defaultProps = {
  style: {},
  error: false,
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
    fontSize: 24,
    textAlign: 'center',
  },
  invertDirection: {
    flexDirection: 'row-reverse',
  },
});
