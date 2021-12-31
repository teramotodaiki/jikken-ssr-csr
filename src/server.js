import express from "express";
import React from "react";
import ReactDOMServer from "react-dom/server";
import { App } from "./App";

const app = express();

app.use(express.static("public"));

app.get("/", (req, res) => {
  const props = {
    start: parseInt(req.query.start + "") || 0,
  };
  const html = ReactDOMServer.renderToString(React.createElement(App, props));
  res.send(`<!DOCTYPE html>${html}`);
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
