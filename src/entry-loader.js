const id = "app";

/** Webpack loader */
export default function (source) {
  // CSR 用のコードを挿入する
  const entry = `
const app = document.getElementById("${id}");
const props = JSON.parse(app.dataset.props);

require('react-dom').hydrate(require('react').createElement(exports.default, props), app);
`;

  return source + entry;
}

/** Node.js register */
export function register() {
  const oldHook = require.extensions[".js"];
  require.extensions[".js"] = function (module, file) {
    if (file.endsWith(".entry.js")) {
      const oldCompile = module._compile;
      module._compile = function (code, file) {
        // <- wrapToHydrate のサーバ側をここに移す
        const entry = require("../entry.json");
        const result = Object.entries(entry).find(
          ([, fullPath]) => fullPath === file
        );
        if (!result) {
          throw new Error(`${file} is not found in entry.json`);
        }
        const [src] = result;
        // SSR 用のコードを挿入する
        code =
          code +
          `
var _default = exports.default
exports.default = function(props) {
    var React = require('react');
    return (
        React.createElement(React.Fragment, null,
            React.createElement('div', {id: '${id}', 'data-props': JSON.stringify(props)},
                React.createElement(_default, props)),
            React.createElement('script', {async: true, defer: true, src: '${src}'})
        )
    )
}
`;
        module._compile = oldCompile;
        module._compile(code, file);
      };
    }
    oldHook(module, file);
  };
}
