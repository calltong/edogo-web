import React, { Component } from 'react'
import { Container, Row, Col } from 'reactstrap'

import MyTiming from './timing'
import MySession from './session'

export default class MyClass extends Component {
  render() {
    return (
      <Container className="user-block">
        <Row>
          <Col md="6">
            <MyTiming />
          </Col>
          <Col md="6">
            <MySession />
          </Col>
        </Row>
      </Container>
    )
  }
}
