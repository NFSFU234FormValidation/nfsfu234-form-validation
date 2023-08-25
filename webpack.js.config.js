const path = require('path');
const TerserPlugin = require('terser-webpack-plugin');

module.exports = {
  entry: './src/js/nfsfu234-form-validation.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'js/nfsfu234FormValidation.js',
    library: 'NFSFU234FormValidation',
    libraryTarget: 'umd',
    globalObject: 'this',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
          },
        },
      },
    ],
  },
  optimization: {
    minimizer: [
      new TerserPlugin({
        terserOptions: {
          format: {
            comments: false,
          },
        },
        extractComments: false,
      }),
    ],
  },
  mode: 'production',
  devtool: 'source-map',
};
