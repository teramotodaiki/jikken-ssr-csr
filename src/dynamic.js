import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";

const isServerSide = typeof window === "undefined";

export function dynamic(factory) {
  console.log("call dynamic", isServerSide);

  // SSR
  if (isServerSide) {
    return () => null;
  }

  // CSR
  let Component = null;

  factory().then((module) => {
    Component = module.default;
    const app = document.getElementById("app");
    const props = JSON.parse(app.dataset.props);

    const RootElement = React.createElement(Component, props);
    ReactDOM.hydrate(RootElement, app);
  });

  //   const loading = new Promise((resolve) => {
  //   });

  //   return function WrapperComponent(props) {
  //     if (!Component) {
  //       throw loading;
  //     }

  //     return React.createElement(Component, props);
  //   };
}
