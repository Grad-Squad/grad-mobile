import { StyleSheet } from 'react-native';
import { Fonts } from 'styles';
import Colors from './Colors';

const forgotPasswordBase = {
  fontFamily: Fonts.default,
  textAlign: 'center',
};

const forgotPassword = StyleSheet.create({
  bigHeader: {
    ...forgotPasswordBase,
    fontSize: 36,
  },
  header: {
    ...forgotPasswordBase,
    fontSize: 21,
  },
  subtitle: {
    ...forgotPasswordBase,
    fontSize: 13,
  },
});
const userInput = StyleSheet.create({
  title: {
    marginLeft: 5,
    fontFamily: Fonts.default,
    color: Colors.offBlack,
    fontSize: 20,
  },
});

export default {
  forgotPassword,
  userInput,
};
