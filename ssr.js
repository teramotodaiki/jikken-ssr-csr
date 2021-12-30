const webpack = require("webpack");
const path = require("path");

async function ssr(serverComponentPath) {
  // CSR 用の JS をビルド
  const config = require("./webpack.config.js");
  const src = serverComponentPath.replace(/\W/g, "_") + ".js"; // アルファベット以外全部 _ に置き換える
  const compiler = webpack({
    ...config,
    entry: serverComponentPath,
    output: {
      path: __dirname + "/public",
      filename: src,
      publicPath: "/",
    },
  });

  return new Promise((resolve) => {
    compiler.run(() => {
      resolve(src);
    });
  });
}

module.exports = {
  ssr,
};
