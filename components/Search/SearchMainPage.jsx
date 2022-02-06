import React, { useEffect, useState } from 'react';
import Page from 'common/Page/Page';

import { useFormik } from 'formik';
import * as yup from 'yup';
import { useLocalization } from 'localization';
import { search } from 'validation';
import localStorageKeys from 'localStorageKeys';
import AsyncStorage from '@react-native-async-storage/async-storage';
import SearchHeader from './SearchHeader';
import SearchContext from './SearchContext';
import SearchNavTab from './SearchNavTab';

const SearchMainPage = () => {
  const { t } = useLocalization();

  const [showHistory, setShowHistory] = useState(true);
  const [historyItems, setHistoryItems] = useState([]);

  const formik = useFormik({
    initialValues: {
      searchText: '',
    },
    onSubmit: (searchObject) => {
      setShowHistory(false);
      addSearchToHistory(searchObject.searchText);
    },
    validationSchema: yup.object().shape({
      searchText: search(t),
    }),
  });

  useEffect(() => {
    if (formik.values.searchText.length === 0) {
      setShowHistory(true);
    }
  }, [formik.values.searchText]);

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
    <Page>
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
          isFilterVisible={
            formik.values.searchText?.length !== 0 || showHistory
          }
        />
        {!showHistory && <SearchNavTab searchText={formik.values.searchText} />}
      </SearchContext.Provider>
    </Page>
  );
};

SearchMainPage.propTypes = {};
SearchMainPage.defaultProps = {};

export default SearchMainPage;
