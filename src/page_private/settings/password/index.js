import React, { Component } from 'react'
import { Container, Row, Col } from 'reactstrap';

import Content from './content'

export default class ResetPassword extends Component {
  render() {
    return (
      <Container>
        <Row>
          <Col md={{ size: 4, offset: 4 }}>
            <h4 style={{ textAlign: 'center' }}>Setting Your Password</h4>
            <Content />
          </Col>
        </Row>
      </Container>
    )
  }
}
