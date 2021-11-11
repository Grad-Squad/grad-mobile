import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import { FlatList, StyleSheet, View } from 'react-native';
import { Colors, Styles } from 'styles';
import { useLocalization } from 'localization';
import EduText from 'common/EduText';
import { MaterialTypes } from 'constants';
// eslint-disable-next-line import/no-extraneous-dependencies
import { useNavigation } from '@react-navigation/core';
import ScreenNames from 'navigation/ScreenNames';
import MaterialItem from './MaterialItem';

const flatListRenderItem = ({ item: { title, amount, type, onPress } }) => (
  <MaterialItem title={title} amount={amount} type={type} onPress={onPress} />
);

const MaterialList = ({ materials, errorMsg }) => {
  const navigation = useNavigation();
  const { t } = useLocalization();
  const formattedMaterials = useMemo(
    () =>
      materials.map((material, index) => {
        if (material.type === MaterialTypes.PDF) {
          return {
            id: index.toString(), // ! index as id
            type: material.type,
            title: material.pdfTitle,
            // amount: material.questions.length,
            amount: 6666,
            onPress: () => navigation.navigate(ScreenNames.ADD_PDF, { index }),
          };
        }
        return {
          id: index.toString(), // ! index as id
          type: MaterialTypes.MCQ,
          title: material.title,
          amount: material.questions.length,
          onPress: () => navigation.navigate(ScreenNames.ADD_MCQ, { index }),
        };
      }),
    [materials]
  );
  return (
    <View style={styles.materialsList}>
      <EduText style={styles.materialsText}>
        {t('CreatePost/Materials:')}
      </EduText>
      {formattedMaterials.length ? (
        <>
          <FlatList
            style={[styles.content]}
            data={formattedMaterials}
            renderItem={flatListRenderItem}
            keyExtractor={(item) => item.id}
          />
        </>
      ) : (
        <EduText
          style={[styles.addMaterialUsing, errorMsg && Styles.errorText]}
        >
          {errorMsg ||
            t('CreatePost/add a material using any of the buttons below')}
        </EduText>
      )}
    </View>
  );
};

MaterialList.propTypes = {
  errorMsg: PropTypes.string,
  materials: PropTypes.arrayOf(PropTypes.object).isRequired, // :D
};
MaterialList.defaultProps = { errorMsg: '' };

export default MaterialList;

const styles = StyleSheet.create({
  materialsList: {
    width: '90%',
    alignSelf: 'center',
    flex: 1,

    marginBottom: 10,
  },
  materialsText: {
    fontSize: 18,

    color: Colors.black,

    marginVertical: 10,
  },
  content: {
    width: '95%',
    alignSelf: 'center',
    flex: 1,
  },
  addMaterialUsing: {
    fontSize: 16,

    marginLeft: 15,
  },
});
