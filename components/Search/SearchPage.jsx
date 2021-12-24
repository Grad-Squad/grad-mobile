import React, { useState } from 'react';
import Page from 'common/Page/Page';

import { useFormik } from 'formik';
import * as yup from 'yup';
import { useLocalization } from 'localization';
import { search } from 'validation';
import SearchHeader from './SearchHeader';
import SearchHistoryList from './SearchHistoryList';

const testHistoryData = [
  {text: 'phusics', id: 'itemName1+time1'},
  {text: 'phusics', id: 'itemName2+time2'},
  {text: 'physics', id: 'itemName3+time3' },
  {text: 'math', id: 'itemName4+time4' },
  {text: 'Maths', id: 'itemName5+time5' },
  {text: 'Maths', id: 'itemName6+time6' },
  {text: 'Chemistry', id: 'itemName7+time7' },
]

const SearchPage = () =>
{
  const { t } = useLocalization();

  const [items, setItems] = useState(testHistoryData) // todo fetch search history form local storage
  const [isHistoryOpen, setIsHistoryOpen] = useState(true);

  const onHandleSubmit = (txt) => {
    console.log("🚀 ~ file: SearchPage.jsx ~ line 18 ~ onHandleSubmit ~ txt", txt)
    setIsHistoryOpen(false)
  }

  const formik = useFormik({
    initialValues: {
      searchText: "",
    },
    onSubmit: (searchObject) => {
      onHandleSubmit(searchObject.searchText)
    },
    validationSchema: yup.object().shape({
      role: search(t),
    }),
  });

  return(
  <Page>
    <SearchHeader formik={formik} setIsHistoryOpen={setIsHistoryOpen}/>
    {
      isHistoryOpen?
      <SearchHistoryList setText={(txt) => {formik.setFieldValue('searchText',txt); onHandleSubmit(txt)}} items={items} setItems={setItems}/>
      :
      <></>
    }
  </Page>
)};

SearchPage.propTypes = {};
SearchPage.defaultProps = {};

export default SearchPage;
