import React from 'react';
import { StyleSheet, View } from 'react-native';
import { useLocalization } from 'localization';
import { Icon, MaterialTypeIconsMap } from 'common/Icon';
import { Colors, Constants, Styles } from 'styles';
import { navigationPropType } from 'proptypes';
import { TransparentButton } from 'common/Input/Button';
import ScreenNames from 'navigation/ScreenNames';

const getItems = (t) => [
  {
    iconName: MaterialTypeIconsMap.Flashcards,
    title: t('CreatePost/Add/Flashcards'),
    route: ScreenNames.ADD_FLASHCARDS,
  },
  {
    iconName: MaterialTypeIconsMap.MCQ,
    title: t('CreatePost/Add/MCQ'),
    route: ScreenNames.ADD_MCQ,
  },
  {
    iconName: MaterialTypeIconsMap.PDF,
    title: t('CreatePost/Add/PDF'),
    route: ScreenNames.ADD_PDF,
  },
  {
    iconName: MaterialTypeIconsMap.Images,
    title: t('CreatePost/Add/Images'),
    route: ScreenNames.ADD_IMAGES,
  },
  {
    iconName: MaterialTypeIconsMap.Video,
    title: t('CreatePost/Add/Video'),
    route: ScreenNames.ADD_VIDEO,
  },
];

const AddMaterialList = ({ navigation }) => {
  const { t } = useLocalization();
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
    paddingVertical: 10,
    paddingHorizontal: 10,

    justifyContent: 'flex-start',
  },
  rowTitle: {
    color: Colors.offBlack,
    marginLeft: 10,
  },
});
