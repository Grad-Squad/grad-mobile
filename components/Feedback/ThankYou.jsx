import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, View } from 'react-native';
import EduText from 'common/EduText';
import { useLocalization } from 'localization';
import { SecondaryActionButton } from 'common/Input/Button';
import Modal from 'common/Modal';
import RoundedImage from 'common/RoundedImage';

const ThankYou = ({ modalVisible, setModalVisible }) => {
  const { t } = useLocalization();
  const hideModal = () => {
    setModalVisible(false);
  };
  return (
    <Modal visible={modalVisible} onRequestClose={hideModal}>
      <View style={styles.topImageContainer}>
        <RoundedImage
          imageURI="https://c.tenor.com/_UaFpyE0SPYAAAAd/praying-cat.gif"
          canMaximize={false}
          maxWidthRatio={0.82}
        />
      </View>
      <EduText style={styles.thankYou}>
        {t('Feedback/ThankYou/THANK YOU !!')}
      </EduText>
      <EduText style={styles.weWill}>
        {t('Feedback/ThankYou/we will read your feedback as soon as we can')}
      </EduText>
      <SecondaryActionButton
        text={t('Feedback/ThankYou/You are welcome')}
        onPress={hideModal}
      />
    </Modal>
  );
};

ThankYou.propTypes = {
  modalVisible: PropTypes.bool.isRequired,
  setModalVisible: PropTypes.func.isRequired,
};
ThankYou.defaultProps = {};

export default ThankYou;

const styles = StyleSheet.create({
  topImageContainer: {
    alignItems: 'center',
    width: '100%',
    top: '-50%',
    marginBottom: -150,
  },
  thankYou: {
    fontFamily: 'Poppins_400Regular',
    fontSize: 32,
    textAlign: 'center',
  },
  weWill: {
    fontSize: 16,
    marginBottom: 20,
    textAlign: 'center',
  },
});
