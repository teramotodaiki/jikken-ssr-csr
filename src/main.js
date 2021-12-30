import React from "react";
import ReactDOM from "react-dom";

const app = document.getElementById("app");
const props = JSON.parse(app.dataset.props);

import("./Home").then((module) => {
  const Home = module.default;
  ReactDOM.render(<Home {...props} />, app);
});

// ReactDOM.render(<Home {...props} />, document.getElementById("app"));
