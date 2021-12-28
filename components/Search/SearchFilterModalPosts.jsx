import React from 'react';
import PropTypes from 'prop-types';
import { FlatList, StyleSheet, View } from 'react-native';
import { Modal, Portal } from 'react-native-paper';
import EduText from 'common/EduText';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { useLocalization } from 'localization';
import Navigator from 'navigation/Navigator';
import ScreenNames from 'navigation/ScreenNames';
import SearchFilterCategory from './SearchFilterCategory';
import SearchFilterModalPeople from './SearchFilterModalPeople';

/* <FlatList
                data={filteredItems}
                keyExtractor={(item) => item.title}
                renderItem={({title, searchable, icon, values}) =>{
                    const onSetCallback = (newValue) => {
                        formik.setFieldValue()
                    }
                    return(
                        <View>
                            <SearchFilterCategory searchable={searchable}/>
                        </View>
                    )}
            }
            /> */

const screens = [
    {
        name: ScreenNames.SearchFilter.MAIN,
        component: SearchFilterModalPeople,
    },
    {
        name: ScreenNames.SearchFilter.POSTS,
        component: SearchFilterModalPeople,
    },
    {
        name: ScreenNames.SearchFilter.PEOPLE,
        component: SearchFilterModalPeople,
    },
    ];

const SearchFilterModalPosts = ({
  isVisible,
  setIsVisible,
}) => {
  const { t } = useLocalization();

  const formik = useFormik({
    initialValues: {
        Posts:[],
        People:[]
    },
    onSubmit: (data) => {
        console.log("🚀 ~ file: SearchFilterModal.jsx ~ line 28 ~ data", data)
    },
  });

  const dismiss = () => {
    setIsVisible(false);
  };

  return (
    <Portal>
      <Modal visible={isVisible} onDismiss={dismiss}>
        <View style={styles.container}>
            <Navigator screens={screens} />
        </View>
      </Modal>
    </Portal>
  );
};

SearchFilterModalPosts.propTypes = {
  isVisible: PropTypes.bool.isRequired,
  setIsVisible: PropTypes.func.isRequired,
};
SearchFilterModalPosts.defaultProps = {};

export default SearchFilterModalPosts;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});
