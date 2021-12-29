import React from "react";
import ReactDOM from "react-dom";
import { HydrateRoot } from "./HydrateRoot";

const app = document.getElementById("app");
const props = JSON.parse(app.dataset.props);

ReactDOM.hydrate(<HydrateRoot {...props} />, document.getElementById("app"));
