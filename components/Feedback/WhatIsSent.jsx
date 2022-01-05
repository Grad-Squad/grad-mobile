import React from 'react';
import PropTypes from 'prop-types';
import { Modal, StyleSheet, View } from 'react-native';
import { useLocalization } from 'localization';
import EduText from 'common/EduText';
import { Colors, Constants } from 'styles';
import { SecondaryActionButton } from 'common/Input/Button';

const WhatIsSent = ({ modalVisible, setModalVisible }) => {
  const { t } = useLocalization();
  const hideModal = () => {
    setModalVisible(false);
  };
  return (
    <Modal
      animationType="slide"
      transparent
      visible={modalVisible}
      onRequestClose={hideModal}
    >
      <View style={styles.centeredView}>
        <View style={styles.backgroundView}>
          <EduText style={styles.followingSent}>
            {t('Feedback/WhatIsSent/The following will be sent:')}
          </EduText>
          <EduText style={styles.bulletPoint}>
            • {t('Feedback/WhatIsSent/The logged in user')}
          </EduText>
          <EduText style={styles.bulletPoint}>
            • {t('Feedback/WhatIsSent/Screenshot (if enabled)')}
          </EduText>
          <EduText style={styles.bulletPoint}>
            • {t('Feedback/WhatIsSent/Feedback Type')}
          </EduText>
          <EduText style={styles.bulletPoint}>
            •{' '}
            {t(
              'Feedback/WhatIsSent/Navigation Stack (where you are and how did you get there)'
            )}
          </EduText>
          <EduText style={styles.bulletPoint}>
            •{' '}
            {t(
              'Feedback/WhatIsSent/Global State (e.g. what’s currently written in create post, ... etc)'
            )}
          </EduText>
          <EduText style={styles.bulletPoint}>
            •{' '}
            {t(
              'Feedback/WhatIsSent/Your device info (e.g. Brand, model, ... etc)'
            )}
          </EduText>
          <EduText style={styles.pleaseNote}>
            {t('Feedback/WhatIsSent/please note that we are sending all')}
          </EduText>
          <SecondaryActionButton
            text={t('Feedback/WhatIsSent/OK')}
            onPress={hideModal}
            style={styles.gap}
          />
        </View>
      </View>
    </Modal>
  );
};

WhatIsSent.propTypes = {
  modalVisible: PropTypes.bool.isRequired,
  setModalVisible: PropTypes.func.isRequired,
};
WhatIsSent.defaultProps = {};

export default WhatIsSent;

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',

    backgroundColor: Colors.modalBackdrop,
  },
  backgroundView: {
    borderRadius: Constants.borderRadius,
    backgroundColor: Colors.background,
    width: '90%',
    padding: 15,
  },
  followingSent: {
    fontFamily: 'Poppins_400Regular',
    fontSize: 24,
  },
  bulletPoint: {
    fontSize: 16,
    marginBottom: 10,
  },
  pleaseNote: {
    fontSize: 16,
    marginTop: 5,
    marginBottom: 25,
  },
});
