import React from 'react';
import PropTypes from 'prop-types';
import { Dimensions, FlatList, StyleSheet, View } from 'react-native';
import { Modal, Portal } from 'react-native-paper';
import EduText from 'common/EduText';
import { TransparentTextInputFormik } from 'common/Input';
import { TransparentButton } from 'common/Input/Button';
import { Colors, Constants } from 'styles';
import PressableText from 'common/PressableText';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { useLocalization } from 'localization';
import { requiredError } from 'validation';

const GoToModal = ({
  isVisible,
  setIsVisible,
  changeIndex,
  currentIndex,
  maxIndex,
}) => {
  const { t } = useLocalization();

  const formik = useFormik({
    initialValues: {
      newIndex: '',
    },
    onSubmit: ({ newIndex }) => {
      changeIndexAndDismiss(parseInt(newIndex, 10) - 1);
    },
    validationSchema: yup.object().shape({
      newIndex: yup
        .number()
        .typeError(t('TextInput/number'))
        .min(1, t('TextInput/min', { min: 1 }))
        .max(maxIndex, t('TextInput/max', { max: maxIndex }))
        .integer(t('TextInput/integer'))
        .required(requiredError(t)),
    }),
  });

  const dismiss = () => {
    setIsVisible(false);
    formik.resetForm();
  };
  const changeIndexAndDismiss = (i) => {
    changeIndex(i);
    dismiss();
  };
  return (
    <Portal>
      <Modal visible={isVisible} onDismiss={dismiss}>
        <View style={styles.modalItemsContainer}>
          <EduText style={styles.title}>
            {t('MaterialNav/Go to question')}
          </EduText>
          <FlatList
            data={[...Array(maxIndex).keys()]}
            keyboardShouldPersistTaps="handled"
            numColumns={5}
            keyExtractor={(item) => item}
            renderItem={({ item }) => (
              <PressableText
                onPress={() => changeIndexAndDismiss(item)}
                style={[
                  styles.numberText,
                  currentIndex === item && styles.numberTextChosen,
                ]}
                pressableProps={{
                  style: styles.numberContainer,
                }}
              >
                {item + 1}
              </PressableText>
            )}
            style={styles.numberGrid}
          />
          <EduText style={styles.errorText}>
            {(formik.touched.newIndex && formik.errors.newIndex) || ''}
          </EduText>
          <View style={styles.container}>
            <TransparentTextInputFormik
              formik={formik}
              formikKey="newIndex"
              TextInputProps={{
                placeholder: t('MaterialNav/Question Number'),
                keyboardType: 'numeric',
              }}
              hideTitle
              style={styles.newIndexTextInput}
            />
            <EduText style={styles.minMaxText}>(1-{maxIndex})</EduText>
            <TransparentButton text="Go" onPress={formik.handleSubmit} />
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
    alignItems: 'center',
  },
  minMaxText: { marginHorizontal: 10 },
  modalItemsContainer: {
    backgroundColor: Colors.background,
    padding: Constants.commonMargin,
    paddingTop: Constants.commonMargin,
    width: '90%',
    alignSelf: 'center',
    borderRadius: Constants.borderRadius,
  },
  title: {
    fontSize: 22,
  },
  numberContainer: {
    margin: Constants.commonMargin / 2,
    borderRadius: Constants.borderRadius,
  },
  numberText: {
    backgroundColor: Colors.foreground,
    borderRadius: Constants.borderRadius,
    padding: Constants.commonMargin / 2,
    width: Dimensions.get('window').width * 0.1,
    textAlign: 'center',
    fontSize: 16,
  },
  numberTextChosen: {
    color: Colors.white,
    backgroundColor: Colors.accent,
  },
  numberGrid: {
    alignSelf: 'center',

    maxHeight: 175,

    marginBottom: 5,
  },
  newIndexTextInput: {
    flex: 1,
  },
  errorText: {
    color: Colors.error,
  },
});
