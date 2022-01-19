import React, { useState } from 'react';
import Page from 'common/Page/Page';

import { useFormik } from 'formik';
import * as yup from 'yup';
import { useLocalization } from 'localization';
import { search } from 'validation';
import { useAPIGetSearchResult } from 'api/endpoints/search';
import localStorageKeys from 'localStorageKeys';
import AsyncStorage from '@react-native-async-storage/async-storage';
import SearchHeader from './SearchHeader';
import SearchContext from './SearchContext';



const SearchMainPage = () =>
{
  const { t } = useLocalization();

  const [fetchEnabled, setFetchEnabled] = useState(false)

  const [showHistory, setShowHistory] = useState(false)
  const [historyItems, setHistoryItems] = useState([])

  const formik = useFormik({
    initialValues: {
      searchText: "",
    },
    onSubmit: (searchObject) => {
      setShowHistory(false)
      addSearchToHistory(searchObject.searchText)
      setFetchEnabled(true);
    },
    validationSchema: yup.object().shape({
      searchText: search(t),
    }),
  });

  const {
    data: fetchedSearchData,
    isFetching: isFetchingSearchData,
    refetch: refetchSearch,
    isSuccess: isSearchSuccess,
  } = useAPIGetSearchResult(formik.values.searchText, {
    enabled: fetchEnabled,
    onError: (error) => {
      console.log(error);
      setFetchEnabled(false);
    },
    onSuccess: (data) => {
      setFetchEnabled(false)
    },
  });

  const addSearchToHistory = (text) => {
    const alreadyExists = historyItems.some(element => element.text.toLowerCase() === text.toLowerCase())
    let newItems = [{text},...historyItems]
    if(!alreadyExists){
      setHistoryItems(newItems)
      const stringified = JSON.stringify(newItems)
        AsyncStorage.setItem(localStorageKeys.search_history, stringified)
        .catch(err => {
          // todo handle error
          console.warn("Saving Search History: ",err);
        });
    }
  }

  return(
  <Page>
    <SearchContext.Provider value={{formik,isLoading: isFetchingSearchData,fetchedSearchData}}>
      <SearchHeader
        historyItems={historyItems}
        setHistoryItems={setHistoryItems}
        showHistory={showHistory}
        setShowHistory={setShowHistory}
      />
    </SearchContext.Provider>
  </Page>
)};

SearchMainPage.propTypes = {};
SearchMainPage.defaultProps = {};

export default SearchMainPage;
