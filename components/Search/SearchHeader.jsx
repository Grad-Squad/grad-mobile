import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, View } from 'react-native';
import { PressableIcon } from 'common/Icon';
import { Colors, Constants, Styles } from 'styles';
import { IconNames } from 'common/Icon/Icon';
import { SearchTextInputFormik } from 'common/Input/SearchTextInput';

const SearchHeader = ({formik, isHistoryOpen, setIsHistoryOpen}) => {

  const onPressBackButton = () => {}

  return(
  <View style={[styles.wrapper, isHistoryOpen? styles.wrapperOpen : styles.wrapperClosed]}>
    <PressableIcon name={IconNames.arrowLeft} size={35} onPress={onPressBackButton}/>
    <SearchTextInputFormik formik={formik} formikKey="searchText" onFocus={()=> setIsHistoryOpen(true)}/>
  </View>
)};

SearchHeader.propTypes = {
  formik: PropTypes.shape({
    // eslint-disable-next-line react/forbid-prop-types
    values: PropTypes.object.isRequired,
    // eslint-disable-next-line react/forbid-prop-types
    errors: PropTypes.object.isRequired,
    // eslint-disable-next-line react/forbid-prop-types
    touched: PropTypes.object.isRequired,
    handleChange: PropTypes.func.isRequired,
    handleBlur: PropTypes.func.isRequired,
    handleSubmit: PropTypes.func.isRequired,
  }).isRequired,
  setIsHistoryOpen: PropTypes.func.isRequired,
};
SearchHeader.defaultProps = {};

export default SearchHeader;

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: Colors.foreground,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    paddingHorizontal: 23,
    paddingBottom: 7,
    paddingTop: 3 + Constants.fromScreenStartPadding,

    borderColor: Colors.border,
    borderRadius: Constants.borderRadius,
  },
  wrapperOpen: {
    ...Styles.dropShadow,
    borderBottomWidth: 0.2,
  },
  wrapperClosed: {
    borderBottomWidth: 0,
  },
});
