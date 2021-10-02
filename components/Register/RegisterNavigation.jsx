import React, { useContext, useState } from 'react';
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
// import { useMutation } from 'react-query';
// import { updateAccount } from 'api/useAccount';
import RequiredInfo from './RequiredInfo';
import OptionalInfo from './OptionalInfo';
import RollSelection from './RollSelection/RollSelection';
import RegisterContext from './RegisterContext';
// import { AuthContext } from 'api/axiosInstance';

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
  // const { headers } = useContext(AuthContext);
  const [profileId, setProfileId] = useState();

  // const addInfoMutation = useMutation(
  //   (userInfo) => updateAccount(userInfo, profileId, headers),
  //   {
  //     onError: () => {},
  //   }
  // );

  const formik = useFormik({
    initialValues: {
      role: roles.student,
      profileImage: '',
      bio: '',
    },
    onSubmit: (userInfo) => {
      Alert.alert('tes');
      // addInfoMutation.mutate(userInfo);
    },
    validationSchema: yup.object().shape({
      role: roleRequired(t),
      bio: biography(t),
    }),
  });
  return (
    // <RegisterContext.Provider value={formik}>
    <RegisterContext.Provider value={{ formik, profileId, setProfileId }}>
      <Navigator screens={screens} />
    </RegisterContext.Provider>
  );
};

export default RegisterNavigation;
