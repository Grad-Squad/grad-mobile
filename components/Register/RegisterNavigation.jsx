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
import LoadingIndicator from 'common/LoadingIndicator';
import { useAPIgetS3UploadImageLinks, useAPIUploadImage } from 'api/endpoints/s3';
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

  const [isS3LinkEnabled, setIsS3LinkEnabled] = useState(false)

  const uploadImageMutation = useAPIUploadImage();

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

  const {
    data: uploadLinkData,
    isSuccess: gettingUploadLinkSucceeded,
    refetch: refetchUploadLink,
    isLoadingUploadLink
  } = useAPIgetS3UploadImageLinks(1,{
    enabled: isS3LinkEnabled,
    onSuccess: (data) => {
        const payload = {
          payload: {
            ...data[0].fields,
            'content-type': 'image/jpeg',
            file: {
              uri: formik.values.profilePicture.uri,
              name: formik.values.profilePicture.fileName,
              type: 'image/jpeg',
            },
          },
        };
        uploadImageMutation.mutate(payload, {
          onSuccess: () => {
            const IMAGEOBJ = {key: data[0].fields.key, type: 'image'}
            const dataToSend = {...formik.values}
            dataToSend.profilePicture = {...IMAGEOBJ}
            updateProfileMutation.mutate({ profileInfo: dataToSend, profileId });
          },
          onError: () => {
            // TODO retry
          },
      });
    },
    onError: () => {},
    onSettled: () =>{},
  });

  const formik = useFormik({
    initialValues: {
      role: roles.student,
      profilePicture: null,
      biography: '',
    },
    onSubmit: (profileInfo) => {
      updateMutationFunction(profileInfo)
    },
    validationSchema: yup.object().shape({
      role: roleRequired(t),
      biography: biography(t),
    }),
  });

  const updateMutationFunction = (proData) =>{
    const datasToSend = {...proData}
    if(proData?.profilePicture){
      setIsS3LinkEnabled(true)
    }else{
      datasToSend.profilePicture = ''
      updateProfileMutation.mutate({ datasToSend, profileId });
    }
  }

  return (
    // <RegisterContext.Provider value={formik}>
    <RegisterContext.Provider value={{ formik, profileId, setProfileId }}>
      {
        updateProfileMutation.isLoading || uploadImageMutation.isLoading || isLoadingUploadLink
        ?
        <LoadingIndicator fullScreen/>
        :
        <Navigator screens={screens} />
      }
    </RegisterContext.Provider>
  );
};

RegisterNavigation.propTypes = {
  navigation: navigationPropType.isRequired,
};

export default RegisterNavigation;
