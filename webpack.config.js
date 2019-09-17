const path = require('path');

module.exports = {
  entry: [
    './src/polyfill.js',
    './src/location-autocomplete/index.jsx',
    './src/index.jsx'
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
  },
  resolve: {
    modules: [
      path.resolve('./src'),
      'node_modules'
    ],
    extensions: ['.js', '.jsx']
  }
}
