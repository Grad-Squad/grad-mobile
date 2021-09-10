import React from 'react';
import Navigator from 'navigation/Navigator';
import EnterEmail from './EnterEmail';
import CheckEmail from './CheckEmail';
import SixDigit from './SixDigit/SixDigit';
import SixDigitFailed from './SixDigitFailed';
import NewPassword from './NewPassword';
import Done from './Done';

const screens = [
  {
    name: 'forgotPassword/enterEmail',
    component: EnterEmail,
  },
  {
    name: 'forgotPassword/checkEmail',
    component: CheckEmail,
  },
  {
    name: 'forgotPassword/sixDigit',
    component: SixDigit,
  },
  {
    name: 'forgotPassword/sixDigitFailed',
    component: SixDigitFailed,
  },
  {
    name: 'forgotPassword/newPassword',
    component: NewPassword,
  },
  {
    name: 'forgotPassword/done',
    component: Done,
  },
];

const ForgotPasswordNavigator = () => <Navigator screens={screens} />;

export default ForgotPasswordNavigator;
