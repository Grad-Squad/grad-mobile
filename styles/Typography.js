import { StyleSheet } from 'react-native';
import Colors from './Colors';

const defaultFont = 'Lato_400Regular';

const forgotPasswordBase = {
  fontFamily: defaultFont,
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
    fontFamily: defaultFont,
    color: Colors.offBlack,
    fontSize: 20,
  },
});

export default {
  forgotPassword,
  userInput,
  defaultFont,
};
