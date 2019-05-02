import React, { Component } from 'react'
import { Container, Row, Col } from 'reactstrap'
import { Link } from 'react-router-dom'

export default class MemberNotFound extends Component {
  render() {
    let text = { textAlign: 'center' }
    return (
      <Container className="layout-form">
        <h2 style={text}>Member Not Found</h2>
        <br />
        <p style={text}><i className="fas fa-ban layout-form-icon text-error" /></p>
        <br />
        <Row>
          <Col md="12" sm="12" xs="12">
            <p style={text}>We are sorry inconvenient, please <Link to="../../../">back to home here</Link></p>
          </Col>
        </Row>
      </Container>
    )
  }
}
