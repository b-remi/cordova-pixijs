const path = require('path')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
//const CopyPlugin = require('copy-webpack-plugin')

const prod = false;

module.exports = {
  mode: prod ? 'production' : 'development',
  entry: './src/index.ts',
  devtool: prod ? '' : 'eval',
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: ['.ts', '.js'],
  },
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'www/js/'),
    devtoolModuleFilenameTemplate: '[absolute-resource-path]',
  },
  plugins: [
    new CleanWebpackPlugin(),
    // Copy assets to serve them
    //new CopyPlugin([{ from: 'assets', to: 'assets' }]),
  ]
}