// eslint-disable-next-line import/no-extraneous-dependencies
import { useNavigation } from '@react-navigation/core';
import { useStore } from 'globalStore/GlobalStore';
import ReducerActions from 'globalStore/ReducerActions';
import ScreenNames from 'navigation/ScreenNames';
import React from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import PropTypes from 'prop-types';
import { materialsPropType } from 'proptypes';
import { MaterialTypes } from 'constants';
import PostContentMaterial from './PostContentMaterial';

function PostContentList({ notClickable, materials }) {
  const navigation = useNavigation();
  const [, dispatch] = useStore();
  return (
    <View style={styles.container}>
      <FlatList
        data={materials}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <PostContentMaterial
            // materialType={item.materialType}
            materialType={MaterialTypes.MCQ}
            materialContentName={item.title}
            materialCount={item.mcqs.length}
            notClickable={notClickable}
            onPress={() => {
              dispatch({
                type: ReducerActions.setMCQQuestions,
                payload: item.mcqs.map(
                  ({
                    id,
                    question,
                    questionUriKey,
                    choices,
                    answerIndices,
                  }) => ({
                    id,
                    title: question,
                    imageURI: questionUriKey,
                    options: choices,
                    answerIndices,
                  })
                ),
              });
              return navigation.navigate(ScreenNames.SOLVE_MCQ);
            }}
          />
        )}
      />
    </View>
  );
}

export default PostContentList;

const styles = StyleSheet.create({
  container: {
    paddingVertical: 5,
  },
});

PostContentList.propTypes = {
  notClickable: PropTypes.bool,
  materials: materialsPropType.isRequired,
};
PostContentList.defaultProps = {
  notClickable: false,
};
