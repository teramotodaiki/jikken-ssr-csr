import React from "react";
import { HydrateRoot } from "./HydrateRoot";

export function App(props) {
  return (
    <html>
      <head>
        <title>React App</title>
      </head>
      <body>
        <div id="app" data-props={JSON.stringify(props)}>
          <HydrateRoot {...props} />
        </div>
        <script src="/main.js"></script>
      </body>
    </html>
  );
}
