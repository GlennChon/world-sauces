import React, { useState, useEffect, useCallback } from "react";

import Review from "./review";
import MessageModal from "../../common/messageModal";

import { ProgressBar, Container, Row, Col, Button } from "react-bootstrap";

const FormWizard = ({ initialState, formComponents, doSubmit, ...props }) => {
  const [formState, setFormState] = useState({ ...initialState });
  const [currentStep, setCurrentStep] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [loadDraftData, setLoadDraftData] = useState(false);
  const [modalHeader, setModalHeader] = useState("Unsubmitted Recipe");
  const [messageHeader, setMessageHeader] = useState("Draft Available");
  const [message, setMessage] = useState(
    "An unfinished recipe has been found, would you like to load it?"
  );
  const [positiveBtnText, setPositiveBtnText] = useState("Load");
  const [negativeBtnText, setNegativeBtnText] = useState("Delete");

  useEffect(() => {
    checkDraft();
  }, []);

  const handleLoadData = () => {
    if (loadDraftData) {
      let formDraft = JSON.parse(sessionStorage.getItem("recipe_draft"));
      setFormState({ ...formDraft });
    } else {
      sessionStorage.removeItem("recipe_draft");
    }
  };

  const saveDraft = () => {
    let formDraft = JSON.stringify(formState);
    sessionStorage.setItem("recipe_draft", formDraft);
    return;
  };
  const next = values => {
    setFormState(prevState => {
      return { ...prevState, ...values };
    });
    return setCurrentStep(currentStep + 1);
  };
  const back = (e, values) => {
    e.preventDefault();
    setFormState(prevState => {
      return { ...prevState, ...values };
    });
    return setCurrentStep(currentStep - 1);
  };

  //TODO:
  const checkboxChangeHandler = () => {
    return;
  };

  const dynamicChangeHandler = () => {
    return;
  };

  const displayStep = () => {
    if (currentStep < formComponents.length) {
      let stepProps = { next: next, back: back, values: formState };
      if (formComponents[currentStep].specialInputs.includes("dynamictext")) {
        stepProps = { ...stepProps, onDynamicChange: dynamicChangeHandler };
      }
      if (formComponents[currentStep].specialInputs.includes("checkbox")) {
        stepProps = { ...stepProps, onDynamicChange: checkboxChangeHandler };
      }
      return (
        <React.Fragment>
          {React.createElement(
            formComponents[currentStep].component,
            (props = stepProps)
          )}
        </React.Fragment>
      );
    } else {
      return (
        <Review data={formState} handleSubmit={handleSubmit} back={back} />
      );
    }
  };

  const handleSubmit = () => {
    // if user is unregistered
    //cache formState as draft

    if (formState.author === "Unregistered") {
      console.log("User is unregistered");
      return saveDraft();
      //reroute to register
    } else {
      return doSubmit(formState);
    }
  };

  const StepProgress = () => {
    return (
      <Row>
        {formComponents.map((step, i) => (
          <Col key={i}>
            <Row>
              <Col>
                {step.title}
                <ProgressBar now={currentStep > i ? 100 : 0} />
              </Col>
            </Row>
          </Col>
        ))}
      </Row>
    );
  };

  //Modal

  const handlePositive = () => {
    setShowModal(false);
    setLoadDraftData(true);
    return;
  };

  const handleNegative = () => {
    setShowModal(false);
    return;
  };

  const checkDraft = () => {
    let formDraft = sessionStorage.getItem("recipe_draft");
    if (formDraft) {
      setShowModal(true);
    } else {
      setShowModal(false);
    }
    return;
  };

  return (
    <Container>
      <MessageModal
        show={showModal}
        modalHeader={modalHeader}
        messageHeader={messageHeader}
        message={message}
        positiveBtnText={positiveBtnText}
        negativeBtnText={negativeBtnText}
        handlePositive={handlePositive}
        handleNegative={handleNegative}
        onExiting={handleLoadData}
      />
      {StepProgress()}
      {displayStep()}
    </Container>
  );
};

export default FormWizard;
