// eslint-disable-next-line import/no-extraneous-dependencies,@typescript-eslint/no-var-requires
const ReactRefreshPlugin = require('@pmmmwh/react-refresh-webpack-plugin');
// eslint-disable-next-line import/no-extraneous-dependencies,@typescript-eslint/no-var-requires
const { addBabelPlugin, addWebpackPlugin, override } = require('customize-cra');

const isDevelopment = process.env.NODE_ENV === 'development';

module.exports = override(
  isDevelopment && addBabelPlugin(require.resolve('react-refresh/babel')),
  isDevelopment && addWebpackPlugin(new ReactRefreshPlugin())
);
