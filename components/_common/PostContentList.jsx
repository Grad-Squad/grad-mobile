import React from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import PostContentMaterial from './PostContentMaterial';

const data = [
    {key:'0',materialContentName:"Unit 4: Lesson 1", materialType:'Flashcard',materialCount:40},
    {key:'1',materialContentName:"Unit 4: Lesson 1 Ex", materialType:'MCQ',materialCount:15},
    {key:'2',materialContentName:"Lorem ipsum dolor sit amet, consectetur adipiscing elit ut aliquam, purus sit amet luctus venenatis.", materialType:'PDF',materialCount:1},
    {key:'3',materialContentName:"Unit 4: Lesson 2 Ex", materialType:'MCQ',materialCount:20},
    {key:'4',materialContentName:"Explanation Video", materialType:'Video',materialCount:1},
  ]

function PostContentList() {
  return (
    <View style={styles.container}>
      <FlatList
      data={data}
      renderItem={({item}) => <PostContentMaterial materialType={item.materialType} materialContentName={item.materialContentName} materialCount={item.materialCount}/>}
      />
    </View>
  );
}

export default PostContentList;

const styles = StyleSheet.create({
  container:{
    width:"100%",
    paddingVertical:5,
  },
});