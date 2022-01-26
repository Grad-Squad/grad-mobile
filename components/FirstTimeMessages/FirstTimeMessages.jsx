import React, { useEffect, useState } from 'react';
import { useLocalization } from 'localization';
import localStorageKeys from 'localStorageKeys';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { SecondaryActionButton } from 'common/Input/Button';
import Modal from 'common/Modal';
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
    <Modal visible={modalVisible} onRequestClose={hideModal}>
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
    </Modal>
  );
};

FirstTimeMessages.propTypes = {};
FirstTimeMessages.defaultProps = {};

export default FirstTimeMessages;
