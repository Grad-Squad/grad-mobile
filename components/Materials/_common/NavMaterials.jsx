import React from 'react';
import PropTypes from 'prop-types';
import { Pressable, StyleSheet, View, Text, Dimensions } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Colors, Constants } from 'styles';
import EduText from 'common/EduText';

const NavMaterials = ({
  onPressNext,
  onPressBack,
  isPageNumPressable,
  currentPageIndex,
  maxPages,
}) => {
  const hasNextButton = !!onPressNext;
  const hasBackButton = !!onPressBack;

  const backButton = (
    <Pressable style={styles.arrowWrapper} onPress={onPressBack}>
      <Icon name="keyboard-backspace" size={24} />
    </Pressable>
  );

  const nextButton = (
    <Pressable style={styles.arrowWrapper} onPress={onPressNext}>
      <Icon style={styles.rotate180} name="keyboard-backspace" size={24} />
    </Pressable>
  );

  const onPressPageNum = isPageNumPressable
    ? () => {
        console.log('test');
      }
    : () => {};

  return (
    <View style={styles.container}>
      {hasBackButton && backButton}
      <Pressable
        onPress={onPressPageNum}
        style={[
          styles.pageNumWrapper,
          isPageNumPressable && styles.pressablePageNum,
        ]}
      >
        <EduText style={styles.text}>
          {currentPageIndex + 1}/{maxPages}
        </EduText>
      </Pressable>
      {hasNextButton && nextButton}
    </View>
  );
};

NavMaterials.propTypes = {
  onPressNext: PropTypes.func,
  onPressBack: PropTypes.func,
  isPageNumPressable: PropTypes.bool,
  currentPageIndex: PropTypes.number,
  maxPages: PropTypes.number.isRequired,
};
NavMaterials.defaultProps = {
  onPressNext: undefined,
  onPressBack: undefined,
  isPageNumPressable: false,
  currentPageIndex: 0,
};

export default NavMaterials;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rotate180: {
    transform: [{ rotateY: '180deg' }],
  },
  pressablePageNum: {
    borderRadius: Constants.borderRadius * 2,
    borderColor: Colors.dgrey,
    borderWidth: 1,
    // borderColor: '#000',
    backgroundColor: Colors.lighterForeground,
  },

  arrowWrapper: {
    backgroundColor: Colors.foreground,
    borderRadius: Constants.borderRadius * 2,
    paddingHorizontal: 5,
  },

  pageNumWrapper: {
    marginHorizontal: 5,
  },
  text: {
    fontSize: 18,
    marginHorizontal: Dimensions.get('window').width * 0.01,
  },
});
