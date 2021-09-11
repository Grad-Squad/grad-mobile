import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import Dev from 'components/Dev/Dev';
import HomeNavigation from 'components/Home/HomeNavigation';
import CreatePost from 'components/Home/CreatePost';
import ExpandedPost from 'components/ExpandedPost/ExpandedPost';
import Login from '../components/Login/Login';
import ForgotPasswordNavigator from '../components/ForgotPassword/ForgotPasswordNavigator';
import RegisterNavigation from '../components/Register/RegisterNavigation';
import Navigator from './Navigator';
import SolveMcq from 'components/Materials/Mcq/SolveMcq';
import AddFlashCards from 'components/Home/CreatePost/AddMaterial/AddFlashCards';
import AddMCQ from 'components/Home/CreatePost/AddMaterial/AddMCQ';
import AddPDF from 'components/Home/CreatePost/AddMaterial/AddPDF';
import AddImages from 'components/Home/CreatePost/AddMaterial/AddImages';
import AddVideo from 'components/Home/CreatePost/AddMaterial/AddVideo';

const screens = [
  {
    name: 'dev',
    component: Dev,
  },
  {
    name: 'home',
    component: HomeNavigation,
  },
  {
    name: 'login',
    component: Login,
  },
  {
    name: 'register',
    component: RegisterNavigation,
  },
  {
    name: 'forgotPassword',
    component: ForgotPasswordNavigator,
  },
  {
    name: 'post',
    component: ExpandedPost,
  },
  {
    name: 'createPost',
    component: CreatePost,
  },
  {
    name: 'solveMcq',
    component: SolveMcq,
  },
  {
    name: 'addFlashcards',
    component: AddFlashCards,
  },
  {
    name: 'addMCQ',
    component: AddMCQ,
  },
  {
    name: 'addPDF',
    component: AddPDF,
  },
  {
    name: 'addImages',
    component: AddImages,
  },
  {
    name: 'addVideo',
    component: AddVideo,
  },
];

const RootNavigator = () => (
  <NavigationContainer>
    <Navigator screens={screens} />
  </NavigationContainer>
);
export default RootNavigator;
