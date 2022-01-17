import React, { useEffect, useState } from 'react';
import { Modal, StyleSheet, View } from 'react-native';
import { useLocalization } from 'localization';
import localStorageKeys from 'localStorageKeys';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Colors, Constants } from 'styles';
import { SecondaryActionButton } from 'common/Input/Button';
import ShakeForFeedback from './Messages/ShakeForFeedback';

const keysComponentMap = {
  [localStorageKeys.firstTime_shakeForFeedback]: <ShakeForFeedback />,
};

const FirstTimeMessages = () => {
  const { t } = useLocalization();
  const [keysToView, setKeysToView] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    if (keysToView.length) {
      setModalVisible(true);
    }
  }, [keysToView]);

  useEffect(() => {
    (async () => {
      const keysPromises = Object.keys(keysComponentMap).map(async (msgKey) => {
        const value = await AsyncStorage.getItem(msgKey);

        return value !== 'true' ? msgKey : undefined;
      });

      const newKeysToView = (await Promise.all(keysPromises)).filter(
        (item) => item !== undefined
      );

      setKeysToView(newKeysToView);
    })();
  }, []);

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
          {keysToView.length > 0 && (
            <>
              {keysComponentMap[keysToView[0]]}
              <SecondaryActionButton
                text={t('FirstTimeMessages/OK')}
                onPress={() => {
                  AsyncStorage.setItem(keysToView[0], 'true');
                  setKeysToView(keysToView.slice(1));
                  if (keysToView.length === 1) {
                    hideModal();
                  }
                }}
              />
            </>
          )}
        </View>
      </View>
    </Modal>
  );
};

FirstTimeMessages.propTypes = {};
FirstTimeMessages.defaultProps = {};

export default FirstTimeMessages;

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
});
