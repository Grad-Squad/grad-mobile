import React, { createContext, useContext, useState } from 'react';
import { childrenPropType } from 'proptypes';
import { Snackbar } from 'react-native-paper';
import { t } from 'i18n-js';
import EduText from 'common/EduText';
import { Colors } from 'styles';
import { Alert, StyleSheet } from 'react-native';

const BookmarkSavedSnackbarContext = createContext();

const BookmarkSavedSnackbarProvider = ({ children }) => {
  const [visible, setVisible] = useState(false);

  const [postId, setPostId] = useState(undefined);
  const [bookmarkId, setBookmarkId] = useState(undefined);

  const showBookmarkSavedSnackbar = (newPostId, NewBookmarkId) => {
    setPostId(newPostId);
    setBookmarkId(NewBookmarkId);
    setVisible(true);
  };

  return (
    <BookmarkSavedSnackbarContext.Provider
      value={{
        showBookmarkSavedSnackbar,
      }}
    >
      {children}
      <Snackbar
        visible={visible}
        onDismiss={() => setVisible(false)}
        action={{
          label: (
            <EduText style={styles.action}>
              {t('BookmarkSavedSnackbar/Change Folder')}
            </EduText>
          ),
          onPress: () => {
            console.log('pressed');
            Alert.alert('WIP');
          },
        }}
      >
        <EduText style={styles.text}>
          {t('BookmarkSavedSnackbar/Post saved')}
        </EduText>
      </Snackbar>
    </BookmarkSavedSnackbarContext.Provider>
  );
};

BookmarkSavedSnackbarProvider.propTypes = {
  children: childrenPropType.isRequired,
};
BookmarkSavedSnackbarProvider.defaultProps = {};

export default BookmarkSavedSnackbarProvider;

export const useBookmarkSavedSnackbar = () =>
  useContext(BookmarkSavedSnackbarContext);

const styles = StyleSheet.create({
  action: { color: Colors.accent },
  text: { color: Colors.white },
});
