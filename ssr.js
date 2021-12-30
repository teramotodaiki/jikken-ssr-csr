const webpack = require("webpack");
const path = require("path");

async function ssr(serverComponentPath) {
  // CSR 用の JS をビルド
  const config = require("./webpack.config.js");
  const compiler = webpack({
    ...config,
    entry: {
      main: serverComponentPath,
    },
  });

  return new Promise((resolve) => {
    compiler.run(resolve);
  });
}

module.exports = {
  ssr,
};
