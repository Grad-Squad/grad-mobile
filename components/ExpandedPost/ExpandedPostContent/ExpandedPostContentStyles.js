import { StyleSheet } from 'react-native';
import { Colors, Constants, Styles } from 'styles';

export default StyleSheet.create({
  couldNotGetPostError: {
    ...Styles.errorText,
    textAlign: 'center',
    fontSize: 30,
    marginTop: 'auto',
    marginBottom: 'auto',
  },
  postTitle: {
    fontSize: 22,
  },
  outerContainer: {
    ...Styles.dropShadow,
    borderColor: Colors.border,
    backgroundColor: Colors.cardBody,
    paddingHorizontal: 15,
    paddingBottom: 5,
    paddingTop: Constants.fromScreenStartPadding,

    minHeight: 225,
  },
  innerContainer: {
    flexDirection: 'row',
    // flex: 1,
  },
  contentContainer: {
    flex: 1,
  },
  extraInfo: {
    marginLeft: 'auto',
  },
  extraInfoText: {
    fontSize: 9.5,
    textAlign: 'right',
  },
  footerContainer: {
    alignSelf: 'center',
    width: '90%',
  },
  header: {
    fontSize: 22,
    flexShrink: 1,
  },
  cgreyBackground: {
    backgroundColor: Colors.cgrey,
  },
  skeletonColumn: {
    flexDirection: 'column',
    paddingRight: Constants.commonMargin / 2,
  },
  marginBottom: {
    marginBottom: Constants.commonMargin / 2,
  },
});
