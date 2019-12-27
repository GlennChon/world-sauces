import React, { useState, useEffect } from "react";
import { Modal, Button } from "react-bootstrap";

function MessageModal({
  modalHeader,
  messageHeader,
  message,
  positiveBtnText,
  negativeBtnText,
  handlePositive,
  handleNegative,
  ...props
}) {
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          {modalHeader}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h4>{messageHeader}</h4>
        <p>{message}</p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleNegative}>
          {negativeBtnText}
        </Button>
        <Button variant="primary" onClick={handlePositive}>
          {positiveBtnText}
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
export default MessageModal;
