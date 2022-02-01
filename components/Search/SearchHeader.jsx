import React, { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Keyboard, StyleSheet, View } from 'react-native';
import { PressableIcon } from 'common/Icon';
import { Colors, Constants, Styles } from 'styles';
import { IconNames } from 'common/Icon/Icon';
import { SearchTextInputFormik } from 'common/Input/SearchTextInput';
import SearchHistoryList from 'common/Input/SearchHistoryList';
import FillLoadingIndicator from 'common/FillLoadingIndicator';
import localStorageKeys from 'localStorageKeys';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import SearchContext from './SearchContext';
import FilterModal from './FilterModal';

const SearchHeader = ({
  historyItems,
  setHistoryItems,
  showHistory,
  setShowHistory,
  hasBackButton,
  onGoBack,
}) => {
  const { formik, isLoading } = useContext(SearchContext);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const navigation = useNavigation();

  const onPressBackButton = () => {
    if (showHistory) {
      setShowHistory(false);
      Keyboard.dismiss();
    } else if (onGoBack) {
      onGoBack();
    } else {
      navigation.goBack();
    }
  };

  const getHistoryFromStorage = () => {
    AsyncStorage.getItem(localStorageKeys.search_history)
      .then((stringified) => {
        const parsed = JSON.parse(stringified);
        if (!parsed || typeof parsed !== 'object') return;
        setHistoryItems(parsed);
      })
      .catch((err) => {
        console.warn('Getting Search History:', err);
      });
  };

  useEffect(() => {
    // setShowHistory(true);
    getHistoryFromStorage();
  }, []);

  return (
    <>
      <View
        style={[
          styles.wrapper,
          showHistory ? styles.wrapperOpen : styles.wrapperClosed,
        ]}
      >
        {hasBackButton && (
          <PressableIcon
            name={IconNames.arrowLeft}
            size={35}
            onPress={onPressBackButton}
          />
        )}
        <SearchTextInputFormik
          formik={formik}
          formikKey="searchText"
          onFocus={() => setShowHistory(true)}
          onBlur={() => setShowHistory(false)}
        />
        <PressableIcon
          name={IconNames.filter}
          onPress={() => setIsModalVisible(true)}
        />
      </View>
      {showHistory && (
        <SearchHistoryList
          items={historyItems}
          setItems={setHistoryItems}
          setText={(txt) => {
            formik.setFieldValue('searchText', txt);
            formik.submitForm();
          }}
        />
      )}
      {isLoading && <FillLoadingIndicator />}
      <FilterModal
        setIsModalVisible={setIsModalVisible}
        isModalVisible={isModalVisible}
      />
    </>
  );
};

SearchHeader.propTypes = {
  historyItems: PropTypes.arrayOf(
    PropTypes.shape({
      text: PropTypes.string.isRequired,
    })
  ).isRequired,
  setHistoryItems: PropTypes.func.isRequired,
  showHistory: PropTypes.bool.isRequired,
  setShowHistory: PropTypes.func.isRequired,
  hasBackButton: PropTypes.bool,
  onGoBack: PropTypes.func,
};
SearchHeader.defaultProps = {
  hasBackButton: false,
  onGoBack: () => {},
};

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
  containerStyle: {},
});
