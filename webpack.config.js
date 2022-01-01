const fs = require("fs");
const glob = require("glob");
const path = require("path");

module.exports = {
  mode: "development",
  entry: () => {
    const fileNames = glob.sync("lib/*.entry.{js,jsx}", {});
    /** @type {import ('webpack').EntryObject} */
    const entries = {};
    for (const fileName of fileNames) {
      const src = getScriptSrc(fileName);
      entries[src] = path.resolve(__dirname, fileName);
    }
    fs.writeFileSync("entry.json", JSON.stringify(entries, null, 2));
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
  const fileName = filepath.replace(/\W/g, "_"); // アルファベット以外全部 _ に置き換える
  return `${fileName}.js`;
}
