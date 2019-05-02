import React, { Component } from 'react'
import { Row, Col } from 'reactstrap'

export default class TitleSection extends Component {
  render() {
    return (
      <Row>
        <Col md="10">
          <h5>{this.props.value}</h5>
        </Col>
      </Row>
    )
  }
}
