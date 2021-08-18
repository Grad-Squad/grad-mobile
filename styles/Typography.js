import { StyleSheet } from 'react-native';

const base = {
  fontFamily: 'Lato_400Regular',
  textAlign: 'center',
};

const forgotPassword = StyleSheet.create({
  bigHeader: {
    ...base,
    fontSize: 36,
  },
  header: {
    ...base,
    fontSize: 21,
  },
  subtitle: {
    ...base,
    fontSize: 13,
  },
});

export default {
  forgotPassword,
};
