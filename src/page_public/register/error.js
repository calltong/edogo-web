import React, { Component, Fragment } from 'react'
import { Row, Col } from 'reactstrap'

import { BackLink } from '../../components/link'

export default class Error extends Component {
  render() {
    let msg = this.props.text || ''
    return (
      <Fragment>
        <Row>
          <Col md={{size: 12}}>
            <div style={{textAlign: 'center'}}>
              <h4>Register has problem</h4>
              <br />
              <p>{msg}</p>
              <p>Please register again</p>
            </div>
            <br />
          </Col>
        </Row>
        <Row>
          <Col md={{size: 4, offset: 4}}>
            <BackLink to="../../" className="btn-fullsize btn-l-font">
              Back to Home Page
            </BackLink>
          </Col>
        </Row>
      </Fragment>
    )
  }
}
