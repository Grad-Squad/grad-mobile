import React from 'react';
import PropTypes from 'prop-types';
import { FlatList, StyleSheet, View } from 'react-native';
import { Colors } from 'styles';
import { useLocalization } from 'localization';
import EduText from 'common/EduText';
import { MaterialTypeIconsMap } from 'common/Icon';
import MaterialItem from './MaterialItem';

const flatListRenderItem = ({ item: { title, amount, type, onPress } }) => (
  <MaterialItem title={title} amount={amount} type={type} onPress={onPress}/>
);

const MaterialList = ({ materials, errorMsg }) => {
  const { t } = useLocalization();
  return (
    <View style={styles.materialsList}>
      <EduText style={styles.materialsText}>
        {t('CreatePost/Materials:')}
      </EduText>
      {materials.length ? (
        <>
          <FlatList
            style={[styles.content]}
            data={materials}
            renderItem={flatListRenderItem}
            keyExtractor={(item) => item.id}
          />
        </>
      ) : (
        <EduText
          style={[
            styles.addMaterialUsing,
            errorMsg && styles.addMaterialUsingError,
          ]}
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
  materials: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      type: PropTypes.oneOf(Object.keys(MaterialTypeIconsMap)).isRequired,
      title: PropTypes.string.isRequired,
      amount: PropTypes.number.isRequired,
    }).isRequired
  ).isRequired,
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
  addMaterialUsingError: {
    color: Colors.error,
  },
});
