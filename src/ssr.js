import webpack from "webpack";
import path from "path";

export async function ssr(serverComponentPath) {
  // CSR 用の JS をビルド
  const name = path.relative(__dirname, serverComponentPath);
  const src = name.replace(/\W/g, "_") + ".js"; // アルファベット以外全部 _ に置き換える
  const compiler = webpack({
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
  });

  return new Promise((resolve) => {
    compiler.run(() => {
      resolve(src);
    });
  });
}
