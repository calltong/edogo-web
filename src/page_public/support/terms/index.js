import React, { Component } from 'react'
import { Row, Col } from 'reactstrap';

export default class TermsUse extends Component {
  render() {
    let md = { size: 4, offset: 4 }
    return (
      <div>
        <Row>
          <Col md={md} sm="12" xs="12">
            Terms of use is coming...
          </Col>
        </Row>
      </div>
    )
  }
}
