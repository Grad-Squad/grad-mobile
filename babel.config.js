const plugins = [
  [
    require.resolve('babel-plugin-module-resolver'),
    {
      root: ['.'],
      alias: {
        common: './components/_common',
      },
    },
  ],
];

module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins,
  };
};
