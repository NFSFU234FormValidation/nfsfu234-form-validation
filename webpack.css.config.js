const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');

module.exports = {
  entry: './src/css/index.css', // Your CSS entry point
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'css/index.txt', // Change the output filename
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader'],
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'css/nfsfu234FormValidation.css', // Original CSS filename
    }),
    new MiniCssExtractPlugin({
        filename: 'css/nfsfu234FormValidation.min.css', // Minified CSS filename
    }),
  ],
  optimization: {
    minimizer: [
      new CssMinimizerPlugin({
        minimizerOptions: {
          preset: [
            'default',
            {
              discardComments: { removeAll: true },
            },
          ],
        },
        test: /\.min\.css$/g, // Minimize .min.css files only
      }),
    ],
  },
  mode: 'production',
  devtool: 'source-map',
};
