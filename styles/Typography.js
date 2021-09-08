import { StyleSheet } from 'react-native';
import Colors from './Colors';

const forgotPasswordBase = {
  fontFamily: 'Lato_400Regular',
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
    fontFamily: 'Lato_400Regular',
    color: Colors.offBlack,
    fontSize: 20,
  },
});

export default {
  forgotPassword,
  userInput,
};
