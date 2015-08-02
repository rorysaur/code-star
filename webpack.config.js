var path = require('path');

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
      }
    ]
  }
};
