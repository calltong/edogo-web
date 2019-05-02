import React, { Component, Fragment } from 'react'
import { Row, Col } from 'reactstrap'

export default class Complete extends Component {
  render() {
    return (
      <Fragment>
        <Row>
          <Col md="12">
            <h2 style={{textAlign: 'center'}}>Register has been completed</h2>
          </Col>
        </Row>
      </Fragment>
    )
  }
}
