import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import { Modal, Pressable, StyleSheet, View } from 'react-native';
import { useLocalization } from 'localization';
import EduText from 'common/EduText';
import { Colors, Constants, Fonts } from 'styles';
import { useFormik } from 'formik';
import { maxCharError, requiredError } from 'validation';
import { useSelector } from 'react-redux';
import * as yup from 'yup';
import * as Device from 'expo-device';
import { MainActionButton, TransparentButton } from 'common/Input/Button';
import { DropdownList, TransparentTextInputFormik } from 'common/Input';
import Checkbox from 'common/Input/Checkbox';
import pressableAndroidRipple from 'common/pressableAndroidRipple';
import { useAPISendFeedback } from 'api/endpoints/feedback';

const deviceInfoKeys = [
  'brand',
  'designName',
  'deviceName',
  'deviceYearClass',
  'isDevice',
  'manufacturer',
  'modelId',
  'modelName',
  'osBuildFingerprint',
  'osBuildId',
  'osInternalBuildId',
  'osName',
  'osVersion',
  'platformApiLevel',
  'productName',
  'supportedCpuArchitectures',
  'totalMemory',
];

const SendFeedback = ({
  navigationRef,
  modalVisible,
  setModalVisible,
  showWhatIsSent,
  switchToThankyou,
}) => {
  const { t } = useLocalization();

  const globalState = useSelector((state) => state);

  const feedbackMutation = useAPISendFeedback({
    onSuccess: () => {
      switchToThankyou();
    },
  });

  const feedbackTypes = useMemo(
    () => [
      { label: t('Feedback/SendFeedback/feedbackTypes/Bug'), id: 'Bug' },
      {
        label: t('Feedback/SendFeedback/feedbackTypes/Suggestion'),
        id: 'Suggestion',
      },
      { label: t('Feedback/SendFeedback/feedbackTypes/Other'), id: 'Other' },
    ],
    []
  );

  const formik = useFormik({
    initialValues: {
      content: '',
      feedbackType: feedbackTypes[0].id,
      includeScreenshot: true,
    },
    onSubmit: ({ content, feedbackType, includeScreenshot }) => {
      const deviceInfo = {};
      deviceInfoKeys.forEach((key) => {
        deviceInfo[key] = Device[key];
      });

      feedbackMutation.mutate({
        navStack: JSON.stringify(navigationRef.getRootState()),
        globalState: JSON.stringify(globalState),
        deviceInfo: JSON.stringify(deviceInfo),
        content,
        feedbackType,
      });
    },
    validationSchema: yup.object().shape({
      content: yup
        .string()
        .trim()
        .max(1000, maxCharError(t, 1000))
        .required(requiredError(t)),
    }),
  });

  const hideModal = () => {
    formik.resetForm();
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
        <View style={styles.modalView}>
          <EduText style={styles.sendFeedback}>
            {t('Feedback/SendFeedback/Send Feedback')}
          </EduText>
          <EduText style={styles.weAppreciate}>
            {t(
              'Feedback/SendFeedback/we appreciate your feedback, whether it’s a bug, a suggestion, or just something random you want to say. we would like to hear it.'
            )}
          </EduText>
          <TransparentButton
            text={t('Feedback/SendFeedback/what will be sent')}
            onPress={() => {
              showWhatIsSent();
            }}
            style={styles.whatWillBeSentContainer}
            textStyle={styles.whatWillBeSent}
          />
          <TransparentTextInputFormik
            placeholder={t('Feedback/SendFeedback/your feedback')}
            hideTitle
            formik={formik}
            formikKey="content"
            multiline
            style={styles.yourFeedbackTextInput}
          />
          <DropdownList
            value={formik.values.feedbackType}
            setValueFunction={(newValue) => {
              formik.setFieldValue('feedbackType', newValue[0]);
            }}
            items={feedbackTypes}
            style={styles.feedbackTypes}
          />
          <Pressable
            style={styles.includeScreenshotRow}
            onPress={() =>
              formik.setFieldValue(
                'includeScreenshot',
                !formik.values.includeScreenshot
              )
            }
            android_ripple={pressableAndroidRipple}
            disabled={feedbackMutation.isLoading}
          >
            <Checkbox
              checked={formik.values.includeScreenshot}
              setChecked={(newValue) => {
                formik.setFieldValue('includeScreenshot', newValue);
              }}
              disabled={feedbackMutation.isLoading}
              pressableProps={{
                disabled: feedbackMutation.isLoading,
              }}
            />
            <EduText style={styles.includeScreenshotText}>
              {t('Feedback/SendFeedback/Include a screenshot')}
            </EduText>
          </Pressable>

          <View style={styles.actionsRow}>
            <TransparentButton
              text={t('Feedback/SendFeedback/cancel')}
              onPress={() => {
                hideModal();
              }}
              style={styles.cancelButton}
            />
            <MainActionButton
              text={t('Feedback/SendFeedback/Send')}
              onPress={formik.handleSubmit}
              style={styles.sendButton}
              disabled={!formik.isValid}
              loading={feedbackMutation.isLoading}
            />
          </View>
        </View>
      </View>
    </Modal>
  );
};

SendFeedback.propTypes = {
  navigationRef: PropTypes.shape({
    getRootState: PropTypes.func.isRequired,
  }).isRequired,
  modalVisible: PropTypes.bool.isRequired,
  setModalVisible: PropTypes.func.isRequired,
  showWhatIsSent: PropTypes.func.isRequired,
  switchToThankyou: PropTypes.func.isRequired,
};
SendFeedback.defaultProps = {};

export default SendFeedback;

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'flex-end',

    backgroundColor: ' rgba(0,0,0,0.5)',
  },
  modalView: {
    backgroundColor: Colors.background,
    borderTopEndRadius: Constants.borderRadius,
    padding: 10,
  },
  sendFeedback: {
    fontSize: 31,
    fontFamily: 'Poppins_400Regular',
  },
  whatWillBeSentContainer: {
    alignSelf: 'flex-start',
  },
  whatWillBeSent: {
    color: Colors.offBlack,
    textDecorationLine: 'underline',
    fontSize: 14,
    fontFamily: Fonts.light,
  },
  yourFeedbackTextInput: {
    maxHeight: 150,
    marginBottom: 10,
  },
  feedbackTypes: {
    marginBottom: 10,
  },
  includeScreenshotRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  includeScreenshotText: {
    marginLeft: 5,
  },
  actionsRow: {
    flexDirection: 'row',
  },
  cancelButton: {
    flex: 1,
  },
  sendButton: {
    flex: 3,
  },
});
