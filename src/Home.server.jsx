import React from "react";
import { dynamic } from "./dynamic";

const Home = dynamic(() => import("./Home"));

export function App(props) {
  return (
    <html>
      <head>
        <title>React App</title>
      </head>
      <body>
        <div id="app" data-props={JSON.stringify(props)}>
          <Home {...props} />
        </div>
        <script async defer src={props.src}></script>
      </body>
    </html>
  );
}

export default App;
