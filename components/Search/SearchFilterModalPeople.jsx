import React from 'react';
import PropTypes from 'prop-types';
import { FlatList, StyleSheet, TouchableOpacity, View } from 'react-native';
import { Modal, Portal } from 'react-native-paper';
import EduText from 'common/EduText';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { useLocalization } from 'localization';
import {PEOPLE} from './SearchFilterModes';
import SearchFilterCategory from './SearchFilterCategory';
import { Icon } from 'common/Icon';

const SearchFilterModalPeople = ({
  isVisible,
  setIsVisible,
}) => {
  const { t } = useLocalization();

  const formik = useFormik({
    initialValues: {
        Follow_Status: "",
        Role: "",
        Sort_By: "",
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
            <FlatList
              data={PEOPLE}
              keyExtractor={(item) => item.title}
              renderItem={({title, searchable, icon, values}) =>(
                <TouchableOpacity onPress={() => {}}>
                  <View style={{flexDirection:'row'}}>
                    <Icon name={icon}/>
                    <EduText>{t(title)}</EduText>
                  </View>
                </TouchableOpacity>
              )
            }
            />
        </View>
      </Modal>
    </Portal>
  );
};

SearchFilterModalPeople.propTypes = {
  isVisible: PropTypes.bool.isRequired,
  setIsVisible: PropTypes.func.isRequired,
};
SearchFilterModalPeople.defaultProps = {};

export default SearchFilterModalPeople;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});
