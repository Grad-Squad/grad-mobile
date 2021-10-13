import React, { useContext, useState } from 'react';
import Navigator from 'navigation/Navigator';
import * as yup from 'yup';
import { biography, roleRequired, roles } from 'validation';
import { useFormik } from 'formik';
import { LocalizationContext } from 'localization';
import { useAPIUpdateProfile } from 'api/endpoints/auth';
import { navigationPropType } from 'proptypes';
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

const RegisterNavigation = ({ navigation }) => {
  const { t } = useContext(LocalizationContext);
  // const { headers } = useContext(AuthContext);
  const [profileId, setProfileId] = useState();

  const updateProfileMutation = useAPIUpdateProfile({
    onSuccess: () =>
      navigation.reset({
        index: 0,
        routes: [{ name: 'home' }],
      }),
  });

  const formik = useFormik({
    initialValues: {
      role: roles.student,
      profileImage: '',
      biography: '',
    },
    onSubmit: (profileInfo) => {
      updateProfileMutation.mutate({ profileInfo, profileId });
    },
    validationSchema: yup.object().shape({
      role: roleRequired(t),
      biography: biography(t),
    }),
  });
  return (
    // <RegisterContext.Provider value={formik}>
    <RegisterContext.Provider value={{ formik, profileId, setProfileId }}>
      <Navigator screens={screens} />
    </RegisterContext.Provider>
  );
};

RegisterNavigation.propTypes = {
  navigation: navigationPropType.isRequired,
};

export default RegisterNavigation;
