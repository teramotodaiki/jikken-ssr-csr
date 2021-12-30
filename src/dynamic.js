import React from "react";
import ReactDOM from "react-dom";

const isServerSide = typeof window === "undefined";

export function dynamic(factory) {
  // SSR
  if (isServerSide) {
    return () => null;
  }

  // CSR
  factory().then((module) => {
    const Component = module.default;
    const app = document.getElementById("app");
    const props = JSON.parse(app.dataset.props);

    const RootElement = React.createElement(Component, props);
    ReactDOM.hydrate(RootElement, app);
  });
}
