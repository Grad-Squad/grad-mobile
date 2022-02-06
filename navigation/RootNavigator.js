import React from 'react';
import {
  NavigationContainer,
  useNavigationContainerRef,
} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import localStorageKeys from 'localStorageKeys';
import { Linking, Platform } from 'react-native';
import LoadingIndicator from 'common/LoadingIndicator';
import Feedback from 'components/Feedback/Feedback';
import AxiosProvider from 'api/AxiosProvider';
import BookmarkSavedSnackbarProvider from 'components/BookmarkSavedSnackbar/BookmarkSavedSnackbarProvider';
import RootNavigatorScreens from './RootNavigatorScreens';

const RootNavigator = () => {
  const [isReady, setIsReady] = React.useState(!__DEV__);
  const [initialState, setInitialState] = React.useState();
  const navigationRef = useNavigationContainerRef();

  React.useEffect(() => {
    const restoreState = async () => {
      try {
        const initialUrl = await Linking.getInitialURL();

        if (Platform.OS !== 'web' && initialUrl == null) {
          // Only restore state if there's no deep link and we're not on web
          const savedStateString = await AsyncStorage.getItem(
            localStorageKeys.nav_state
          );
          const state = savedStateString
            ? JSON.parse(savedStateString)
            : undefined;

          if (state !== undefined) {
            // setInitialState(state);
            // setInitialState(state);
          }
        }
      } finally {
        setIsReady(true);
      }
    };

    if (!isReady) {
      restoreState();
    }
  }, [isReady]);

  if (!isReady) {
    return <LoadingIndicator fullScreen size="large" />;
  }
  return (
    <>
      <AxiosProvider navigationRef={navigationRef}>
        <BookmarkSavedSnackbarProvider navigationRef={navigationRef}>
          <Feedback navigationRef={navigationRef} />
          <NavigationContainer
            ref={navigationRef}
            initialState={initialState}
            onStateChange={(state) =>
              AsyncStorage.setItem(
                localStorageKeys.nav_state,
                JSON.stringify(state)
              )
            }
          >
            <RootNavigatorScreens />
          </NavigationContainer>
        </BookmarkSavedSnackbarProvider>
      </AxiosProvider>
    </>
  );
};
export default RootNavigator;
