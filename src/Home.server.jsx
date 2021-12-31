import React from "react";
import Home from "./Home.entry";

export function App(props) {
  return (
    <html>
      <head>
        <title>React App</title>
      </head>
      <body>
        <Home {...props} />
      </body>
    </html>
  );
}

export default App;
