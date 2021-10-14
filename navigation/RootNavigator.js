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
import ScreenNames from './ScreenNames';
import Navigator from './Navigator';

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
];

const RootNavigator = () => (
  <NavigationContainer>
    <Navigator screens={screens} />
  </NavigationContainer>
);
export default RootNavigator;
