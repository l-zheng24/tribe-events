import React, { useState } from "react";
import { Modal, Button, Flex, Row, Space } from "antd";
import EventCard from "./EventCard";

export default function BuildingModal(props) {
  const { showModal, handleExitModal, buildingName, eventData } = props;
  const [currentPage, setCurrentPage] = useState(1);
  const [currentButton, setCurrentButton] = useState(1);
  const eventsPerPage = 4;

  const indexOfLastEvent = currentPage * eventsPerPage;
  const indexOfFirstEvent = indexOfLastEvent - eventsPerPage;
  const currentEvents = eventData ? eventData.slice(indexOfFirstEvent, indexOfLastEvent) : [];


  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
    setCurrentButton(pageNumber-1);
  };

  return (
    <Modal
      title={"Events for " + buildingName}
      open={showModal}
      onOk={handleExitModal}
      onCancel={handleExitModal}
      styles={{
        header: { backgroundColor: '#BACDB0' },
        body: { backgroundColor: '#BACDB0' },
        content: { backgroundColor: '#BACDB0' }
      }}
    >
      {currentEvents && (
        <div>
          {currentEvents.map((event, index) => (
            <div key={index}>
              <EventCard event={event} />
            </div>
          ))}
        </div>
      )}

        
        {eventData && eventData.length > eventsPerPage && (
          <Flex justify="center" align="center" style={{padding:'10px'}}>
            {Array.from({ length: Math.ceil(eventData.length / eventsPerPage) }, (_, i) => (
              <Button key={i} onClick={() => paginate(i + 1)} type="primary" style={{ backgroundColor: i===currentButton ? "#475B63" : "#729B79", margin: "2px" }}>
                {i + 1}
              </Button>
            ))}
          </Flex>
        )}

    </Modal>
  );
}

