const express = require("express");
const React = require("react");
const ReactDOMServer = require("react-dom/server");

const app = express();

app.use(express.static("public"));

app.get("/", (req, res) => {
  const { App } = require("./lib/App");
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
