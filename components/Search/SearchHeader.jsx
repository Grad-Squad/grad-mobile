import React, { useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, View } from 'react-native';
import { PressableIcon } from 'common/Icon';
import { Colors, Constants, Styles } from 'styles';
import { IconNames } from 'common/Icon/Icon';
import { SearchTextInputFormik } from 'common/Input/SearchTextInput';
import SearchHistoryList from 'common/Input/SearchHistoryList';
import FillLoadingIndicator from 'common/FillLoadingIndicator';
import SearchContext from './SearchContext';
import SearchNavTab from './SearchNavTab';

const SearchHeader = ({historyItems, setHistoryItems, showHistory, setShowHistory}) => {

  const {formik, isLoading} = useContext(SearchContext)

  const onPressBackButton = () => {}

  useEffect(() => {
    setShowHistory(true)
    setHistoryItems( // todo get from local storage
        [
            {text: 'phusics'},
            {text: 'physics'},
            {text: 'math'},
            {text: 'Maths'},
            {text: 'Chemistry'},
        ]
    )
  }, [])

  return(
    <>
      <View style={[styles.wrapper, showHistory? styles.wrapperOpen : styles.wrapperClosed]}>
        <PressableIcon name={IconNames.arrowLeft} size={35} onPress={onPressBackButton}/>
        <SearchTextInputFormik formik={formik} formikKey="searchText" onFocus={() => setShowHistory(true)} onBlur={() => setShowHistory(false)}/>
        <PressableIcon name={IconNames.filter} onPress={()=>{}}/>
      </View>
      {
        showHistory?
        <SearchHistoryList items={historyItems} setItems={setHistoryItems} setText={(txt) => {formik.setFieldValue("searchText",txt); formik.submitForm()}}/>
        :
        <SearchNavTab searchText={formik.values.searchText}/>

      }
      {
      isLoading && <FillLoadingIndicator/>
      }
    </>
)};

SearchHeader.propTypes = {
  historyItems: PropTypes.arrayOf(
    PropTypes.shape({
      text: PropTypes.string.isRequired,
    }),
  ).isRequired,
  setHistoryItems: PropTypes.func.isRequired,
  showHistory: PropTypes.bool.isRequired,
  setShowHistory: PropTypes.func.isRequired,
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

    maxHeight: 90,
  },
  wrapperOpen: {
    ...Styles.dropShadow,
    borderBottomWidth: 0,
  },
  wrapperClosed: {
    borderBottomWidth: 0.2,
  },
  containerStyle:{

  }
});
