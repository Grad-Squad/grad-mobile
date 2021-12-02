import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import Dev from 'components/Dev/Dev';
import HomeNavigation from 'components/Home/HomeNavigation';
import CreatePost from 'components/Home/CreatePost';
import ExpandedPost from 'components/ExpandedPost/ExpandedPost';
import SolveMcq from 'components/Materials/Mcq/SolveMcq';
import ReviewMcq from 'components/Materials/Mcq/ReviewMcq';
import AddFlashCards from 'components/Home/CreatePost/AddMaterial/AddFlashCards';
import AddPDF from 'components/Home/CreatePost/AddMaterial/AddPDF';
import AddImages from 'components/Home/CreatePost/AddMaterial/AddImages';
import AddVideo from 'components/Home/CreatePost/AddMaterial/AddVideo';
import Login from 'components/Login/Login';
import RegisterNavigation from 'components/Register/RegisterNavigation';
import ForgotPasswordNavigator from 'components/ForgotPassword/ForgotPasswordNavigator';
import AddMCQ from 'components/Home/CreatePost/AddMaterial/AddMCQ/AddMCQ';
import AsyncStorage from '@react-native-async-storage/async-storage';
import localStorageKeys from 'localStorageKeys';
import { Linking, Platform } from 'react-native';
import LoadingIndicator from 'common/LoadingIndicator';
import SolveFlashcard from 'components/Materials/Flashcard/SolveFlashcard';
import ScreenNames from './ScreenNames';
import Navigator from './Navigator';
import ViewImages from 'components/Materials/ViewImages';
import Profile from 'components/Profile/Profile';
import Followers from 'components/Profile/Followers';

const screens = [
  {
    name: ScreenNames.DEV,
    component: Dev,
  },
  {
    name: ScreenNames.HOME,
    component: HomeNavigation,
  },
  {
    name: ScreenNames.LOGIN,
    component: Login,
  },
  {
    name: ScreenNames.REGISTER,
    component: RegisterNavigation,
  },
  {
    name: ScreenNames.FORGOT_PASSWORD,
    component: ForgotPasswordNavigator,
  },
  {
    name: ScreenNames.POST,
    component: ExpandedPost,
  },
  {
    name: ScreenNames.CREATE_POST,
    component: CreatePost,
  },
  {
    name: ScreenNames.SOLVE_MCQ,
    component: SolveMcq,
  },
  {
    name: ScreenNames.SOLVE_FLASHCARD,
    component: SolveFlashcard,
  },
  {
    name: ScreenNames.REVIEW_MCQ,
    component: ReviewMcq,
  },
  {
    name: ScreenNames.ADD_FLASHCARDS,
    component: AddFlashCards,
  },
  {
    name: ScreenNames.ADD_MCQ,
    component: AddMCQ,
  },
  {
    name: ScreenNames.ADD_PDF,
    component: AddPDF,
  },
  {
    name: ScreenNames.ADD_IMAGES,
    component: AddImages,
  },
  {
    name: ScreenNames.ADD_VIDEO,
    component: AddVideo,
  },
  {
    name: ScreenNames.VIEW_IMAGES,
    component: ViewImages,
  },
  {
    name: ScreenNames.PROFILE,
    component: Profile,
  },
  {
    name: ScreenNames.FOLLOWERS,
    component: Followers,
  },
];

const RootNavigator = () => {
  const [isReady, setIsReady] = React.useState(false);
  const [initialState, setInitialState] = React.useState();

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
            setInitialState(state);
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
    <NavigationContainer
      initialState={initialState}
      onStateChange={(state) =>
        AsyncStorage.setItem(localStorageKeys.nav_state, JSON.stringify(state))
      }
    >
      <Navigator screens={screens} />
    </NavigationContainer>
  );
};
export default RootNavigator;
