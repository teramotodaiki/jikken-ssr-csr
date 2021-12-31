import React from "react";
import ReactDOM from "react-dom";
import { getScriptSrc } from "./util";

export function wrapToHydrate(Component, fileName) {
  const id = "app";

  const isServerSide = typeof window === "undefined";
  if (isServerSide) {
    const src = getScriptSrc(fileName);
    return (props) => (
      <>
        <div id={id} data-props={JSON.stringify(props)}>
          <Component {...props} />
        </div>
        <script async defer src={src}></script>
      </>
    );
  } else {
    const app = document.getElementById(id);
    const props = JSON.parse(app.dataset.props);
    const root = <Component {...props} />;

    ReactDOM.hydrate(root, app);

    return (props) => root; // nope
  }
}
