import React, { Component } from 'react'
import { Container, Row, Col } from 'reactstrap'
import { Link } from 'react-router-dom'

export default class NotFound extends Component {

  render() {
    let text = { textAlign: 'center' }
    let detail = this.props.detail || ''
    let len = detail.length
    if (len > 0) {
      let a = detail.charAt(0).toUpperCase()
      detail = a + detail.slice(1, len)
    }
    return (
      <Container className="layout-form">
        <h2 style={text}>{this.props.title || 'Not Found'}</h2>
        <br />
        <h4 style={text}>{detail}</h4>
        <br />
        <p style={text}><i className="fas fa-ban layout-form-icon text-error" /></p>
        <br />
        <Row>
          <Col md="12" sm="12" xs="12">
            <p style={text}>if you are not sign up yet, please <Link to="../../../signup">sing up here</Link></p>
          </Col>
          <Col md="12" sm="12" xs="12">
            <p style={text}>if you already have account, please <Link to="../../../signin">log in here</Link></p>
          </Col>
          <Col md="12" sm="12" xs="12">
            <p style={text}>if you are forgot password, please <Link to="../../../reset/password">reset password here</Link></p>
          </Col>
        </Row>
      </Container>
    )
  }
}
