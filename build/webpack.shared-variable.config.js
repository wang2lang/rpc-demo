const path = require('path')
const webpack = require('webpack')

module.exports = {
  entry: './src/shared-variable',
  output: {
    filename: 'app.js',
    path: path.resolve(__dirname, '../dist/shared-variable')
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
