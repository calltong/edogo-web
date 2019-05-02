import React, { Component } from 'react'
import { Row, Col } from 'reactstrap'

import { AddBtn } from '../../../components/button'

export default class AddSection extends Component {
  render() {
    let valid
    if (this.props.invalid) {
      valid = (
        <Row>
          <Col md="6">
            <p className="text-invalid">please create opening course</p>
          </Col>
        </Row>
      )
    }

    return (
      <div>
        <Row>
          <Col md="2">
            <AddBtn
              noText
              invalid={this.props.invalid}
              className="btn-fullsize btn-s-font"
              onClick={this.props.onClick} />
          </Col>
        </Row>
        {valid}
      </div>
    )
  }
}
