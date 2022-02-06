import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, View } from 'react-native';
import { Modal } from 'react-native-paper';
import EduText from 'common/EduText';
import { useLocalization } from 'localization';
import { MainActionButton } from 'common/Input/Button';
import { Colors, Constants } from 'styles';
import ModalReviewCheckbox from '../_common/Review/ModalReviewCheckbox';

const ReviewFlashcardsModal = ({
  isModalVisible,
  setIsModalVisible,
  isEasyAllowed,
  isHardAllowed,
  isSkippedAllowed,
  onFinish,
}) => {
  const { t } = useLocalization();
  const [isEasyChecked, setIsEasyChecked] = useState(isEasyAllowed);
  const [isHardChecked, setIsHardChecked] = useState(isHardAllowed);
  const [isSkippedChecked, setIsSkippedChecked] = useState(isSkippedAllowed);
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
        <ModalReviewCheckbox
          text={t('FlashcardsReview/Easy')}
          setChecked={setIsEasyChecked}
          checked={isEasyChecked}
          disabled={!isEasyAllowed}
        />
        <ModalReviewCheckbox
          text={t('FlashcardsReview/Hard')}
          setChecked={setIsHardChecked}
          checked={isHardChecked}
          disabled={!isHardAllowed}
        />
        <ModalReviewCheckbox
          text={t('FlashcardsReview/Skipped')}
          setChecked={setIsSkippedChecked}
          checked={isSkippedChecked}
          disabled={!isSkippedAllowed}
        />
        <MainActionButton
          style={styles.startButton}
          text={t('McqReview/Start')}
          onPress={() =>
            onFinish(isEasyChecked, isHardChecked, isSkippedChecked)
          }
          disabled={!(isEasyChecked || isSkippedChecked || isHardChecked)}
        />
      </View>
    </Modal>
  );
};

ReviewFlashcardsModal.propTypes = {
  isModalVisible: PropTypes.bool.isRequired,
  setIsModalVisible: PropTypes.func.isRequired,
  onFinish: PropTypes.func.isRequired,
  isEasyAllowed: PropTypes.bool.isRequired,
  isHardAllowed: PropTypes.bool.isRequired,
  isSkippedAllowed: PropTypes.bool.isRequired,
};
ReviewFlashcardsModal.defaultProps = {};

export default ReviewFlashcardsModal;

const styles = StyleSheet.create({
  modalTitle: {
    fontSize: 28,
    textAlign: 'center',
  },
  modalItemsContainer: {
    backgroundColor: Colors.foreground,
    width: '100%',
    padding: Constants.commonMargin / 2,
    paddingTop: Constants.commonMargin,
  },
  modal: {
    justifyContent: 'flex-end',
  },
  startButton: {
    marginTop: (Constants.commonMargin * 2) / 3,
  },
});
