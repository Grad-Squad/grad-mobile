import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import { FlatList, LayoutAnimation, StyleSheet, View } from 'react-native';
import { Colors, Styles } from 'styles';
import { useLocalization } from 'localization';
import EduText from 'common/EduText';
import { MaterialTypes } from 'constants';
// eslint-disable-next-line import/no-extraneous-dependencies
import { useNavigation } from '@react-navigation/core';
import ScreenNames from 'navigation/ScreenNames';
import { MaterialItemWithCheckBox } from './MaterialItem';

const flatListRenderItem = ({
  item: {
    title,
    amount,
    type,
    onPress,
    onLongPress,
    isSelected,
    isSelectionEnabled,
  },
}) => (
  <MaterialItemWithCheckBox
    title={title}
    amount={amount}
    type={type}
    onPress={onPress}
    onLongPress={onLongPress || null}
    isSelected={isSelected}
    isSelectionEnabled={isSelectionEnabled}
  />
);
const MaterialTypeRouteMap = {
  [MaterialTypes.Flashcards]: ScreenNames.ADD_FLASHCARDS,
  [MaterialTypes.MCQ]: ScreenNames.ADD_MCQ,
  [MaterialTypes.PDF]: ScreenNames.ADD_PDF,
  [MaterialTypes.Images]: ScreenNames.ADD_IMAGES,
  [MaterialTypes.Video]: ScreenNames.ADD_VIDEO,
};

const MaterialList = ({
  materials,
  errorMsg,
  selectedMaterials,
  setSelectedMaterials,
}) => {
  const toggleSelectionIndex = (index) =>
    setSelectedMaterials((prev) => {
      const indexInState = prev.indexOf(index);
      if (indexInState === -1) {
        return [...prev, index];
      }
      return prev.filter((ind) => ind !== index);
    });
  const navigation = useNavigation();
  const { t } = useLocalization();
  const formattedMaterials = useMemo(
    () =>
      materials.map(({ id, type, title, amount }, index) => ({
        id: id || title + type + index.toString(),
        type,
        title,
        amount,
        onPress: () =>
          navigation.navigate(MaterialTypeRouteMap[type], { index }),
        onLongPress: () => {
          LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
          toggleSelectionIndex(index);
        },
        isSelected: selectedMaterials.includes(index),
        isSelectionEnabled: selectedMaterials.length !== 0,
      })),
    [materials, selectedMaterials]
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
  selectedMaterials: PropTypes.arrayOf(PropTypes.number.isRequired).isRequired,
  setSelectedMaterials: PropTypes.func.isRequired,
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
