const {resolve} = require('path');
module.exports={
  entry:'./TestRouter/index.js',
  mode: 'development',
  output: {
    filename:'bundle.js',
    path :resolve(__dirname, 'dist'),
    publicPath: '/dist/'
  },
  devServer: {
    hot: true,
  }
};