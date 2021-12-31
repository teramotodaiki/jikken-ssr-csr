import webpack from "webpack";
import path from "path";
import { getScriptSrc } from "./util";

export function ssr(serverComponentPath) {
  const src = getScriptSrc(serverComponentPath);

  // CSR 用の JS をビルド
  const compiler = webpack({
    mode: "development",
    entry: serverComponentPath,
    output: {
      path: path.resolve(__dirname, "../public"),
      filename: src,
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
    stats: true,
  });

  return new Promise((resolve) => {
    compiler.run((err, stats) => {
      console.log("compiled");
      if (err) {
        console.error(err);
      }
      const { errors } = stats.compilation;
      if (errors.length > 0) {
        console.log(...errors);
      }
      resolve();
    });
  });
}
