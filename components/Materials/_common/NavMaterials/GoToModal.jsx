import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Dimensions, FlatList, StyleSheet, View } from 'react-native';
import { Modal, Portal } from 'react-native-paper';
import EduText from 'common/EduText';
import { TransparentTextInput } from 'common/Input';
import { TransparentButton } from 'common/Input/Button';
import { Colors, Constants } from 'styles';
import PressableText from 'common/PressableText';

const GoToModal = ({
  isVisible,
  setIsVisible,
  changeIndex,
  currentIndex,
  maxIndex,
}) => {
  const [newIndexTextInput, setNewIndexTextInput] = useState('');
  return (
    <Portal>
      <Modal visible={isVisible} onDismiss={() => setIsVisible(false)}>
        <View style={styles.modalItemsContainer}>
          <EduText style={styles.modalTitle}>Go to question</EduText>
          <FlatList
            data={[...Array(maxIndex + 20).keys()]}
            numColumns={5}
            keyExtractor={(item) => item}
            renderItem={({ item }) => (
              <PressableText
                onPress={() => changeIndex(item)}
                style={[
                  styles.modalNumberContainer,
                  currentIndex === item && styles.modalNumChosen,
                ]}
              >
                {item + 1}
              </PressableText>
            )}
          />
          <View style={styles.container}>
            <TransparentTextInput
              title="Enter question number"
              placeholder="Enter question number"
              setText={setNewIndexTextInput}
              text={newIndexTextInput}
              style={{ flex: 1 }}
            />
            <EduText style>(1-{maxIndex})</EduText>
            <TransparentButton
              text="Go"
              onPress={() => changeIndex(parseInt(newIndexTextInput, 10) - 1)}
            />
          </View>
        </View>
      </Modal>
    </Portal>
  );
};

GoToModal.propTypes = {
  isVisible: PropTypes.bool.isRequired,
  setIsVisible: PropTypes.func.isRequired,
  changeIndex: PropTypes.func.isRequired,
  currentIndex: PropTypes.number.isRequired,
  maxIndex: PropTypes.number.isRequired,
};
GoToModal.defaultProps = {};

export default GoToModal;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  modalItemsContainer: {
    backgroundColor: Colors.background,
    padding: Constants.commonMargin / 2,
    paddingTop: Constants.commonMargin,
    width: '90%',
    alignSelf: 'center',
    borderRadius: Constants.borderRadius,
  },
  modalTitle: {
    fontSize: 22,
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
});
