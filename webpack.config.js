const path = require("path");

module.exports = {
  mode: "development",
  entry: path.resolve(__dirname, "src/app.ts"),
  output: {
    filename: "app.js",
    path: path.resolve(__dirname, "dist"),
    publicPath: "/dist/",
    clean: true,
  },
  devServer: {
    host: "localhost",
    open: true,
    hot: true,
    static: ".",
    client: {
      overlay: false,
    },
  },
  devtool: "inline-source-map",
  module: {
    rules: [
      {
        test: /\.ts?$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: [".ts", ".js"],
  },
};
