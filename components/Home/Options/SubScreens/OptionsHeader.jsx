import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, View } from 'react-native';
import { PressableIcon } from 'common/Icon';
import EduText from 'common/EduText';
import { Colors, Constants, Styles } from 'styles';
import { IconNames } from 'common/Icon/Icon';
import NoInternetConnectionText from 'common/NoInternetConnectionText';
import { useNavigation } from '@react-navigation/native';
import { useLocalization } from 'localization';

const OptionsHeader = ({ titleText }) => {
  const navigation = useNavigation();
  const { isRTL } = useLocalization();
  return (
    <>
      <View style={styles.wrapper}>
        <View style={styles.leftSide}>
          <PressableIcon
            name={isRTL ? IconNames.arrowRight : IconNames.arrowLeft}
            onPress={() => navigation.goBack()}
            size={28}
          />
          <EduText style={styles.titleText}>{titleText}</EduText>
        </View>
      </View>
      <NoInternetConnectionText />
    </>
  );
};

OptionsHeader.propTypes = {
  titleText: PropTypes.string.isRequired,
};
OptionsHeader.defaultProps = {};

export default OptionsHeader;

const styles = StyleSheet.create({
  wrapper: {
    ...Styles.dropShadow,
    backgroundColor: Colors.foreground,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    paddingHorizontal: 23,
    paddingBottom: 15,
    paddingTop: 8 + Constants.fromScreenStartPadding,

    borderColor: Colors.border,
    borderRadius: Constants.borderRadius,
    borderBottomWidth: 0.2,
  },
  leftSide: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  titleText: {
    textAlign: 'center',
    flex: 1,
    fontSize: 20,
  },
});
