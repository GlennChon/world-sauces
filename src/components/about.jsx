import React, { Component } from "react";
import { Container, ListGroup, ListGroupItem, Col, Row } from "react-bootstrap";

class About extends Component {
  state = {};
  render() {
    return (
      <>
        <Container>
          <Row className="justify-content-md-center">
            <Col xs="0" lg="2" />
            <Col md="auto">
              <h1>About</h1>
            </Col>
            <Col xs="0" lg="2" />
          </Row>

          <Row className="justify-content-md-center">
            <Col xs="0" lg="2" />
            <Col md="auto">
              <p>
                Over years of travel, I have noticed that each country has their
                own sauces that are rarely represented outside of their
                respective countries. My love for cooking and coding has led me
                to develop a sauce database to help others learn about these
                amazing sauces and open up an avenue for people to share their
                recipes from around the world. I hope you will join me in
                growing and sharing this website with all those who love food.
              </p>
            </Col>
            <Col xs="0" lg="2" />
          </Row>

          <Row className="justify-content-md-center">
            <Col xs="0" lg="2" />
            <Col md="auto">
              <h3>What I believe</h3>
            </Col>
            <Col xs="0" lg="2" />
          </Row>

          <Row className="justify-content-md-center">
            <Col xs="0" lg="3" />
            <Col md="auto">
              <p>
                I believe sharing great food brings people together and I hope
                the recipes you find here will enable you to share with those
                around you.
              </p>
            </Col>
            <Col xs="0" lg="3" />
          </Row>

          <Row className="justify-content-md-center">
            <Col xs="0" lg="2" />
            <Col md="auto">
              <h3>Here are a few ways you can help this website!</h3>
            </Col>
            <Col xs="0" lg="2" />
          </Row>

          <Row className="justify-content-md-center">
            <Col xs="0" lg="3" />
            <Col md="auto">
              <ListGroup>
                <ListGroupItem>
                  Use the referral links here to purchase anything you may need.
                </ListGroupItem>
                <ListGroupItem>
                  Register and add Recipes to grow the database.
                </ListGroupItem>
                <ListGroupItem>Share the site with your friends.</ListGroupItem>
                <ListGroupItem>
                  Report any bugs through the contact form.
                </ListGroupItem>
              </ListGroup>
            </Col>
            <Col xs="0" lg="3" />
          </Row>
        </Container>
      </>
    );
  }
}

export default About;
