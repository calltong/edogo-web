import React, { Component } from 'react'
import { Row, Col } from 'reactstrap';

export default class PrivacyPolicy extends Component {
  render() {
    let md = { size: 4, offset: 4 }
    return (
      <div>
        <Row>
          <Col md={md} sm="12" xs="12">
            Privacy Policy is coming...
          </Col>
        </Row>
      </div>
    )
  }
}
