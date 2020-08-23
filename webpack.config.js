const path = require('path');
const MomentLocalesPlugin = require(`moment-locales-webpack-plugin`);

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
      },
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader']
      }
    ],
  },
  plugins: [
    new MomentLocalesPlugin()
  ],
  resolve: {
    extensions: [`.ts`, `.js`, `json`]
  },
};
