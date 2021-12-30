import express from "express";
import React from "react";
import ReactDOMServer from "react-dom/server";
import Home from "./Home.server";
import { ssr } from "./ssr";

const app = express();

app.use(express.static("public"));

const { src, waitForWebpack } = ssr(__dirname + "/Home.server");

app.get("/", (req, res) => {
  waitForWebpack.then(() => {
    const props = {
      src,
      start: parseInt(req.query.start + "") || 0,
    };
    const html = ReactDOMServer.renderToString(
      React.createElement(Home, props)
    );
    res.send(`<!DOCTYPE html>${html}`);
  });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
