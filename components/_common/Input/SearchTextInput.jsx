import React from 'react';
import { StyleSheet } from 'react-native';
import PropTypes from 'prop-types';

import { Colors, Constants, Fonts, Styles } from 'styles';
import { stylePropType } from 'proptypes';
import { Searchbar } from 'react-native-paper';
import { useLocalization } from 'localization';
import TextInputFormikHOC from './TextInputFormikHOC';

const SearchTextInput = ({
  text,
  setText,
  defaultValue,
  TextInputProps,
  style,
  ...props
}) => {
  const { t } = useLocalization();

  return (
    <>
      <Searchbar
        value={text}
        onChangeText={(changedText) => setText(changedText)}
        defaultValue={defaultValue}
        placeholder={t('DropDown/Search...')}
        style={[styles.searchText, style]}
        // eslint-disable-next-line react/jsx-props-no-spreading
        {...TextInputProps}
        // eslint-disable-next-line react/jsx-props-no-spreading
        {...props}
      />
    </>
  );
};

export default SearchTextInput;

const styles = StyleSheet.create({
  searchText: {
    ...Styles.textInput,
    marginHorizontal: 12,
    borderRadius: Constants.borderRadius,
    backgroundColor: Colors.background,
    fontFamily: Fonts.default,
    flex: 1,
    height: '70%',
  },
});

SearchTextInput.propTypes = {
  text: PropTypes.string.isRequired,
  setText: PropTypes.func.isRequired,
  defaultValue: PropTypes.string,
  // eslint-disable-next-line react/forbid-prop-types
  TextInputProps: PropTypes.object, // ? TextInputProps interface from react-native
  style: stylePropType,
};

SearchTextInput.defaultProps = {
  defaultValue: '',
  TextInputProps: {},
  style: {},
};

export const SearchTextInputFormik = TextInputFormikHOC(SearchTextInput);
