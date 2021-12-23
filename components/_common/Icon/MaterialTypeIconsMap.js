import materialTypes from 'constants/materialTypes';
import { IconNames } from './Icon';

export default Object.freeze({
  [materialTypes.Flashcards]: IconNames.cards,
  [materialTypes.MCQ]: IconNames.checklist,
  [materialTypes.PDF]: IconNames.pdf,
  [materialTypes.Images]: IconNames.image,
  [materialTypes.Video]: IconNames.video,
});
