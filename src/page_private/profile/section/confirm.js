import React, { Component } from 'react'
import { Row, Col } from 'reactstrap'

import { CloseBtn, OkBtn } from '../../../components/button'

export default class ConfirmSection extends Component {
  render() {
    return (
      <Row>
        <Col md={{size: '4', offset: '4'}}>
          <CloseBtn
            className="btn-fullsize"
            onClick={this.props.onCancel} />
        </Col>
        <Col md="4">
          <OkBtn
            className="btn-fullsize"
            onClick={this.props.onConfirm} />
        </Col>
      </Row>
    )
  }
}
