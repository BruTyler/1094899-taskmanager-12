const path = require('path');

module.exports = {
  mode: 'development',
  entry: './src/main',
  output: {
    filename: 'bundle.js',
    path: path.join(__dirname, 'public'),
  },
  devtool: 'source-map',
  devServer: {
    contentBase: path.join(__dirname, 'public'),
    watchContentBase: true,
  },
  module: {
    rules: [
      {
        test: /\.ts?$/,
        loader: `ts-loader`
      }
    ],
  },
  resolve: {
    extensions: [`.ts`, `.js`, `json`]
  },
};
