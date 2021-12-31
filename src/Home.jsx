import React, { useState } from "react";
import { Button } from "./Button";
import { wrapToHydrate } from "./wrapToHydrate";

function Home(props) {
  const [value, setValue] = useState(props.start);

  return (
    <>
      <h1>Hello World</h1>
      <p>Start: {props.start}</p>
      <p>Count: {value}</p>
      <Button onClick={() => setValue((current) => current + 1)} />
    </>
  );
}

export default wrapToHydrate(Home, __filename);
