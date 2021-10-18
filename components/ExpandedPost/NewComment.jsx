import React, { useState } from 'react';
import * as yup from 'yup';
import {
  KeyboardAvoidingView,
  StyleSheet,
  TouchableOpacity,
  Image,
  View,
  Platform,
  Alert,
} from 'react-native';
import PropTypes from 'prop-types';
import { useFormik } from 'formik';
import { useLocalization } from 'localization';
import { comment } from 'validation';
import { TransparentTextInputFormik } from 'common/Input';
import { PressableIcon } from 'common/Icon';
import { IconNames } from 'common/Icon/Icon';
import { Colors } from '../../styles';

const keyboardVerticalOffset = Platform.OS === 'ios' ? 100 : 0

function NewComment({profileImageURI, onSubmitHandleFunction}) {
  const { t } = useLocalization();
  const [isDisabeld, setDisabled] = useState(false)

  
  const formik = useFormik({
    initialValues: {
      commentText: '',
    },
    onSubmit: ({ commentText }) => {
      onSubmitHandleFunction(commentText)
    },
    validationSchema: yup.object().shape({
      commentText: comment(t),
    }),
  });

  const onPressHandler = () =>{
    setDisabled(true);
  }

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

        <PressableIcon pressableProps={{disabled:isDisabeld,onClick:onPressHandler}} name={IconNames.send} size={30} color={Colors.black} onPress={formik.handleSubmit}/>
        </View>
        <View style={{width:'100%',height:5}}/>
      </KeyboardAvoidingView>
    </View>
  );
}

export default NewComment;

NewComment.propTypes = {
  onSubmitHandleFunction: PropTypes.func.isRequired,
  profileImageURI: PropTypes.string.isRequired,
};

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
