import MapView from "@arcgis/core/views/MapView";
import Map from "@arcgis/core/Map";
import React, { useEffect, useRef } from "react";
import ReactDOM from "react-dom";
import SimpleComponent from "./SimpleComponent";
import { Button } from "antd";

const EventMap = () => {
  const mapDiv = useRef(null);

  useEffect(() => {
    if (mapDiv.current) {
      /**
       * Initialize application
       */
      const webmap = new Map({
        basemap: "topo",
      });

      const view = new MapView({
        container: mapDiv.current, // The id or node representing the DOM element containing the view.
        map: webmap, // An instance of a Map object to display in the view.
        center: [-76.70778198643546, 37.271012344419574],
        scale: 3000, // Represents the map scale at the center of the view.
      });
      // // Create a button element
      // const buttonElement = document.createElement("button");
      // buttonElement.innerText = "Click Me";

      // // Add event listener for button click
      // buttonElement.addEventListener("click", () => {
      //   console.log("Button clicked!");
      //   // Add your button click logic here
      // });

      // // Position the button directly on the map
      // const buttonContainer = document.createElement("div");
      // buttonContainer.appendChild(buttonElement);
      // buttonContainer.style.position = "absolute";
      // buttonContainer.style.top = "10px";
      // buttonContainer.style.right = "10px";
      // view.container.appendChild(buttonContainer);

      return () => {
        // buttonElement.removeEventListener("click", () => {
        //   console.log("Button clicked!");
        //   // Add your button click logic here
        // });

        view && view.destroy();
      };
    }
  }, []);

  return (
    <div
      className="mapDiv"
      ref={mapDiv}
      style={{ height: "100vh", width: "100%" }}
    >
      {/* <button>Click me</button> */}
    </div>
  );
};

export default EventMap;
