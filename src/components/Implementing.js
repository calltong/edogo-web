import React, { Component } from 'react'
import { Container, Row, Col } from 'reactstrap'
import { Link } from 'react-router-dom'

export default class Implementing extends Component {

  render() {
    let text = { textAlign: 'center' }

    return (
      <Container className="layout-form">
        <h2 style={text}>This Page is coming soon....</h2>
        <br />
        <Row>
          <Col md="12" sm="12" xs="12">
            <p style={text}>go to home page <Link to="../../../">click here</Link></p>
          </Col>
        </Row>
      </Container>
    )
  }
}
