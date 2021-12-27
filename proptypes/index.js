import { CurrentUserStatus } from 'constants';
import PropTypes from 'prop-types';
import { Text, ViewPropTypes } from 'react-native';

export const childrenPropType = PropTypes.oneOfType([
  PropTypes.arrayOf(PropTypes.node),
  PropTypes.node,
]);
export const navigationPropType = PropTypes.shape({
  navigate: PropTypes.func.isRequired,
  goBack: PropTypes.func.isRequired,
});
export const navigationBarPropType = PropTypes.shape({
  jumpTo: PropTypes.func.isRequired,
});
export const stylePropType = ViewPropTypes.style;
export const TextPropType = Text.propTypes.style;

export const mcqChoicePropType = PropTypes.exact({
  text: PropTypes.string.isRequired,
  isCorrect: PropTypes.bool.isRequired,
});
export const fileUploadPropType = PropTypes.shape({
  file: PropTypes.shape({
    fileName: PropTypes.string.isRequired,
    uri: PropTypes.string.isRequired,
  }).isRequired,
  fileType: PropTypes.string.isRequired,
  clientId: PropTypes.string,
});
export const mcqQuestionAddPropType = PropTypes.exact({
  question: PropTypes.string.isRequired,
  choices: PropTypes.arrayOf(mcqChoicePropType.isRequired).isRequired,
  questionImage: fileUploadPropType,
  choicesImages: PropTypes.oneOfType([
    PropTypes.shape({}),
    PropTypes.arrayOf(PropTypes.shape({})),
  ]),
});
export const mcqQuestionPropType = PropTypes.shape({
  id: PropTypes.number,
  options: PropTypes.arrayOf(PropTypes.string).isRequired,
  answerIndices: PropTypes.arrayOf(PropTypes.number).isRequired,
  title: PropTypes.string,
  imageURI: PropTypes.string,
});
export const contextMenuItemsPropType = PropTypes.arrayOf(
  PropTypes.oneOfType([
    PropTypes.exact({
      titleKey: PropTypes.string.isRequired,
      onPress: PropTypes.func.isRequired,
      iconName: PropTypes.string.isRequired,
    }).isRequired,
    PropTypes.exact({
      divider: PropTypes.bool.isRequired,
      key: PropTypes.string.isRequired,
    }).isRequired,
  ])
);
export const bottomSheetMenuItemsPropType = PropTypes.arrayOf(
    PropTypes.exact({
      titleKey: PropTypes.string.isRequired,
      optionStyle: TextPropType,
      onPress: PropTypes.func.isRequired,
      iconName: PropTypes.string.isRequired,
    }).isRequired,
);
export const routeParamPropType = (paramsPropTypes) =>
  PropTypes.shape({
    params: paramsPropTypes,
  });
export const currentUserStatusPropType = PropTypes.oneOf([
  CurrentUserStatus.upvoted,
  CurrentUserStatus.downVoted,
  CurrentUserStatus.none,
]);
export const ratingPropType = PropTypes.exact({
  id: PropTypes.number.isRequired,
  upvotes: PropTypes.number.isRequired,
  downvotes: PropTypes.number.isRequired,
  currentUserStatus: currentUserStatusPropType.isRequired,
});
const createdUpdatedAt = {
  createdAt: PropTypes.string.isRequired,
  updatedAt: PropTypes.string.isRequired,
};
export const authorPropType = PropTypes.exact({
  ...createdUpdatedAt,
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  profilePicture: PropTypes.string.isRequired,
  role: PropTypes.oneOf(['teacher', 'student']),
  biography: PropTypes.string.isRequired,
});
export const commentPropType = PropTypes.shape({
  ...createdUpdatedAt,
  id: PropTypes.number.isRequired,
  content: PropTypes.string.isRequired,
  rating: ratingPropType.isRequired,
  author: authorPropType.isRequired,
});

export const stringOrNumberPropType = PropTypes.oneOfType([
  PropTypes.string.isRequired,
  PropTypes.number.isRequired,
]);

export const uriPropType = PropTypes.exact({
  id: PropTypes.number.isRequired,
  key: PropTypes.string.isRequired,
  type: PropTypes.oneOf(['image', 'pdf', 'video']).isRequired,
  uri: PropTypes.string.isRequired,
});

export const flashcardPropType = PropTypes.exact({
  id: PropTypes.number.isRequired,
  frontImage: uriPropType.isRequired,
  frontText: PropTypes.string.isRequired,
  backText: PropTypes.string.isRequired,
  backImage: uriPropType.isRequired,
  materialCollectionId: PropTypes.number.isRequired,
});

export const materialPropType = PropTypes.exact({
  id: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  materialType: PropTypes.oneOf(['mcq', 'uri', 'flashcard']).isRequired,
  mcqs: PropTypes.arrayOf(
    PropTypes.exact({
      id: PropTypes.number.isRequired,
      question: PropTypes.string.isRequired,
      questionImage: uriPropType,
      choicesImages: PropTypes.oneOfType([
        PropTypes.shape({}),
        PropTypes.arrayOf(PropTypes.shape({})),
      ]),
      answerIndices: PropTypes.arrayOf(PropTypes.number.isRequired).isRequired,
      choices: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
      choicesImages: PropTypes.arrayOf(uriPropType),
    }).isRequired
  ).isRequired,
  flashcards: PropTypes.arrayOf(flashcardPropType.isRequired).isRequired,
  uris: PropTypes.arrayOf(uriPropType).isRequired,
});
export const materialsPropType = PropTypes.arrayOf(materialPropType);

export const postPropType = PropTypes.exact({
  id: PropTypes.number.isRequired,
  createdAt: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  rating: ratingPropType.isRequired,
  author: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    profilePicture: PropTypes.string.isRequired,
  }).isRequired,
  commentCount: PropTypes.number.isRequired,
  materials: materialsPropType.isRequired,
});

export const fullProfilePropType = PropTypes.exact({
  id: PropTypes.number.isRequired,
  createdAt: PropTypes.string.isRequired,
  updatedAt: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  role: PropTypes.string.isRequired,
  profilePicture: uriPropType,
  biography: PropTypes.string.isRequired,
  isFollowed: PropTypes.bool.isRequired,
  isOwner: PropTypes.bool.isRequired,
  _count: PropTypes.exact({
    posts: PropTypes.number.isRequired,
    followers: PropTypes.number.isRequired,
  }).isRequired,
});
