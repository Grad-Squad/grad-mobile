import React, { useState } from 'react';
import Navigator from 'navigation/Navigator';
import * as yup from 'yup';
import { biography, roleRequired, roles } from 'validation';
import { useFormik } from 'formik';
import { useLocalization } from 'localization';
import { useAPIUpdateProfile } from 'api/endpoints/auth';
import { navigationPropType } from 'proptypes';
import ScreenNames from 'navigation/ScreenNames';
import { useStore } from 'globalStore/GlobalStore';
import ReducerActions from 'globalStore/ReducerActions';
import RequiredInfo from './RequiredInfo';
import OptionalInfo from './OptionalInfo';
import RollSelection from './RollSelection/RollSelection';
import RegisterContext from './RegisterContext';

const screens = [
  {
    name: ScreenNames.Register.REQUIRED_INFO,
    component: RequiredInfo,
  },
  {
    name: ScreenNames.Register.ROLL_SELECTION,
    component: RollSelection,
  },
  {
    name: ScreenNames.Register.OPTIONAL_INFO,
    component: OptionalInfo,
  },
];

const RegisterNavigation = ({ navigation }) => {
  const { t } = useLocalization();
  // const { headers } = useContext(AuthContext);
  const [profileId, setProfileId] = useState();
  const [, dispatch] = useStore();

  const updateProfileMutation = useAPIUpdateProfile({
    onSuccess: (data) => {
      navigation.reset({
        index: 0,
        routes: [{ name: ScreenNames.HOME }],
      });

      dispatch({
        type: ReducerActions.setProfileId,
        payload: profileId || data.id,
      });
    },
  });

  const formik = useFormik({
    initialValues: {
      role: roles.student,
      profilePicture: '',
      biography: '',
    },
    onSubmit: (profileInfo) => {

      // wait for upload
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
