import React from "react";
import { ListGroup, Row, Col, Button } from "react-bootstrap";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";

const DynamicTextDisplay = props => {
  return (
    <ListGroup>
      {props.values.map((item, i) => (
        <Col xs={12} key={i}>
          <Row className="justify-content-sm-center">
            <ListGroup.Item key={i}>{item.value}</ListGroup.Item>
            <Button
              variant="outline-secondary"
              size="sm"
              className="dynamic-input-btn"
              onClick={console.log("remove click does nothing for now")}
            >
              <FontAwesomeIcon icon={faTimes} />
            </Button>
          </Row>
        </Col>
      ))}
    </ListGroup>
  );
};

export default DynamicTextDisplay;
