import { StyleSheet } from 'react-native';
import Colors from './Colors';
import Constants from './Constants';

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
    zIndex: -3,
  },
});

export default Styles;
