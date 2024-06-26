import React from "react";
import { Card, Col, Collapse, Row } from "antd";
import { DateTime }  from "luxon";

export default function EventCard(props) {
const { event } = props;  console.log(event, "This is event");
function convert(input) {
    return DateTime.fromFormat(input, 'HH:mm:ss').toFormat('h:mm a');
}

  console.log(event);
  return (
    <Card style={{backgroundColor: '#F3E8EE', margin: '10px'}}>
      <Row>
        <b>{event.title}</b>
      </Row>
      <Row>
      <Col span={24}>
        <b>Location: </b>{event.event_loc}
      </Col>
      </Row>
      <Row>
        <Col span={12}>
          <b>Start time: </b> {convert(event.start_time)}
        </Col>
        <Col span={12}>
          <b>End time: </b> {convert(event.end_time)}
        </Col>
        <Collapse style={{backgroundColor:'#BACDB0', marginTop: "4px"}}>
            <Collapse.Panel header="Description" key="1">
                {event.long_desc}
            </Collapse.Panel>
        </Collapse>
      </Row>
    </Card>
  );
}
