import React from "react";

export function HydrateRoot(props) {
  return (
    <>
      <div id="app" data-props={JSON.stringify(props)}>
        {props.children}
      </div>
      <script src="/main.js"></script>
    </>
  );
}
