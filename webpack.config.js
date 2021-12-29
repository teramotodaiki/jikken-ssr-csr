module.exports = {
  entry: {
    main: "./src/main.js",
  },
  output: {
    path: __dirname + "/public",
    filename: "[name].js",
    publicPath: "/",
  },
  resolve: {
    extensions: [".js", ".jsx"],
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /(node_modules)/,
        use: {
          loader: "babel-loader",
        },
      },
    ],
  },
};
