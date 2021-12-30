const express = require("express");
const React = require("react");
const ReactDOMServer = require("react-dom/server");
const { ssr } = require("./ssr");

const app = express();

app.use(express.static("public"));

const HomePromise = ssr("./src/Home.server");

app.get("/", (req, res) => {
  HomePromise.then((src) => {
    const Home = require("./lib/Home.server").default;
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
