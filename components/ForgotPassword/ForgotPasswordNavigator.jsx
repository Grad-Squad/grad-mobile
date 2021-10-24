import React from 'react';
import Navigator from 'navigation/Navigator';
import EnterEmail from './EnterEmail';
import CheckEmail from './CheckEmail';
import SixDigit from './SixDigit/SixDigit';
import SixDigitFailed from './SixDigitFailed';
import NewPassword from './NewPassword';
import Done from './Done';
import ScreenNames from 'navigation/ScreenNames';

const screens = [
  {
    name: ScreenNames.ForgotPassword.ENTER_EMAIL,
    component: EnterEmail,
  },
  {
    name: ScreenNames.ForgotPassword.CHECK_EMAIL,
    component: CheckEmail,
  },
  {
    name: ScreenNames.ForgotPassword.SIX_DIGIT,
    component: SixDigit,
  },
  {
    name: ScreenNames.ForgotPassword.SIX_DIGIT_FAILED,
    component: SixDigitFailed,
  },
  {
    name: ScreenNames.ForgotPassword.NEW_PASSWORD,
    component: NewPassword,
  },
  {
    name: ScreenNames.ForgotPassword.DONE,
    component: Done,
  },
];

const ForgotPasswordNavigator = () => <Navigator screens={screens} />;

export default ForgotPasswordNavigator;
