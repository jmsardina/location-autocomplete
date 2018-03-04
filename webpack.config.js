const path = require('path');

module.exports = {
  entry: [
    './src/javascripts/polyfill.js',
    './src/javascripts/location-autocomplete.jsx',
    './src/javascripts/index.jsx'
  ],
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: "bundle.js"
  },
  module: {
    loaders: [
      {
        test: /\.js$|.jsx$/,
        exclude: /node_modules/,
        loader: "babel-loader",
        query:
          {
            presets: ["react", "es2015", "env"]
          }
      }
    ]
  }
}
