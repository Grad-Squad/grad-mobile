import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, TouchableOpacity, View, Image } from 'react-native';
import Page from 'common/Page/Page';
import MaterialCreateHeader from 'common/MaterialHeader/MaterialCreateHeader';
import { useLocalization } from 'localization';
// eslint-disable-next-line import/no-extraneous-dependencies
import { useNavigation } from '@react-navigation/core';
import { TransparentTextInputFormik } from 'common/Input';
import { PressableIcon } from 'common/Icon';
import { IconNames } from 'common/Icon/Icon';
import EduText from 'common/EduText';
import * as yup from 'yup';
import useOnGoBackDiscardWarning from 'navigation/useOnGoBackDiscardWarning';
import { materialTitle } from 'validation';
import ReducerActions from 'globalStore/ReducerActions';
import { useFormik } from 'formik';
import { useStore } from 'globalStore/GlobalStore';
import { MaterialTypes } from 'constants';
import { routeParamPropType } from 'proptypes';
import { Styles } from 'styles';
import ImageSelector from 'common/ImageSelector';
import DraggableFlatList, {
  OpacityDecorator,
  ScaleDecorator,
  ShadowDecorator,
  useOnCellActiveAnimation,
} from 'react-native-draggable-flatlist';
import Animated from 'react-native-reanimated';

const renderItem = ({ item, drag }) => {
  const { isActive } = useOnCellActiveAnimation();

  return (
    <ScaleDecorator>
      <OpacityDecorator activeOpacity={1}>
        <ShadowDecorator>
          <TouchableOpacity
            activeOpacity={1}
            style={[
              {
                opacity: isActive ? 0.8 : 1,
                elevation: isActive ? 30 : 0,
              },
            ]}
            onLongPress={drag}
          >
            <Animated.View>
              <Image
                source={{
                  uri: item.uri,
                }}
                style={
                  {
                    width: item.width,
                    height: item.height,
                  }
                }
              />
            </Animated.View>
          </TouchableOpacity>
        </ShadowDecorator>
      </OpacityDecorator>
    </ScaleDecorator>
  );
};

const AddImages = ({ route }) => {
  const editIndex = route?.params?.index;

  const { t } = useLocalization();
  const navigation = useNavigation();

  const [state, dispatch] = useStore();

  const editImages = state.createPost.materialList[editIndex];

  const formik = useFormik({
    initialValues: {
      imagesTitle: editImages?.pdfTitle ?? '',
      images: editImages?.images ?? [],
    },
    onSubmit: (images) => {
      if (editIndex === undefined) {
        dispatch({
          type: ReducerActions.addCreateMaterialItem,
          payload: { ...images, type: MaterialTypes.Images },
        });
      } else {
        dispatch({
          type: ReducerActions.replaceCreateMaterialItem,
          payload: {
            index: editIndex,
            material: { ...images, type: MaterialTypes.Images },
          },
        });
      }
      navigation.goBack();
    },
    validationSchema: yup.object().shape({
      imagesTitle: materialTitle(t),
      images: yup.array().min(1, t('AddMaterial/Please add a file')),
    }),
  });
  const attemptSubmit = () => {
    formik.setFieldTouched('images', true);
    formik.handleSubmit();
  };

  useOnGoBackDiscardWarning(
    (!formik.dirty && !formik.values.images.length) || formik.isSubmitting,
    [formik.dirty, formik.isSubmitting, formik.values.images.length]
  );

  return (
    <Page>
      <MaterialCreateHeader
        title={t('AddMaterial/Images/Add Images')}
        rightButtonText={t('AddMaterial/Finish')}
        onPress={attemptSubmit}
        onBackPress={() => {
          navigation.goBack();
        }}
      />
      <TransparentTextInputFormik
        formik={formik}
        formikKey="imagesTitle"
        title={t('AddMaterial/Images/Images Title')}
      />

      <DraggableFlatList
        ListHeaderComponent={
          <>
            <View style={styles.addImageButtons}>
              <ImageSelector
                size={70}
                setImage={(image) => {
                  formik.values.images.push(image);
                  formik.setFieldValue('images', formik.values.images);
                }}
              />
              <PressableIcon
                name={IconNames.cameraPlus}
                size={70}
                onPress={() => {}} // todo
                pressableProps={{
                  style: {
                    marginLeft: 15,
                  },
                }}
              />
            </View>
            {formik.touched.images && formik.errors.images && (
              <EduText style={Styles.errorText}>{formik.errors.images}</EduText>
            )}

            {!!formik.values.images.length && (
              <EduText style={styles.instructions}>
                {t(
                  'AddMaterial/Images/Press and hold to reorder, Swipe right to delete'
                )}
              </EduText>
            )}
          </>
        }
        data={formik.values.images}
        onDragEnd={({ data: newData }) =>
          formik.setFieldValue('images', newData)
        }
        keyExtractor={(item) => item.uri}
        renderItem={renderItem}
        renderPlaceholder={() => <View style={{ flex: 1 }} />}
      />
    </Page>
  );
};

AddImages.propTypes = {
  route: routeParamPropType(
    PropTypes.shape({ index: PropTypes.number.isRequired })
  ),
};
AddImages.defaultProps = { route: undefined };

export default AddImages;

const styles = StyleSheet.create({
  addImageButtons: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: 15,
  },
  instructions: {
    fontFamily: 'Lato_300Light',
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 5,
  },
});
