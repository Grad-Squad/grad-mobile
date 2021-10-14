import React from 'react';
import { View, StyleSheet, TouchableOpacity, Alert, Text } from 'react-native';
import PropTypes from 'prop-types';
import { Icon,MaterialTypeIconsMap } from 'common/Icon';
import EduText from './EduText';
import { Colors } from 'styles';

function PostContentMaterial({materialType, materialContentName, materialCount}) {
  
  const materialTypeMap = {
    "Flashcard":MaterialTypeIconsMap.Flashcards,
    "MCQ":MaterialTypeIconsMap.MCQ,
    "PDF":MaterialTypeIconsMap.PDF,
    "Image":MaterialTypeIconsMap.Image,
    "Video":MaterialTypeIconsMap.Video,
  }

  const materialClickHandler = () => {
    Alert.alert(`Clicked on ${materialCount} ${materialType}(s)`)
  };

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={materialClickHandler}
    >
      <EduText style={{flex:1, flexWrap:'wrap'}}>{materialContentName}</EduText>
      <View style={{flexDirection:'row',alignItems:'center'}}>
        <EduText >{materialCount}x </EduText>
        <Icon name={materialTypeMap[materialType]} />
      </View>
    </TouchableOpacity>
  );
}

export default PostContentMaterial;

const styles = StyleSheet.create({
  container:{
    width:'100%',
    flexDirection:'row',
    justifyContent:'space-between',
    alignItems:'center',
    paddingHorizontal:5,
    paddingTop:3,
    paddingBottom:3,
    marginVertical:5,
    backgroundColor:'rgba(0,0,0,0.02)',

    borderWidth:1,
    borderColor:Colors.black,
    borderRadius:5,
  },
});

PostContentMaterial.propTypes = {
  materialContentName: PropTypes.string.isRequired,
  materialType: PropTypes.string.isRequired,
  materialCount: PropTypes.number.isRequired,
};
