import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import Dev from 'components/Dev/Dev';
import HomeNavigation from 'components/Home/HomeNavigation';
import CreatePost from 'components/Home/CreatePost';
import ExpandedPost from 'components/ExpandedPost/ExpandedPost';
import SolveMcq from 'components/Materials/Mcq/SolveMcq';
import ReviewMcq from 'components/Materials/Mcq/ReviewMcq';
import Login from '../components/Login/Login';
import ForgotPasswordNavigator from '../components/ForgotPassword/ForgotPasswordNavigator';
import RegisterNavigation from '../components/Register/RegisterNavigation';
import Navigator from './Navigator';

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
    presentation: 'modal',
  },
  {
    name: 'solveMcq',
    component: SolveMcq,
  },
  {
    name: 'reviewMcq',
    component: ReviewMcq,
  },
];

const RootNavigator = () => (
  <NavigationContainer>
    <Navigator screens={screens} />
  </NavigationContainer>
);
export default RootNavigator;
