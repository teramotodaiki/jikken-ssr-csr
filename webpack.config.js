const glob = require("glob");
const path = require("path");
const fs = require("fs");

module.exports = {
  mode: "development",
  entry: () => {
    const fileNames = glob.sync("./lib/*.entry.{js,jsx}", {});
    /** @type {import ('webpack').EntryObject} */
    const entries = {};
    for (const fileName of fileNames) {
      const src = getScriptSrc(fileName);
      entries[src] = path.resolve(__dirname, fileName);
    }
    fs.writeFileSync("./entry.json", JSON.stringify(entries));
    return entries;
  },
  output: {
    path: path.resolve(__dirname, "./public"),
    filename: `[name]`,
    publicPath: "/",
  },
  resolve: {
    extensions: [".js", ".jsx"],
  },
  module: {
    rules: [
      {
        test: /\.entry\.jsx?$/,
        exclude: /(node_modules)/,
        use: path.resolve(__dirname, "./lib/entry-loader.js"),
      },
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

function getScriptSrc(filepath = "") {
  const relativePath = path.relative(__dirname, filepath);
  const fileName = relativePath.replace(/\W/g, "_"); // アルファベット以外全部 _ に置き換える
  return `${fileName}.js`;
}
