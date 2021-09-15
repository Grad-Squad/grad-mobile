import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { FlatList, StyleSheet, View } from 'react-native';
import { Colors } from 'styles';
import { LocalizationContext } from 'localization';
import EduText from 'common/EduText';
import MaterialItem from './MaterialItem';

const materials = [
  {
    id: '1',
    type: 'Flashcards',
    title:
      'long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long boi',
    amount: 10,
  },
  {
    id: '2',
    type: 'MCQ',
    title: 'Unit 2: lesson 417',
    amount: 100,
  },
  {
    id: '3',
    type: 'Images',
    title: 'Unit 11: lesson 7',
    amount: 2,
  },
  {
    id: '4',
    type: 'PDF',
    title: 'Unit 12: lesson 7',
    amount: 2,
  },
  {
    id: '5',
    type: 'Video',
    title: 'Unit 13: lesson 7',
    amount: 2,
  },
  {
    id: '6',
    type: 'Flashcards',
    title: 'Unit 14: lesson 7',
    amount: 2,
  },
  {
    id: '7',
    type: 'Flashcards',
    title: 'Unit 15: lesson 7',
    amount: 2,
  },
  {
    id: '8',
    type: 'Flashcards',
    title: 'Unit 16: lesson 7',
    amount: 2,
  },
];

const flatListRenderItem = ({ item: { title, amount, type } }) => (
  <MaterialItem title={title} amount={amount} type={type} />
);

const MaterialList = ({ errorMsg }) => {
  const { t } = useContext(LocalizationContext);
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
          {errorMsg || t('CreatePost/add a material using any of the buttons below')}
        </EduText>
      )}
    </View>
  );
};

MaterialList.propTypes = { errorMsg: PropTypes.string };
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
