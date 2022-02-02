const { IconNames } = require('common/Icon/Icon');

export const peoplePages = [
  {
    iconName: IconNames.followStatus,
    text: 'Follow Status',
    children: ['Followed', 'Not Followed'],
  },
  {
    iconName: IconNames.role,
    text: 'Role',
    children: ['Teacher', 'Student'],
  },
];

export const postsPages = [
  {
    iconName: IconNames.cards,
    text: 'Material Type',
    children: ['Flashcards', 'MCQ', 'PDF', 'Images', 'Videos'],
  },
  {
    iconName: IconNames.date,
    text: 'Date',
    children: ['Today', 'Past Week', 'Past Month', 'Past Year'],
  },
  {
    iconName: IconNames.text,
    text: 'Subject',
    children: [],
    isDynamic: true,
  },
  {
    iconName: IconNames.tag,
    text: 'Tag',
    isDynamic: true,
    children: [],
  },
  {
    iconName: IconNames.dollarSign,
    text: 'Post Price',
    children: ['Paid', 'Free'],
  },
  {
    iconName: IconNames.sort,
    text: 'Sort by',
    children: ['Latest', 'Most Relavent', 'Most Popular'],
  },
];
