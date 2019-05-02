import React, { Component } from 'react'
import { Container, Row, Col } from 'reactstrap'

import MyVideo from './video'
import MyPost from './post'

export default class Content extends Component {
  render() {
    return (
      <Container className="user-block">
        <Row>
          <Col md="6">
            <MyVideo />
          </Col>
          <Col md="6">
            <MyPost />
          </Col>
        </Row>
      </Container>
    )
  }
}
