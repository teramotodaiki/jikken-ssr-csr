import express from "express";
import React from "react";
import ReactDOMServer from "react-dom/server";
import Home from "./Home.server";
// import { ssr } from "./ssr";
// import { getFilesToBeSSR } from "./wrapToHydrate";

const app = express();

// const filesToBeSSR = getFilesToBeSSR();
// const waitForWebpack = ssr(filesToBeSSR);

// app.use((req, res, next) => {
//   waitForWebpack.then(() => next());
// });
app.use(express.static("public"));

app.get("/", (req, res) => {
  const props = {
    start: parseInt(req.query.start + "") || 0,
  };
  const html = ReactDOMServer.renderToString(React.createElement(Home, props));
  res.send(`<!DOCTYPE html>${html}`);
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
