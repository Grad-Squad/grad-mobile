import { MaterialTypes } from 'constants';
import { IconNames } from './Icon';

export default Object.freeze({
  [MaterialTypes.Flashcards]: IconNames.cards,
  [MaterialTypes.MCQ]: IconNames.checklist,
  [MaterialTypes.PDF]: IconNames.pdf,
  [MaterialTypes.Images]: IconNames.image,
  [MaterialTypes.Video]: IconNames.video,
});
