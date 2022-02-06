import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { useLocalization } from 'localization';
import { search } from 'validation';
import localStorageKeys from 'localStorageKeys';
import AsyncStorage from '@react-native-async-storage/async-storage';
import SearchHeader from './SearchHeader';
import SearchContext from './SearchContext';
import SearchNavTab from './SearchNavTab';

const SearchBar = ({ isActive, setIsActive, showHistory, setShowHistory }) => {
  const { t } = useLocalization();

  const [historyItems, setHistoryItems] = useState([]);
  const onGoBack = () => {
    setIsActive(false);
    formik.resetForm();
  };

  const formik = useFormik({
    initialValues: {
      searchText: '',
    },
    onSubmit: (searchObject) => {
      setShowHistory(false);
      addSearchToHistory(searchObject.searchText);
      setIsActive(true);
    },
    validationSchema: yup.object().shape({
      searchText: search(t),
    }),
  });

  const addSearchToHistory = (text) => {
    const alreadyExists = historyItems.some(
      (element) => element.text.toLowerCase() === text.toLowerCase()
    );
    const newItems = [{ text }, ...historyItems];
    if (!alreadyExists) {
      setHistoryItems(newItems);
      const stringified = JSON.stringify(newItems);
      AsyncStorage.setItem(localStorageKeys.search_history, stringified).catch(
        (err) => {
          // todo handle error
          console.warn('Saving Search History: ', err);
        }
      );
    }
  };

  return (
    <SearchContext.Provider
      value={{
        formik,
        searchText: formik.values.searchText.split(' ').join('+'),
      }}
    >
      <SearchHeader
        historyItems={historyItems}
        setHistoryItems={setHistoryItems}
        showHistory={showHistory}
        setShowHistory={setShowHistory}
        hasBackButton={isActive || showHistory}
        onGoBack={onGoBack}
        isFilterVisible={isActive}
      />
      {isActive && !showHistory && (
        <SearchNavTab searchText={formik.values.searchText} />
      )}
    </SearchContext.Provider>
  );
};

SearchBar.propTypes = {
  isActive: PropTypes.bool.isRequired,
  setIsActive: PropTypes.func.isRequired,
  showHistory: PropTypes.bool.isRequired,
  setShowHistory: PropTypes.func.isRequired,
};
SearchBar.defaultProps = {};

export default SearchBar;
