import MapView from "@arcgis/core/views/MapView";
import Map from "@arcgis/core/Map";
import React, { useEffect, useRef, useState } from "react";
import WebStyleSymbol from "@arcgis/core/symbols/WebStyleSymbol";
import GraphicsLayer from "@arcgis/core/layers/GraphicsLayer";
import Graphic from "@arcgis/core/Graphic";
import BuildingModal from "./BuildingModal";
import { DatePicker, Col, Row, Typography} from "antd";
import dayjs from "dayjs";

const EventMap = () => {
  const mapDiv = useRef(null);
  const [selectedBuilding, setSelectedBuilding] = useState();
  const [eventData, setEventData] = useState();

  const [showModal, setShowModal] = useState(false);
  const [buildingName, setBuildingName] = useState("");
  const [selectedDate, setSelectedDate] = useState(
    dayjs().format("YYYY-MM-DD").toString()
  );

  const { Title } = Typography;

  const handleDateChange = (props) => {

    if (props === null) {
      return;
    }
    const incrementedMonth = parseInt(props.$M) + 1;
    const date = props.$y + "-" + String(incrementedMonth) + "-" + props.$D;
    setSelectedDate(date);
  }

  const handleShow = () => {
    setShowModal(true);
  };
  const handleExit = () => {
    setShowModal(false);
  };

  useEffect(() => {
  // useEffect for fetching data when selectedDate changes
  if (selectedBuilding && selectedDate) {
    getData(selectedBuilding.name, selectedDate);
  }
}, [selectedBuilding, selectedDate]);
  async function getData(name, date){
    let data = {
      building: name,
      date: date,
    };
    const response = await fetch("https://tribe-events-api.onrender.com/api/events", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    const response_text = await response.json();
    setEventData(response_text);
  } 

  useEffect(() => {
    const buildingData = [
      {
        id: 1,
        name: "Sadler",
        alias: "Sadler Center",
        location: [37.271753, -76.714295],
      },
      {
        id: 2,
        name: "Swem",
        alias: "Swem Library",
        location: [37.269846, -76.716089],
      },
      {
        id: 3,
        name: "Small",
        alias: "Small Hall",
        location: [37.268801, -76.716854],
      },
      {
        id: 4,
        name: "Matoaka_Amphitheater",
        alias: "Matoaka Amphitheater",
        location: [37.266229, -76.721958],
      },
      { id: 5, name: "ISC", alias: "ISC", location: [37.269568, -76.714442] },
      {
        id: 6,
        name: "Bschool",
        alias: "Business School/Miller Hall",
        location: [37.266272, -76.718243],
      },
      {
        id: 7,
        name: "Ewell",
        alias: "Ewell Hall",
        location: [37.270174, -76.709936],
      },
      {
        id: 8,
        name: "Blow",
        alias: "Blow Hall",
        location: [37.272534, -76.711309],
      },
      {
        id: 9,
        name: "Zable",
        alias: "Zable Stadium",
        location: [37.273053, -76.71381],
      },
      {
        id: 10,
        name: "Lake_Matoaka",
        alias: "Lake Matoaka",
        location: [37.267298, -76.725535],
      },
      {
        id: 11,
        name: "Wren",
        alias: "Wren Building",
        location: [37.270843, -76.70891],
      },
      {
        id: 12,
        name: "Muscarelle",
        alias: "Muscarelle Musuem of Art",
        location: [37.267953, -76.715925],
      },
      {
        id: 13,
        name: "Botetourt_Complex",
        alias: "Boutetourt Complex",
        location: [37.27054, -76.720583],
      },
      {
        id: 14,
        name: "Jones",
        alias: "Jones Hall",
        location: [37.268069, -76.716786],
      },
      {
        id: 15,
        name: "Blair",
        alias: "James Blair Hall",
        location: [37.271487, -76.711776],
      },
      {
        id: 16,
        name: "Wellness_Center",
        alias: "McLeod Wellness Center",
        location: [37.271187, -76.715141],
      },
      {
        id: 17,
        name: "Law_School",
        alias: "Law School",
        location: [37.264818, -76.705239],
      },
      {
        id: 18,
        name: "Boswell",
        alias: "Boswell Hall",
        location: [37.267368, -76.716725],
      },
      {
        id: 19,
        name: "Cohen",
        alias: "Cohen Career Center",
        location: [37.271964, -76.713631],
      },
      {
        id: 20,
        name: "Chancellors",
        alias: "Chancellors Hall",
        location: [37.271464, -76.710733],
      },
      {
        id: 21,
        name: "Crim_Dell_Meadow",
        alias: "Crim Dell Meadow",
        location: [37.270819, -76.712572],
      },
      {
        id: 22,
        name: "School_of_Ed",
        alias: "School of Education",
        location: [37.278273, -76.7231],
      },
      {
        id: 23,
        name: "Grind",
        alias: "Daily Grind",
        location: [37.271113, -76.714156],
      },
      {
        id: 24,
        name: "McGlothlin",
        alias: "McGlothlin Hall",
        location: [37.27017, -76.711723],
      },
      {
        id: 25,
        name: "Tucker",
        alias: "Tucker Hall",
        location: [37.271477, -76.709918],
      },
      {
        id: 27,
        name: "Washington",
        alias: "Washington Hall",
        location: [37.270179, -76.710759],
      },
      {
        id: 28,
        name: "Entrepreneurship",
        alias: "Entreneneurship Center",
        location: [37.273002, -76.711059],
      },
      {
        id: 29,
        name: "Phi Beta",
        alias: "Phi Beta Kappa Hall",
        location: [37.268264, -76.715189],
      },
      {
        id: 30,
        name: "JAMESTOWN_FIELD",
        alias: "Williamsburg-Jamestown Airport",
        location: [37.241241, -76.717857],
      },
      // Add more building data as needed
    ];
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
        center: [-76.711455, 37.270664],
        scale: 3000, // Represents the map scale at the center of the view.
        constraints: {
          extent: {
            // Example extent bounds
            xmin: -76.6739,
            ymin: 37.2747,
            xmax: -76.7042,
            ymax: 37.2758,
          },
        },
      });

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
          attributes: {
            id: building.id,
            name: building.name,
            alias: building.alias, // Assigning the building ID to the graphic attributes
          },
        });
        buildingsLayer.add(graphic);
      });

      view.on("click", (event) => {
        view.hitTest(event).then((response) => {
          if (response.results.length) {
            const graphic = response.results[0].graphic;
            const building = graphic.attributes;
            if (building.name) {
              setSelectedBuilding(building); // Update selectedBuilding state
              setBuildingName(building.alias);
              handleShow(); // Moved inside click event
            }
          }
        });
      });

      return () => {
        view && view.destroy();
      };
    }
  }, []);

  return (
    <div>
      <div className="title">
        <div className="title-left">
          <Typography>
            <Title level={4}>
              William & Mary Event Viewer
            </Title>
          </Typography>
        </div>
        <div className="title-right">
          <DatePicker
              format={"YYYY-MM-DD"}
              onChange={handleDateChange}
              defaultValue={dayjs()}
              picker="date"
              style={{marginTop: "5%"}}
          />
        </div>
      </div>
    <Row>
      <Col span={2} push={2}>
        <div
          className="mapDiv"
          ref={mapDiv}
          style={{
            marginLeft: "13%",
            marginTop: "8%",
            height: "80vh",
            width: "80vw",
          }}
        >
          <BuildingModal
            showModal={showModal}
            handleExitModal={handleExit}
            buildingName={buildingName}
            eventData={eventData}
          />
        </div>
      </Col>
      
    </Row>
  </div>
  );
};

export default EventMap;
