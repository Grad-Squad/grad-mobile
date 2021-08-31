import { StyleSheet } from 'react-native';
import Colors from './Colors';
import Constants from './Constants';
import Fonts from './Fonts';

const dropShadow = {
  shadowColor: Colors.black,
  shadowOffset: {
    width: 1,
    height: 1,
  },
  shadowOpacity: 0.25,
  shadowRadius: 2,
  elevation: 3,
};
const cardBase = {
  ...dropShadow,
  borderRadius: Constants.borderRadius,
};

const Styles = StyleSheet.create({
  dropShadow,
  cardBody: {
    ...cardBase,
    backgroundColor: Colors.cardBody,
  },
  cardFooter: {
    ...cardBase,
    backgroundColor: Colors.cardFooter,
  },
  textInput: {
    borderColor: Colors.border,
    borderRadius: Constants.borderRadius,
    borderWidth: 0.4,
    backgroundColor: Colors.white,
    fontFamily: Fonts.default,
    minHeight: 40,
  },
  textInputError: {
    borderColor: Colors.error,
    borderWidth: 1,
  },
});

export default Styles;
