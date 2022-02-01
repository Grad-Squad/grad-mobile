import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, View } from 'react-native';
import BottomSheet from '@gorhom/bottom-sheet';
import { MainActionButton, TransparentButton } from 'common/Input/Button';
import { useErrorSnackbar } from 'common/ErrorSnackbar/ErrorSnackbarProvider';
import { useLocalization } from 'localization';
import {
  getBookmarksFolderQueryKey,
  useCreateBookmarksFolder,
  useUpdateBookmarksFolder,
} from 'api/endpoints/bookmarks';
import { useFormik } from 'formik';
import { TransparentTextInputFormik } from 'common/Input';
import * as yup from 'yup';
import { maxCharError, requiredError } from 'validation';
import EduText from 'common/EduText';
import { Switch } from 'react-native-paper';
import { Colors } from 'styles';
import { queryClient } from 'components/ReactQueryClient/ReactQueryClient';
import { bookmarksFolderPropType } from 'proptypes';

const snapPoints = ['36%'];

const AddFolderBottomSheet = ({
  bottomSheetRef,
  profileId,
  parentBookmarkId,
  inRootBookmark,
  itemToEdit,
  deselectFolder,
}) => {
  const { t } = useLocalization();

  const { showErrorSnackbar } = useErrorSnackbar();

  const createBookmarksFolderMutation = useCreateBookmarksFolder({
    onSuccess: (data) => {
      queryClient.setQueryData(
        getBookmarksFolderQueryKey(
          profileId,
          inRootBookmark ? undefined : parentBookmarkId
        ),
        (oldData) => [
          {
            ...oldData[0],
            folders: [...oldData[0].folders, data],
          },
        ]
      );

      bottomSheetRef.current.close();
    },
    onError: () => {
      showErrorSnackbar(
        t(
          "BookmarksList/CreateBookmarksFolder/Couldn't Create Folder, Try again"
        )
      );
    },
  });
  const updateBookmarksFolderMutation = useUpdateBookmarksFolder({
    onSuccess: (data) => {
      queryClient.setQueryData(
        getBookmarksFolderQueryKey(
          profileId,
          inRootBookmark ? undefined : parentBookmarkId
        ),
        (oldData) => {
          const folders = [...oldData[0].folders];
          const indexOfUpdatedFolder = folders.findIndex(
            (item) => item.id === data.id
          );
          folders[indexOfUpdatedFolder] = data;
          return [
            {
              ...oldData[0],
              folders,
            },
          ];
        }
      );
      bottomSheetRef.current.close();
    },
    onError: () => {
      showErrorSnackbar(
        t(
          "BookmarksList/CreateBookmarksFolder/Couldn't Update Folder, Try again"
        )
      );
    },
  });

  const formik = useFormik({
    initialValues: {
      title: itemToEdit?.title || '',
      isPublic: itemToEdit?.isPublic || true,
    },
    enableReinitialize: true,
    initialErrors: { title: false },
    onSubmit: ({ title, isPublic }) => {
      if (itemToEdit) {
        updateBookmarksFolderMutation.mutate({
          profileId,
          bookmarkId: itemToEdit.id,
          body: {
            title,
            isPublic,
          },
        });
      } else {
        createBookmarksFolderMutation.mutate({
          profileId,
          title,
          parentBookmarkId,
          isPublic,
        });
      }
    },
    validationSchema: yup.object().shape({
      title: yup
        .string()
        .trim()
        .max(320, maxCharError(t, 320))
        .required(requiredError(t)),
    }),
  });

  return (
    <BottomSheet
      ref={bottomSheetRef}
      index={-1}
      snapPoints={snapPoints}
      enablePanDownToClose
      onChange={(index) => {
        if (index === -1) {
          deselectFolder();
          formik.resetForm();
        }
      }}
    >
      <View style={styles.container}>
        <EduText style={styles.header}>
          {t('BookmarksList/CreateBookmarksFolder/Create Folder')}
        </EduText>
        <TransparentTextInputFormik
          formik={formik}
          formikKey="title"
          title={t('BookmarksList/CreateBookmarksFolder/Folder Title')}
        />
        <View style={styles.switchRow}>
          <EduText style={styles.switchLabel}>
            {t('BookmarksList/CreateBookmarksFolder/Public')}
          </EduText>
          <Switch
            color={Colors.accent}
            value={formik.values.isPublic}
            onValueChange={() =>
              formik.setFieldValue('isPublic', !formik.values.isPublic)
            }
          />
        </View>
        <View style={styles.actionsRow}>
          <TransparentButton
            text={t('BookmarksList/CreateBookmarksFolder/Cancel')}
            onPress={() => bottomSheetRef.current.close()}
            style={styles.closeButton}
          />
          <MainActionButton
            text={
              itemToEdit
                ? t('BookmarksList/CreateBookmarksFolder/Edit')
                : t('BookmarksList/CreateBookmarksFolder/Create')
            }
            onPress={formik.handleSubmit}
            style={styles.createButton}
            disabled={!formik.isValid}
            loading={
              formik.isSubmitting || createBookmarksFolderMutation.isLoading
            }
          />
        </View>
      </View>
    </BottomSheet>
  );
};

AddFolderBottomSheet.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  bottomSheetRef: PropTypes.object.isRequired,
  profileId: PropTypes.number.isRequired,
  parentBookmarkId: PropTypes.number.isRequired,
  inRootBookmark: PropTypes.bool.isRequired,
  itemToEdit: bookmarksFolderPropType,
  deselectFolder: PropTypes.func.isRequired,
};
AddFolderBottomSheet.defaultProps = { itemToEdit: undefined };

export default React.memo(AddFolderBottomSheet);

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 15,
    flex: 1,
  },
  header: {
    fontSize: 26,
    fontFamily: 'Poppins_400Regular',
  },
  switchRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',

    marginVertical: 15,
    marginHorizontal: 5,
  },
  switchLabel: {
    fontSize: 22,
  },
  actionsRow: {
    flexDirection: 'row',

    marginHorizontal: 10,
    marginVertical: 15,
  },
  closeButton: {
    flex: 1,
  },
  createButton: {
    flex: 3,
    marginLeft: 10,
  },
});
