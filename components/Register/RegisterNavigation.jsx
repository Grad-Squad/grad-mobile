import React, { useContext } from 'react';
import Navigator from 'navigation/Navigator';
import * as yup from 'yup';
import {
  biography,
  emailRequired,
  nameRequired,
  passwordRequired,
  roleRequired,
  roles,
} from 'validation';
import { useFormik } from 'formik';
import { LocalizationContext } from 'localization';
import { Alert } from 'react-native';
import RequiredInfo from './RequiredInfo';
import OptionalInfo from './OptionalInfo';
import RollSelection from './RollSelection/RollSelection';
import RegisterContext from './RegisterContext';

const screens = [
  {
    name: 'register/requiredInfo',
    component: RequiredInfo,
  },
  {
    name: 'register/rollSelection',
    component: RollSelection,
  },
  {
    name: 'register/optionalInfo',
    component: OptionalInfo,
  },
];

const RegisterNavigation = () => {
  const { t } = useContext(LocalizationContext);

  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      password: '',
      role: roles.student,
      profileImage: '',
      bio: '',
    },
    onSubmit: (user) => {
      Alert.alert('register submit');
    },
    validationSchema: yup.object().shape({
      name: nameRequired(t),
      email: emailRequired(t),
      password: passwordRequired(t),
      role: roleRequired(t),
      bio: biography(t),
    }),
  });
  return (
    <RegisterContext.Provider value={formik}>
      <Navigator screens={screens} />
    </RegisterContext.Provider>
  );
};

export default RegisterNavigation;
