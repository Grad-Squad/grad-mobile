import React, { useContext } from 'react';
import { StyleSheet, View } from 'react-native';
import { LocalizationContext } from 'localization';
import { Icon, MaterialTypeIconsMap } from 'common/Icon';
import { Colors, Constants, Styles } from 'styles';
import { navigationPropType } from 'proptypes';
import { TransparentButton } from 'common/Input/Button';

const getItems = (t) => [
  {
    iconName: MaterialTypeIconsMap.Flashcards,
    title: t('CreatePost/Add/Flashcards'),
    route: 'addFlashcards',
  },
  {
    iconName: MaterialTypeIconsMap.MCQ,
    title: t('CreatePost/Add/MCQ'),
    route: 'addMCQ',
  },
  {
    iconName: MaterialTypeIconsMap.PDF,
    title: t('CreatePost/Add/PDF'),
    route: 'addPDF',
  },
  {
    iconName: MaterialTypeIconsMap.Images,
    title: t('CreatePost/Add/Images'),
    route: 'addImages',
  },
  {
    iconName: MaterialTypeIconsMap.Video,
    title: t('CreatePost/Add/Video'),
    route: 'addVideo',
  },
];

const AddMaterialList = ({ navigation }) => {
  const { t } = useContext(LocalizationContext);
  return (
    <View style={styles.wrapper}>
      {getItems(t).map(({ title, iconName, route }) => (
        <TransparentButton
          key={title}
          text={title}
          style={styles.row}
          textStyle={styles.rowTitle}
          leftIcon={<Icon name={iconName} />}
          onPress={() => navigation.navigate(route)}
        />
      ))}
    </View>
  );
};

AddMaterialList.propTypes = { navigation: navigationPropType.isRequired };
AddMaterialList.defaultProps = {};

export default AddMaterialList;

const styles = StyleSheet.create({
  wrapper: {
    marginTop: 'auto',

    width: '80%',
    alignSelf: 'center',

    borderTopRightRadius: Constants.borderRadius,
    borderTopLeftRadius: Constants.borderRadius,
    borderColor: Colors.separator,
    borderTopWidth: 2,
    borderRightWidth: 2,
    borderLeftWidth: 2,
  },
  row: {
    ...Styles.bottomBorder,
    paddingVertical: 5,
    paddingHorizontal: 10,

    justifyContent: 'flex-start',
  },
  rowTitle: {
    color: Colors.offBlack,
    marginLeft: 10,
  },
});
