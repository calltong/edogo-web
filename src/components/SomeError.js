import React, { Component } from 'react'
import { Container, Row, Col } from 'reactstrap'

import { RetryBtn } from './button'
import { Page, Title } from './layout'

export default class SomeError extends Component {

  render() {
    let text = { textAlign: 'center' }
    let {
      title = 'Something wrong',
      detail = 'Sorry has some error and retry again',
      message, onRetry } = this.props

    let len = detail.length
    if (len > 0) {
      let a = detail.charAt(0).toUpperCase()
      detail = a + detail.slice(1, len)
    }

    let retry
    if (onRetry) {
      retry = (
        <Row>
          <Col md={{size: 2, offset: 5}} sm={{size: 3, offset: 3}}>
            <RetryBtn className="btn-fullsize" onClick={onRetry} />
          </Col>
        </Row>
      )
    }

    let info
    if (message) {
      info = (
        <div>
          <p style={text}>{message}</p>
          <br />
        </div>
      )
    }
    return (
      <Page>
        <Title style={text}>{title}</Title>
        <br />
        <h5 style={text}>{detail}</h5>
        <br />
        {info}
        <p style={text}><i className="fas fa-exclamation-circle layout-form-icon text-error" /></p>
        <br />
        {retry}
      </Page>
    )
  }
}
