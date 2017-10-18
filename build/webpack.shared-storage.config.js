const path = require('path')
const webpack = require('webpack')

module.exports = {
  entry: {
    'tab-b': './src/shared-storage/server.js',
    'tab-a': './src/shared-storage/index.js'
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, '../dist/shared-storage')
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader'
        }
      }
    ]
  },
  plugins: [
    new webpack.optimize.ModuleConcatenationPlugin()
  ]
}
