import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Pressable, StyleSheet, View, Dimensions } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Colors, Constants } from 'styles';
import EduText from 'common/EduText';
import GoToModal from './GoToModal';
import { useContext } from 'react';
import { LocalizationContext } from 'localization';

const NavMaterials = ({
  onPressNext,
  onPressBack,
  onPressPageNum,
  currentPageIndex,
  maxPages,
}) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const { isRTL } = useContext(LocalizationContext);
  const hasNextButton = !!onPressNext;
  const hasBackButton = !!onPressBack;

  const backButton = (
    <Pressable style={styles.arrowWrapper} onPress={onPressBack}>
      <Icon
        style={isRTL && styles.rotate180}
        name="keyboard-backspace"
        size={24}
      />
    </Pressable>
  );

  const nextButton = (
    <Pressable style={styles.arrowWrapper} onPress={onPressNext}>
      <Icon
        style={!isRTL && styles.rotate180}
        name="keyboard-backspace"
        size={24}
      />
    </Pressable>
  );

  return (
    <View style={styles.wrapper}>
      <View style={styles.container}>
        {hasBackButton && backButton}
        <Pressable
          onPress={() => setIsModalVisible(true)}
          style={[
            styles.pageNumWrapper,
            onPressPageNum && styles.pressablePageNum,
          ]}
        >
          <EduText style={styles.text}>
            {currentPageIndex + 1}/{maxPages}
          </EduText>
        </Pressable>
        {hasNextButton && nextButton}
      </View>
      <GoToModal
        isVisible={isModalVisible}
        setIsVisible={setIsModalVisible}
        changeIndex={(i) => {
          onPressPageNum(i);
        }}
        currentIndex={currentPageIndex}
        maxIndex={maxPages}
      />
    </View>
  );
};

NavMaterials.propTypes = {
  onPressNext: PropTypes.func,
  onPressBack: PropTypes.func,
  onPressPageNum: PropTypes.func,
  currentPageIndex: PropTypes.number,
  maxPages: PropTypes.number.isRequired,
};
NavMaterials.defaultProps = {
  onPressNext: undefined,
  onPressBack: undefined,
  onPressPageNum: undefined,
  currentPageIndex: 0,
};

export default NavMaterials;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  rotate180: {
    transform: [{ rotateY: '180deg' }],
  },
  pressablePageNum: {
    borderRadius: Constants.borderRadius,
    borderColor: Colors.dgrey,
    borderWidth: 1,
    backgroundColor: Colors.lighterForeground,
  },

  arrowWrapper: {
    backgroundColor: Colors.foreground,
    borderRadius: Constants.borderRadius,
    paddingHorizontal: 5,
  },

  pageNumWrapper: {
    marginHorizontal: 5,
  },
  text: {
    fontSize: 18,
    marginHorizontal: Dimensions.get('window').width * 0.01,
  },

  wrapper: {
    paddingHorizontal: Constants.commonMargin,
    paddingVertical: Constants.commonMargin / 2,
    alignSelf: 'flex-end',
  },
});
