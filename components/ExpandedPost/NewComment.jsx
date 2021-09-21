import React, { useContext, useState, useRef, useEffect } from 'react';
import * as yup from 'yup';
import {
  Keyboard,
  KeyboardAvoidingView,
  StyleSheet,
  TouchableOpacity,
  Image,
  View,
  Platform,
  Alert
} from 'react-native';
import { useFormik } from 'formik';
import { LocalizationContext } from 'localization';
import { comment } from 'validation';
import { TransparentTextInputFormik } from 'common/Input';
import { PressableIcon } from 'common/Icon';
import { Colors, Styles } from '../../styles';

function NewComment({profileImageURI}) {
  const { t } = useContext(LocalizationContext);

  const keyboardVerticalOffset = Platform.OS === 'ios' ? 100 : 0

  const formik = useFormik({
    initialValues: {
      commentText: '',
    },
    onSubmit: ({ commentText }) => {
      Alert.alert(`Comment: ${commentText}`); //TODO submit comment behavior
    },
    validationSchema: yup.object().shape({
      commentText: comment(t),
    }),
  });

  return (
    <View>
      <KeyboardAvoidingView behavior="padding" style={styles.container}  keyboardVerticalOffset={keyboardVerticalOffset}>
        <View style={{flexDirection:'row',alignItems:'center'}}>
        <TouchableOpacity>
          <Image
            style={styles.profileImage}
            source={{
              uri: profileImageURI,
            }}
          />
        </TouchableOpacity>

          <TransparentTextInputFormik
            formik={formik}
            formikKey="commentText"
            TextInputProps={{placeholder:t('Comment/Add'), autoFocus:true, multiline:true}}
            hideTitle
            style={{
              flex:1,}}
          />

        <PressableIcon name="send" size={30} color={Colors.black} onPress={formik.handleSubmit}/>
        </View>
        <View style={{width:'100%',height:5}}/>
      </KeyboardAvoidingView>
    </View>
  );
}

export default NewComment;

NewComment.propTypes = {};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    backgroundColor: Colors.background,
    paddingHorizontal: 10,
    paddingVertical:10,
    paddingTop:5,
    alignItems:'center',
  },
  profileImage: {
    borderRadius: 50,
    width: 30,
    height:30,
    borderWidth: 0.1,
    borderColor: 'black',
  },
});
