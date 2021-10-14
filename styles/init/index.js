import initFonts from './fonts';

const initStyles = () => {
  let ready = true;
  ready = initFonts() && ready;

  return ready;
};

export default initStyles;
