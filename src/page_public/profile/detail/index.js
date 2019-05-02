import React, { Component } from 'react'
import { Container, Row, Col } from 'reactstrap'

import MyInfo from './info'
import MyHistory from './history'

export default class Detail extends Component {
  render() {
    return (
      <Container className="user-block">
        <Row>
          <Col md="7">
            <MyInfo />
          </Col>
          <Col md="5">
            <MyHistory />
          </Col>
        </Row>
      </Container>
    )
  }
}
