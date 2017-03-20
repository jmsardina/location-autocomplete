module.exports = {
  entry: "./src/javascripts/index.js",
  output: {
    path: "./",
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
            presets: ["react"]
          }
      }
    ]
  }
}