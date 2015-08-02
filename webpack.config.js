var path = require('path');
var sassPaths = require("node-neat").includePaths.map(function(sassPath) {
  return "includePaths[]=" + sassPath;
}).join("&");

module.exports = {
  entry: './lib/js/app.js',

  output: {
    path: __dirname + '/public/js',
    filename: 'bundle.js'
  },

  module: {
    loaders: [
      {
        include: [
          path.resolve(__dirname, 'lib/js')
        ],
        loader: 'babel-loader'
      },
      {
        test: /\.scss$/,
        loader: 'style!css!sass?sourceMap&' + sassPaths
      }
    ]
  }
};
