/** ファイルパスを一意な URL に変える。冪等であればなんでも良い */
export function getScriptSrc(serverComponentPath = "") {
  const projectRoot = require
    .resolve("../package.json")
    .split("/")
    .slice(0, -1)
    .join("/");
  const filepath = serverComponentPath.slice(projectRoot.length + 1);
  const fileName = filepath.replace(/\W/g, "_"); // アルファベット以外全部 _ に置き換える
  return `${fileName}.js`;
}
