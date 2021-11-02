import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';
import { Icon, MaterialTypeIconsMap } from 'common/Icon';
import { Colors } from 'styles';
import EduText from 'common/EduText';

function PostContentMaterial({
  materialType,
  materialContentName,
  materialCount,
  notClickable,
  onPress,
}) {
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={onPress}
      disabled={notClickable}
    >
      <EduText style={styles.textContent}>{materialContentName}</EduText>
      <View style={styles.icon}>
        <EduText>{materialCount}x </EduText>
        <Icon name={MaterialTypeIconsMap[materialType]} />
      </View>
    </TouchableOpacity>
  );
}

export default PostContentMaterial;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',

    paddingHorizontal: 7,
    paddingVertical: 3,

    marginVertical: 5,

    backgroundColor: Colors.materialBackground,

    borderWidth: 1,
    borderColor: Colors.black,
    borderRadius: 5,
  },
  icon: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  textContent: {
    flex: 1,
    flexWrap: 'wrap',
  },
});

PostContentMaterial.propTypes = {
  materialContentName: PropTypes.string.isRequired,
  materialType: PropTypes.string.isRequired,
  materialCount: PropTypes.number.isRequired,
  notClickable: PropTypes.bool.isRequired,
  onPress: PropTypes.func.isRequired,
};
