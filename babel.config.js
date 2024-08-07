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
  ['module:react-native-dotenv'],
  ['react-native-reanimated/plugin'],
];

module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins,
  };
};
