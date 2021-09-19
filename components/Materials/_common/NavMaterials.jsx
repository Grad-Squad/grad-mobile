import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  Pressable,
  StyleSheet,
  View,
  Dimensions,
  ScrollView,
  FlatList,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Colors, Constants } from 'styles';
import EduText from 'common/EduText';
import { Modal, Portal } from 'react-native-paper';
import { TransparentButton } from 'common/Input/Button';
import TextInput from 'common/Input/TextInput';

const NavMaterials = ({
  onPressNext,
  onPressBack,
  onPressPageNum,
  currentPageIndex,
  maxPages,
}) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
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

  const questionIndices = [...Array(maxPages + 20).keys()];

  return (
    <>
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
      <Portal>
        <Modal
          visible={isModalVisible}
          onDismiss={() => setIsModalVisible(false)}
          contentContainerStyle={styles.modalWrapper}
          style={styles.modal}
        >
          <View style={styles.modalItemsContainer}>
            <EduText style={styles.modalTitle}>Go to question</EduText>
            <FlatList
              data={questionIndices}
              numColumns={5}
              keyExtractor={(item) => item}
              renderItem={({ item }) => (
                <Pressable onPress={() => onPressPageNum(item)}>
                  <EduText
                    style={[
                      styles.modalNumberContainer,
                      currentPageIndex === item && styles.modalNumChosen,
                    ]}
                  >
                    {item + 1}
                  </EduText>
                </Pressable>
              )}
            />
            {/* <View style={styles.container}>
              <TextInput
                style={{ backgroundColor: 'red' }}
                title=""
                placeholder="Enter question number"
                setText={() => {}}
              />
              <EduText>(1-{maxPages})</EduText>
              <TransparentButton text="Go" onPress={() => {}} />
            </View> */}
          </View>
        </Modal>
      </Portal>
    </>
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

  modalItemsContainer: {
    backgroundColor: Colors.background,
    padding: Constants.commonMargin / 2,
    paddingTop: Constants.commonMargin,
    width: '90%',
    alignSelf: 'center',
    borderRadius: Constants.borderRadius,
  },

  modalNumberContainer: {
    backgroundColor: Colors.foreground,
    borderRadius: Constants.borderRadius,
    padding: Constants.commonMargin / 2,
    margin: Constants.commonMargin / 2,
    width: Dimensions.get('window').width * 0.1,
    textAlign: 'center',
  },

  modalNumChosen: {
    color: Colors.white,
    backgroundColor: Colors.accent,
  },

  modalTitle: {
    fontSize: 22,
  },
});
