// eslint-disable-next-line import/no-extraneous-dependencies
import { useNavigation } from '@react-navigation/core';
import ScreenNames from 'navigation/ScreenNames';
import React from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import PropTypes from 'prop-types';
import { materialsPropType } from 'proptypes';
import { MaterialTypes } from 'constants';
import { useDispatch } from 'react-redux';
import { setOpenMaterialData } from 'globalStore/materialNavSlice';
import { Divider } from 'react-native-paper';
import PostContentMaterial from './PostContentMaterial';

const backendMaterialTypeToFrontendMap = {
  flashcard: MaterialTypes.Flashcards,
  mcq: MaterialTypes.MCQ,
};
const backendUriTypeToFrontendMap = {
  pdf: MaterialTypes.PDF,
  image: MaterialTypes.Images,
  video: MaterialTypes.Video,
};
const MaterialTypeRouteMap = {
  [MaterialTypes.Flashcards]: ScreenNames.SOLVE_FLASHCARD,
  [MaterialTypes.MCQ]: ScreenNames.SOLVE_MCQ,
  [MaterialTypes.PDF]: ScreenNames.VIEW_PDF,
  [MaterialTypes.Images]: ScreenNames.VIEW_IMAGES,
  [MaterialTypes.Video]: ScreenNames.VIEW_VIDEO,
};

const getMaterialType = (material) => {
  const materialType = backendMaterialTypeToFrontendMap[material.materialType];
  return materialType ?? backendUriTypeToFrontendMap[material.uris[0].type];
};
const getMaterialCount = (material, materialType) => {
  switch (materialType) {
    case MaterialTypes.Flashcards:
      return material.flashcards.length;
    case MaterialTypes.MCQ:
      return material.mcqs.length;
    default:
      return material.uris.length;
  }
};

const getMaterialData = (material, materialType) => {
  switch (materialType) {
    case MaterialTypes.Flashcards:
      return material.flashcards;
    case MaterialTypes.MCQ:
      return material.mcqs.map(
        ({ id, question, questionImage, choices, answerIndices }) => ({
          id,
          title: question,
          questionImage: questionImage?.uri,
          options: choices,
          answerIndices,
        })
      );
    default:
      return material.uris;
  }
};

function PostContentList({ notClickable, materials }) {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  return (
    <View style={styles.container}>
      <FlatList
        data={materials}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => {
          const materialType = getMaterialType(item);
          return (
            <PostContentMaterial
              materialType={materialType}
              materialContentName={item.title}
              materialCount={getMaterialCount(item, materialType)}
              notClickable={notClickable}
              onPress={() => {
                dispatch(
                  setOpenMaterialData({
                    title: item.title,
                    data: getMaterialData(item, materialType),
                  })
                );
                return navigation.navigate(MaterialTypeRouteMap[materialType]);
              }}
            />
          );
        }}
        ItemSeparatorComponent={Divider}
      />
    </View>
  );
}

export default PostContentList;

const styles = StyleSheet.create({
  container: {
    paddingBottom: 5,
    paddingTop: 10,
  },
});

PostContentList.propTypes = {
  notClickable: PropTypes.bool,
  materials: materialsPropType.isRequired,
};
PostContentList.defaultProps = {
  notClickable: false,
};
