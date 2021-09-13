export const errorSubtitleRender = (error, errorMsg, subtitle) =>
  `${error ? errorMsg : ''}${
    subtitle && error && errorMsg ? ', ' : ''
  }${subtitle}`;
