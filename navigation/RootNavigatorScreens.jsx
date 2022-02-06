import React from 'react';
import { useAxios } from 'api/AxiosProvider';
import SolveFlashcard from 'components/Materials/Flashcard/SolveFlashcard';
import ViewImages from 'components/Materials/ViewImages';
import Profile from 'components/Profile/Profile';
import Followers from 'components/Profile/Followers';
import ViewPdf from 'components/Materials/ViewPdf';
import ViewVideo from 'components/Materials/ViewVideo';
import HomeNavigation from 'components/Home/HomeNavigation';
import CreatePost from 'components/Home/CreatePost';
import ExpandedPost from 'components/ExpandedPost/ExpandedPost';
import SolveMcq from 'components/Materials/Mcq/SolveMcq';
import ReviewMcq from 'components/Materials/Mcq/ReviewMcq';
import AddFlashCards from 'components/Home/CreatePost/AddMaterial/AddFlashcards/AddFlashcards';
import AddPDF from 'components/Home/CreatePost/AddMaterial/AddPDF';
import AddImages from 'components/Home/CreatePost/AddMaterial/AddImages';
import AddVideo from 'components/Home/CreatePost/AddMaterial/AddVideo';
import Login from 'components/Login/Login';
import RegisterNavigation from 'components/Register/RegisterNavigation';
import ForgotPasswordNavigator from 'components/ForgotPassword/ForgotPasswordNavigator';
import AddMCQ from 'components/Home/CreatePost/AddMaterial/AddMCQ/AddMCQ';
import SearchViewPage from 'components/Search/SearchNavTab';
import SearchMainPage from 'components/Search/SearchMainPage';
import MoveBookmark from 'components/Bookmarks/MoveBookmark';
import ReviewFlashcards from 'components/Materials/Flashcard/ReviewFlashcards';
import ChangeInterests from 'components/Home/Options/SubScreens/ChangeInterests';
import ChangeLanguage from 'components/Home/Options/SubScreens/ChangeLanguage';
import Navigator from './Navigator';
import ScreenNames from './ScreenNames';

const screens = [
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
    getId: ({ params }) => params.postID,
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
    name: ScreenNames.VIEW_PDF,
    component: ViewPdf,
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
    name: ScreenNames.VIEW_VIDEO,
    component: ViewVideo,
  },
  {
    name: ScreenNames.PROFILE,
    component: Profile,
    getId: ({ params }) => params.profileId,
  },
  {
    name: ScreenNames.FOLLOWERS,
    component: Followers,
  },
  {
    name: ScreenNames.MOVE_BOOKMARK,
    component: MoveBookmark,
    presentation: 'modal',
  },
  {
    name: ScreenNames.SEARCHMAIN,
    component: SearchMainPage,
  },
  {
    name: ScreenNames.SEARCHVIEW,
    component: SearchViewPage,
  },
  {
    name: ScreenNames.FLASHCARDS_REVIEW,
    component: ReviewFlashcards,
  },
  {
    name: ScreenNames.Options.CHANGE_INTERESTS,
    component: ChangeInterests,
  },
  {
    name: ScreenNames.Options.CHANGE_LANGUAGE,
    component: ChangeLanguage,
  },
];

const RootNavigatorScreens = () => {
  const { isLoggedIn } = useAxios();
  return (
    <Navigator
      screens={screens}
      initialRouteName={isLoggedIn ? ScreenNames.HOME : ScreenNames.LOGIN}
    />
  );
};

RootNavigatorScreens.propTypes = {};
RootNavigatorScreens.defaultProps = {};

export default RootNavigatorScreens;
