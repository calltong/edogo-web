import React, { Component } from 'react'
import { Container, Row, Col } from 'reactstrap'
import { Link } from 'react-router-dom'

export default class Completed extends Component {

  render() {
    let text = { textAlign: 'center' }

    return (
      <Container className="layout-form">
        <h2 style={text}>{this.props.title || 'Completed'}</h2>
        <br />
        <h4 style={text}>{this.props.detail}</h4>
        <br />
        <p style={text}><i className="fas fa-check-circle layout-form-icon text-success" /></p>
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
