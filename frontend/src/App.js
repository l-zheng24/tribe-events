import "./App.css";
import React, { useEffect } from "react";
import EventMap from "./EventMap";

function App() {
  // useEffect(() => {
  //   fetch("http://localhost:8080/api").then((res) =>
  //     console.log("data", res.json())
  //   );
  // }, []);

  return (
    <div>
      <EventMap />
    </div>
  );
}

export default App;
