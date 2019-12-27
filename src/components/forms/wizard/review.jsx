import React, { useState } from "react";
import { Row, Button } from "react-bootstrap";

const Review = props => {
  const [isSubmitting, setSubmitting] = useState(false);

  const handleSubmit = e => {
    e.preventDefault();
    setSubmitting(true);
    props.handleSubmit();
    setSubmitting(false);
  };
  return (
    <React.Fragment>
      <h1>Review</h1>
      <div>{JSON.stringify(props)}</div>
      <Row>
        <Button
          disabled={isSubmitting}
          variant="warning"
          onClick={e => props.back(e)}
        >
          Back
        </Button>
        <Button
          disabled={isSubmitting}
          variant="warning"
          onClick={e => handleSubmit(e)}
        >
          Submit
        </Button>
      </Row>
    </React.Fragment>
  );
};

export default Review;
