const path = require('path')
const webpack = require('webpack')

module.exports = {
  entry: {
    'server': './src/post-message/server.js',
    'client': './src/post-message/index.js'
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, '../dist/post-message')
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
