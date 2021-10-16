export const wordTypes = {
  good: 'good',
  bad: 'bad',
  ok: 'ok',
};

const goodLength = 35 + 1;
const badLength = 18 + 1;

export default (type, t) => {
  switch (type) {
    default:
    case wordTypes.good:
      return t(`CheeringWords/Good/${Math.floor(Math.random() * goodLength)}`);
    case wordTypes.ok:
      return t(`CheeringWords/Good/${Math.floor(Math.random() * goodLength)}`);
    case wordTypes.bad:
      return t(`CheeringWords/Bad/${Math.floor(Math.random() * badLength)}`);
  }
};
