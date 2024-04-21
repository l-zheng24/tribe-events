import{ Modal }from"antd";

export default function EventContainer(props) {
    const { showModal, handleExitModal, buildingName, eventData } = props;
  
    console.log(eventData);
  
    return (
      <Modal
        title={"Events for " + buildingName}
        open={showModal}
        onOk={handleExitModal}
        onCancel={handleExitModal}
      >
        
      </Modal>
    );
  }
  