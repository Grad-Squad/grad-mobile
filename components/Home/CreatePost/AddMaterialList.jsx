import React, { useMemo, useRef } from 'react';
import { StyleSheet, View } from 'react-native';
import { useLocalization } from 'localization';
import { Icon, MaterialTypeIconsMap } from 'common/Icon';
import { Colors, Constants, Styles } from 'styles';
import { navigationPropType } from 'proptypes';
import { TransparentButton } from 'common/Input/Button';
import ScreenNames from 'navigation/ScreenNames';
import { MaterialTypes } from 'constants';
import BottomSheet from '@gorhom/bottom-sheet';

const getItems = (t) => [
  {
    iconName: MaterialTypeIconsMap[MaterialTypes.Flashcards],
    title: t('CreatePost/Add/Flashcards'),
    route: ScreenNames.ADD_FLASHCARDS,
  },
  {
    iconName: MaterialTypeIconsMap[MaterialTypes.MCQ],
    title: t('CreatePost/Add/MCQ'),
    route: ScreenNames.ADD_MCQ,
  },
  {
    iconName: MaterialTypeIconsMap[MaterialTypes.PDF],
    title: t('CreatePost/Add/PDF'),
    route: ScreenNames.ADD_PDF,
  },
  {
    iconName: MaterialTypeIconsMap[MaterialTypes.Images],
    title: t('CreatePost/Add/Images'),
    route: ScreenNames.ADD_IMAGES,
  },
  {
    iconName: MaterialTypeIconsMap[MaterialTypes.Video],
    title: t('CreatePost/Add/Video'),
    route: ScreenNames.ADD_VIDEO,
  },
];

const AddMaterialList = ({ navigation }) => {
  const { t } = useLocalization();

  const bottomSheetRef = useRef(null);

  const snapPoints = useMemo(() => ['7%', '40%'], []);
  return (
    <BottomSheet
      ref={bottomSheetRef}
      index={1}
      snapPoints={snapPoints}
      backgroundStyle={styles.backgroundStyle}
    >
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
    </BottomSheet>
  );
};

AddMaterialList.propTypes = { navigation: navigationPropType.isRequired };
AddMaterialList.defaultProps = {};

export default AddMaterialList;

const width = '80%';

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,

    width,
    alignSelf: 'center',

    borderTopRightRadius: Constants.borderRadius,
    borderTopLeftRadius: Constants.borderRadius,
    borderColor: Colors.separator,
    borderTopWidth: 2,
    borderRightWidth: 2,
    borderLeftWidth: 2,

    backgroundColor: Colors.background,
  },
  backgroundStyle: {
    backgroundColor: 'transparent',
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
