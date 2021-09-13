const GOOD_WORDS = [
  'Great Work! 🔥🔥',
  'Good Job!',
  'Nice! You did it!',
  'Top Effort!',
  'Nice One!',
  'Encore!',
  'Welldone!',
  'That’s good.',
  'Wonderful!',
  'You must have been practicing.',
  'You did that very well.',
  'You’ve just about mastered it.',
  'That’s the best ever.',
  'Excellent!',
  'Terrific!',
  'That’s the way!',
  'Couldn’t have done it better myself.',
  'I’m happy to see you working like that.',
  'I’m very proud of you.',
  'You’re really working hard today.',
  'That’s coming along nicely.',
  'You are very good at that.',
  'That kind of work makes me happy.',
  'That’s really nice.',
  'You figured that out fast.',
  'Now you have the hang of it.',
  'Way to go!',
  'Well look at you go.',
  'Congratulations. You got it right!',
  'You certainly did well today.',
  'Superb!',
  'You’re doing beautifully!',
  'Now that’s what I call a fine job.',
  'Outstanding!',
  'Fantastic!',
  'Tremendous!',
];

const BAD_WORDS = [
  'Keep at it!',
  'Don’t worry, Getting results takes time',
  'Only those who dare to fail greatly can ever achieve greatly.',
  'There is no failure except in no longer trying.',
  'The only real mistake is the one from which we learn nothing.',
  'Keep Trying! I believe in you.',
  'It’s not how far you fall, but how high you bounce that counts.',
  'Every adversity carries with it the seed of an equal or greater benefit.',
  'If you’re not prepared to be wrong, you’ll never come up with anything original',
  'Go On! You have it within you.',
  'You can do anything!',
  'The only way is up!',
  'Talent is given, greatness is earned.',
  'If opportunity doesn’t knock, build a door.',
  'The higher you climb the better the view.',
  'With patience you can even cook a stone.',
  'The sky is the limit!',
  'Nothing is impossible, the word it self says I’m possible.',
  'Begin each day with a grateful heart.',
];

export const wordTypes = {
  good: 'good',
  bad: 'bad',
  ok: 'ok',
};

export default (type) => {
  switch (type) {
    default:
    case wordTypes.good:
      return GOOD_WORDS[Math.floor(Math.random() * GOOD_WORDS.length)];
    case wordTypes.ok:
      return GOOD_WORDS[Math.floor(Math.random() * GOOD_WORDS.length)];
    case wordTypes.bad:
      return BAD_WORDS[Math.floor(Math.random() * BAD_WORDS.length)];
  }
};
