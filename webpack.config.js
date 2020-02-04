const isDev = process.env.NODE_ENV === "development";
const { resolve } = require("path");

module.exports = {
  mode: isDev ? "development" : "production",
  entry: ["@babel/polyfill", "./src/index.js"],
  output: {
    filename: "bundle.js",
    path: resolve(__dirname, "public")
  },
  resolve: {
    extensions: [".js", ".jsx"]
  },
  devtool: "source-map",
  context: __dirname,
  watchOptions: {
    ignored: /node_modules/
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: "babel-loader"
      },
      {
        test: /\.(png|jpg|svg)$/,
        loader: ["file-loader"]
      },
      {
        test: /\.css$/,
        loader: ["style-loader", "css-loader"]
      },
      {
        test: /\.json$/,
        loader: "json-loader"
      }
    ]
  }
};
