import React, { useContext, useState, useRef, useEffect } from 'react';
import * as yup from 'yup';
import {
  Keyboard,
  KeyboardAvoidingView,
  StyleSheet,
  TouchableOpacity,
  Image,
  View,
  Platform
} from 'react-native';
import { useFormik } from 'formik';
import { LocalizationContext } from 'localization';
import { comment } from 'validation';
import { TransparentTextInputFormik } from 'common/Input';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Colors, Styles } from '../../styles';

function NewComment({profileImageURI}) {
  const { t } = useContext(LocalizationContext);
  const [text, setText] = useState('');

  const [keyboardOffset, setKeyboardOffset] = useState(false)
  const textInputRef = useRef(null)

  const keyboardVerticalOffset = Platform.OS === 'ios' ? 100 : 0
  
  useEffect(() => {
    console.log("OUTSIDE")
    if (textInputRef.current){
      console.log("WE'RE IN")
      textInputRef.current.focus()
    }
    setKeyboardOffset(true)
  }, [textInputRef.current])

  const formik = useFormik({
    initialValues: {
      commentText: '',
    },
    onSubmit: ({ commentText }) => {
      Alert.alert(`Comment: ${commentText}`);
    },
    validationSchema: yup.object().shape({
      commentText: comment(t),
    }),
  });

  return (
    <View>
      <KeyboardAvoidingView behavior="position" contentContainerStyle={styles.container}  keyboardVerticalOffset={keyboardVerticalOffset}>
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
            TextInputProps={{placeholder:t('Comment/Add'),ref:textInputRef}}
            hideTitle
            style={{
              flex:1,}}
          />

        <Icon name="send" size={30} color={Colors.black} />
      </KeyboardAvoidingView>
    </View>
  );
}

export default NewComment;

NewComment.propTypes = {};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    width: '100%',
    backgroundColor: Colors.background,
    paddingHorizontal: 10,
    paddingVertical:10,
    paddingTop:5,
    alignItems:'flex-start',
  },
  profileImage: {
    // borderRadius: 50,
    width: 20,
    // borderWidth: 0.1,
    // borderColor: 'black',
  },
});
