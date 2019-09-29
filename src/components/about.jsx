import React, { Component } from "react";
import { Container, ListGroup, ListGroupItem, Col, Row } from "react-bootstrap";

class About extends Component {
  state = {};

  //Display this : As an Amazon Associate I earn from qualifying purchases.
  render() {
    return (
      <>
        <Container>
          <header>
            <Row className="justify-content-around">
              <h3>Sharing</h3>
            </Row>
          </header>
          <section>
            <Row className="justify-content-sm-center">
              <Col xs={0} md={1} lg={2} />
              <Col xs={12} md={10} lg={8}>
                <p>
                  Over years of travel and sharing meals around the world, I
                  have noticed that each country has their own sauces that are
                  rarely represented outside of their respective countries.
                </p>
              </Col>
              <Col xs={0} md={1} lg={2} />
            </Row>
          </section>

          <header>
            <Row className="justify-content-around">
              <h3>Cooking &amp; Coding</h3>
            </Row>
          </header>
          <section>
            <Row className="justify-content-sm-center">
              <Col xs={0} md={1} lg={2} />
              <Col xs={12} md={10} lg={8}>
                <p>
                  My love for cooking and coding has led me to develop a sauce
                  database to help others learn about these amazing sauces and
                  open up an avenue for people to share their recipes from
                  around the world.
                  <br />I hope you will join me in growing this website, and I
                  hope this website will enable you to share with those around
                  you.
                </p>
              </Col>
              <Col xs={0} md={1} lg={2} />
            </Row>
          </section>

          <header>
            <Row className="justify-content-around">
              <h3>What you can do</h3>
            </Row>
          </header>

          <section>
            <Row className="justify-content-around">
              <ListGroup className="align-items-center">
                <ListGroupItem>
                  Use the referral links here to purchase anything you may need.
                  (Coming Soon)
                </ListGroupItem>
                <ListGroupItem>
                  Register and add recipes to grow the site.
                </ListGroupItem>
                <ListGroupItem>Share the site with your friends.</ListGroupItem>
                <ListGroupItem>
                  Report any bugs through the contact form. (Coming Soon)
                </ListGroupItem>
              </ListGroup>
            </Row>
          </section>
        </Container>
      </>
    );
  }
}

export default About;
