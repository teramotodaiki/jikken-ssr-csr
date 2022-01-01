# SSR と CSR をいい感じにつなぐ実験

React を SSR と CSR の両方に使っているとき、それらを import でいい感じに書けるようにするサンプルです。

React と Webpack さえあれば動きます。怪しい `register.js` や webpack loader のないピュアな実装です。

コードが追いづらくて困っているが、Next.js のようなフレームワークを入れるのは腰が重いな…という場合に使ってください。

# setup

- `$ npm install`
- `$ npm run build && npm run serve`

# requirements

- React (for SSR & CSR)
- Webpack

# usage

- エントリーポイントにしたいコンポーネントの拡張子を `*.entry.jsx` にします。
- ルートコンポーネントを次のようにエクスポートします。

```js
import { wrapToHydrate } from './wrapToHydrate';

function Component(props) {
    ...
}

export default wrapToHydrate(Component, __filename);
```

- [webpack.config.js](./webpack.config.js) の設定を真似します

# how it works

- `*.entry.jsx` という拡張子のファイルを全て Webpack でビルドします [webpack.config.js](./webpack.config.js)
- 処理したファイルのパスを entry.json という名前でルートディレクトリに保存します。
- SSR: `wrapToHydrate()` の戻り値として、 `<div id="app"></div><script src=""></script>` を返します。
  - これがレスポンス HTML に書き出されます。
- CSR: `wrapToHydrate()` をコールしたとき、 `ReactDOM.hydrate()` を呼びます。
  - これがブラウザ上で DOM を構築します。

`*.entry.jsx` がサーバとクライアントの両方で実行されるのがポイントです。

クライアントでしか実行できないコードがある場合は、`hydrate` を `render` に置き換えることも可能です。
