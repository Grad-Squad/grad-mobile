import React from 'react';
import PropTypes from 'prop-types';
import { Modal, Portal } from 'react-native-paper';
import ImageSelector from 'common/ImageSelector';
import { View, StyleSheet } from 'react-native';
import { uriPropType } from 'proptypes';
import { MainActionButton, TransparentButton } from 'common/Input/Button';
import { useLocalization } from 'localization';

const ProfilePictureModal = ({ visible, setVisible, prevImage, setImage, onConfirm}) => {

    const { t } = useLocalization();

  return (
      <Portal>
        <Modal visible={visible} onDismiss={() => setVisible(false)} contentContainerStyle={styles.container}>
            <ImageSelector setImage={setImage} isRegisteration prevImage={prevImage}/>
            <View style={{flexDirection: 'row', justifyContent: 'flex-end', paddingTop:50 }}>
                <MainActionButton onPress={onConfirm} text={t("ProfilePicture/Confirm")} style={styles.button} textStyle={styles.buttonText}/>
                <TransparentButton onPress={() => setVisible(false)} text={t("ProfilePicture/Cancel")} style={styles.button} textStyle={styles.buttonText}/>
            </View>
        </Modal>
      </Portal>
  );
};

export default ProfilePictureModal;

ProfilePictureModal.propTypes = {
    visible: PropTypes.bool.isRequired,
    setVisible: PropTypes.func.isRequired,
    prevImage: uriPropType,
    setImage: PropTypes.func.isRequired,
    onConfirm: PropTypes.func.isRequired,
};
ProfilePictureModal.defaultProps = {
    prevImage: null,
};

const styles = StyleSheet.create({
    container:{
      backgroundColor: 'white',
      padding: 20,
      alignSelf:'center',
      width: '70%',
      height: '30%',
      flexDirection: 'column',
      justifyContent: 'space-between',
    },
    button:{
      marginHorizontal: 10,
    },
    buttonText:{
      fontSize: 20,
    },
  });