import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, View } from 'react-native';
import EduText from 'common/EduText';
import { useLocalization } from 'localization';
import { SecondaryActionButton } from 'common/Input/Button';
import { Styles } from 'styles';
import ResponsiveImage from 'common/ResponsiveImage';
import Modal from 'common/Modal';

const ThankYou = ({ modalVisible, setModalVisible }) => {
  const { t } = useLocalization();
  const hideModal = () => {
    setModalVisible(false);
  };
  return (
    <Modal visible={modalVisible} onRequestClose={hideModal}>
      <View style={styles.topImageContainer}>
        <View style={styles.topImageRoundedCorner}>
          <ResponsiveImage
            imageURI="https://c.tenor.com/_UaFpyE0SPYAAAAd/praying-cat.gif"
            canMaximize={false}
            maxWidthRatio={0.82}
            style={styles.topImage}
          />
        </View>
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
  topImageRoundedCorner: {
    borderRadius: 20,
    overflow: 'hidden',
    ...Styles.dropShadow,
  },
  topImage: {
    marginBottom: 0,
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
