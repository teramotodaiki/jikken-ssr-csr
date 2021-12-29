import React from "react";
import { HydrateRoot } from "./HydrateRoot";

export function App() {
  return (
    <html>
      <head>
        <title>React App</title>
      </head>
      <body>
        <div id="app">
          <HydrateRoot />
        </div>
        <script src="/main.js"></script>
      </body>
    </html>
  );
}
