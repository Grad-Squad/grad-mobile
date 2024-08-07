import React, { useEffect } from 'react';
import * as yup from 'yup';
import {
  KeyboardAvoidingView,
  StyleSheet,
  TouchableOpacity,
  Image,
  View,
  Platform,
} from 'react-native';
import PropTypes from 'prop-types';
import { useFormik } from 'formik';
import { useLocalization } from 'localization';
import { comment } from 'validation';
import { TransparentTextInputFormik } from 'common/Input';
import { PressableIcon } from 'common/Icon';
import { IconNames } from 'common/Icon/Icon';
import { Colors } from '../../styles';

const keyboardVerticalOffset = Platform.OS === 'ios' ? 100 : 0;

function NewComment({
  initialText,
  profileImageURI,
  onSubmit,
  isLoading,
  isWritingCommentEnabled,
}) {
  const { t, isRTL } = useLocalization();

  const formik = useFormik({
    initialValues: {
      commentText: '',
    },
    onSubmit: ({ commentText }) => {
      onSubmit(commentText);
    },
    validationSchema: yup.object().shape({
      commentText: comment(t),
    }),
  });

  useEffect(() => {
    if (initialText) {
      formik.setFieldValue('commentText', initialText, false);
    }
  }, [initialText]);

  return (
    <View>
      <KeyboardAvoidingView
        behavior="padding"
        style={styles.container}
        keyboardVerticalOffset={keyboardVerticalOffset}
      >
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <TouchableOpacity>
            <Image
              style={styles.profileImage}
              source={{
                uri: profileImageURI,
              }}
              resizeMode="cover"
            />
          </TouchableOpacity>

          <TransparentTextInputFormik
            formik={formik}
            formikKey="commentText"
            TextInputProps={{
              placeholder: t('Comment/Add'),
              autoFocus: true,
              multiline: true,
            }}
            hideTitle
            style={{
              flex: 1,
            }}
          />

          <PressableIcon
            pressableProps={{
              disabled: isLoading || !isWritingCommentEnabled,
            }}
            color={
              isLoading || !isWritingCommentEnabled ? Colors.grey : Colors.black
            }
            name={IconNames.send}
            size={30}
            // color={Colors.black}
            onPress={formik.handleSubmit}
            style={isRTL && styles.rotate180}
          />
        </View>
        <View style={{ width: '100%', height: 5 }} />
      </KeyboardAvoidingView>
    </View>
  );
}

export default NewComment;

NewComment.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  profileImageURI: PropTypes.string,
  isLoading: PropTypes.bool.isRequired,
  isWritingCommentEnabled: PropTypes.bool.isRequired,
  initialText: PropTypes.string,
};
NewComment.defaultProps = {
  profileImageURI:
    'https://isobarscience.com/wp-content/uploads/2020/09/default-profile-picture1.jpg',
  initialText: '',
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    backgroundColor: Colors.background,
    paddingHorizontal: 10,
    paddingVertical: 10,
    paddingTop: 5,
    alignItems: 'center',
  },
  profileImage: {
    borderRadius: 50,
    width: 30,
    height: 30,
    borderWidth: 0.1,
    borderColor: 'black',
    alignSelf: 'center',
  },
  rotate180: {
    transform: [{ rotateY: '180deg' }],
  },
});
