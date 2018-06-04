const path = require('path');
const webpack = require('webpack');

module.exports = {
  mode: 'production', // 'production' or 'development'
  context: __dirname + "/src",
  entry: {
    daily_schedule: './daily_schedule/entry.js',
  },
  output: {
    path: path.join(__dirname, 'public/assets/js'),
    filename: '[name].js'
  },
  plugins: [
    //new webpack.optimize.UglifyJsPlugin(),
    //必要な言語を指定する。 ja,
    new webpack.ContextReplacementPlugin(/moment[\/\\]locale$/, /ja/),
  ],
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        }
      },
    ]
  },
  //devtool: 'source-map',
  devServer: {
    contentBase: 'public',
    inline: true,
    hot: true,
    open: true
  }
};
