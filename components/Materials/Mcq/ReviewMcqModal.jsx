import React, { useContext, useState } from 'react';
import PropTypes from 'prop-types';
import { Pressable, StyleSheet, View } from 'react-native';
import { Modal } from 'react-native-paper';
import EduText from 'common/EduText';
import { LocalizationContext } from 'localization';
import { MainActionButton } from 'common/Input/Button';
import { Colors, Constants } from 'styles';
import Checkbox from 'common/Input/Checkbox';
import pressableAndroidRipple from 'common/pressableAndroidRipple';

const ReviewMcqModal = ({
  isModalVisible,
  setIsModalVisible,
  isCorrectAllowed,
  isWrongAllowed,
  isSkippedAllowed,
  isShownAllowed,
  onFinish,
}) => {
  const { t } = useContext(LocalizationContext);
  const [isCorrectChecked, setIsCorrectChecked] = useState(isCorrectAllowed);
  const [isWrongChecked, setIsWrongChecked] = useState(isWrongAllowed);
  const [isSkippedChecked, setIsSkippedChecked] = useState(isSkippedAllowed);
  const [isAnswersShownChecked, setIsAnswersShownChecked] =
    useState(isShownAllowed);
  return (
    <Modal
      visible={isModalVisible}
      onDismiss={() => setIsModalVisible(false)}
      contentContainerStyle={styles.modalWrapper}
      style={styles.modal}
    >
      <View style={styles.modalItemsContainer}>
        <EduText style={styles.modalTitle}>
          {t('McqReview/What should we include?')}
        </EduText>
        <View style={styles.optionsWrapper}>
          <Pressable
            style={styles.row}
            onPress={() => setIsCorrectChecked((state) => !state)}
            android_ripple={pressableAndroidRipple}
            disabled={!isCorrectAllowed}
          >
            <Checkbox
              checked={isCorrectChecked}
              setChecked={setIsCorrectChecked}
              disabled={!isCorrectAllowed}
              pressableProps={{
                disabled: !isCorrectAllowed,
              }}
            />
            <EduText style={styles.reviewOption}>
              {t('McqReview/Correct')}
            </EduText>
          </Pressable>
          <Pressable
            style={styles.row}
            onPress={() => setIsWrongChecked((state) => !state)}
            android_ripple={pressableAndroidRipple}
            disabled={!isWrongAllowed}
          >
            <Checkbox
              checked={isWrongChecked}
              setChecked={setIsWrongChecked}
              pressableProps={{
                disabled: !isWrongAllowed,
              }}
            />
            <EduText style={styles.reviewOption}>
              {t('McqReview/Wrong')}
            </EduText>
          </Pressable>
          <Pressable
            style={styles.row}
            onPress={() => setIsAnswersShownChecked((state) => !state)}
            android_ripple={pressableAndroidRipple}
            disabled={!isShownAllowed}
          >
            <Checkbox
              checked={isAnswersShownChecked}
              setChecked={setIsAnswersShownChecked}
              pressableProps={{
                disabled: !isShownAllowed,
              }}
            />
            <EduText style={styles.reviewOption}>
              {t('McqReview/AnswersShown')}
            </EduText>
          </Pressable>
          <Pressable
            style={styles.row}
            onPress={() => setIsSkippedChecked((state) => !state)}
            android_ripple={pressableAndroidRipple}
            disabled={!isSkippedAllowed}
          >
            <Checkbox
              checked={isSkippedChecked}
              setChecked={setIsSkippedChecked}
              pressableProps={{
                disabled: !isSkippedAllowed,
              }}
            />
            <EduText style={styles.reviewOption}>
              {t('McqReview/Skipped')}
            </EduText>
          </Pressable>
        </View>
        <MainActionButton
          style={styles.startButton}
          text={t('McqReview/Start')}
          onPress={() =>
            onFinish(
              isCorrectChecked,
              isWrongChecked,
              isAnswersShownChecked,
              isSkippedChecked
            )
          }
          disabled={
            !(
              isAnswersShownChecked ||
              isCorrectChecked ||
              isSkippedChecked ||
              isWrongChecked
            )
          }
        />
      </View>
    </Modal>
  );
};

ReviewMcqModal.propTypes = {
  isModalVisible: PropTypes.bool.isRequired,
  setIsModalVisible: PropTypes.func.isRequired,
  onFinish: PropTypes.func.isRequired,
  isCorrectAllowed: PropTypes.bool.isRequired,
  isWrongAllowed: PropTypes.bool.isRequired,
  isSkippedAllowed: PropTypes.bool.isRequired,
  isShownAllowed: PropTypes.bool.isRequired,
};
ReviewMcqModal.defaultProps = {};

export default ReviewMcqModal;

const styles = StyleSheet.create({
  modalTitle: {
    // marginTop: Constants.commonMargin / 2,
    fontSize: 28,
    textAlign: 'center',
  },
  modalItemsContainer: {
    backgroundColor: Colors.foreground,
    // height: Dimensions.get('window').height * 0.37,
    width: '100%',
    padding: Constants.commonMargin / 2,
    paddingTop: Constants.commonMargin,
  },
  modal: {
    justifyContent: 'flex-end',
  },
  reviewOption: {
    fontSize: 20,
    paddingVertical: Constants.commonMargin / 3,
    paddingHorizontal: Constants.commonMargin,
  },
  startButton: {
    marginTop: (Constants.commonMargin * 2) / 3,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});
