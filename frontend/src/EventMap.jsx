import MapView from "@arcgis/core/views/MapView";
import Map from "@arcgis/core/Map";
import React, { useEffect, useRef } from "react";
import ReactDOM from "react-dom";
import SimpleComponent from "./SimpleComponent";
import { Button } from "antd";
import WebStyleSymbol from "@arcgis/core/symbols/WebStyleSymbol.js";
import GraphicsLayer from "@arcgis/core/layers/GraphicsLayer";
import Graphic from "@arcgis/core/Graphic";
import SimpleMarkerSymbol from "@arcgis/core/symbols/SimpleMarkerSymbol.js";

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
        center: [-76.7077, 37.271],
        scale: 3000, // Represents the map scale at the center of the view.
        constraints: {
          minScale: 50000, // Example minimum scale
          maxScale: 1000, // Example maximum scale
          extent: {
            // Example extent bounds
            xmin: -76.6739,
            ymin: 37.2747,
            xmax: -76.7042,
            ymax: 37.2758,
          },
        },
      });

      const buildingData = [
        { id: 1, name: "Sadler", location: [37.271753, -76.714295] },
        { id: 2, name: "Swem", location: [37.269846, -76.716089] },
        { id: 3, name: "Small Hall", location: [37.268801, -76.716854] },
        {
          id: 4,
          name: "Matoaka Amphitheater",
          location: [37.266229, -76.721958],
        },
        { id: 5, name: "ISC", location: [37.269568, -76.714442] },
        { id: 6, name: "Business School", location: [37.266272, -76.718243] },
        { id: 7, name: "Ewell", location: [37.270174, -76.709936] },
        { id: 8, name: "Blow Hall", location: [37.272534, -76.711309] },
        { id: 9, name: "Zable Stadium", location: [37.273053, -76.71381] },
        { id: 10, name: "Lake Matoaka", location: [37.267298, -76.725535] },
        { id: 11, name: "Wren Building", location: [37.270843, -76.70891] },
        { id: 12, name: "Muscarelle", location: [37.267953, -76.715925] },
        { id: 13, name: "Botetourt Complex", location: [37.27054, -76.720583] },
        { id: 14, name: "Jones Hall", location: [37.268069, -76.716786] },
        { id: 15, name: "James Blair Hall", location: [37.271487, -76.711776] },
        { id: 16, name: "Wellness Center", location: [37.271187, -76.715141] },
        { id: 17, name: "Law School", location: [37.264818, -76.705239] },
        { id: 18, name: "Boswell", location: [37.267368, -76.716725] },
        {
          id: 19,
          name: "Cohen Career Center",
          location: [37.271964, -76.713631],
        },
        { id: 20, name: "Chancellors Hall", location: [37.271464, -76.710733] },
        { id: 21, name: "Crim Dell Meadow", location: [37.270819, -76.712572] },
        {
          id: 22,
          name: "School of Education",
          location: [37.278273, -76.7231],
        },
        { id: 23, name: "Daily Grind", location: [37.271113, -76.714156] },
        { id: 24, name: "McGlothlin Hall", location: [37.27017, -76.711723] },
        { id: 25, name: "Tucker Hall", location: [37.271477, -76.709918] },
        { id: 26, name: "Sadler Center", location: [37.271753, -76.714295] },
        { id: 27, name: "Washington Hall", location: [37.270179, -76.710759] },
        { id: 28, name: "Entrepreneurship", location: [37.273002, -76.711059] },
        { id: 29, name: "Phi Beta Kappa", location: [37.268264, -76.715189] },
        // Add more building data as needed
      ];
      // Create a graphics layer for the buildings
      const buildingsLayer = new GraphicsLayer();
      webmap.add(buildingsLayer);

      const webStyleSymbol = new WebStyleSymbol({
        name: "school",
        styleName: "Esri2DPointSymbolsStyle",
      });
      // Loop through building data and add graphics with symbols for each building
      buildingData.forEach((building) => {
        const graphic = new Graphic({
          geometry: {
            type: "point",
            latitude: building.location[0],
            longitude: building.location[1],
          },
          symbol: webStyleSymbol,
        });
        buildingsLayer.add(graphic);
      });

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
