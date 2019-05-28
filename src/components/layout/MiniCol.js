import React, { Component } from 'react'
import { Col } from 'reactstrap'

const md = {
  size: 4,
  offset: 4,
}
export default class MiniCol extends Component {

  render() {
    return (
      <Col md={md} sm="12" xs="12">
        {this.props.children}
      </Col>
    )
  }
}
