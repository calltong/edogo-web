import React, { Component } from 'react'
import { Row, Col } from 'reactstrap'

import { history } from '../../utils/history'
import { Btn, CloseBtn } from '../../components/button'
import { Link } from '../../components/link'

export default class Success extends Component {
  constructor() {
    super()
    this.onNext = this.onNext.bind(this)
  }

  async onNext() {
    let { onClose } = this.props
    if (onClose) await onClose()
    history.push('../../../../login')
  }

  render() {
    let css = { textAlign: 'center' }
    let pad = { padding: '10px' }
    let { id } = this.props
    return (
      <div style={pad}>
        <h3 style={css}>Check your comfirmation email</h3>
        <br />
        <p style={css}>Thank you for signup with Edogo</p>
        <br />
        <Row>
          <Col md="6">
            <Btn
              onClick={this.onNext}
              className="btn-fullsize">
              Go to login
            </Btn>
          </Col>
          <Col md="6">
            <CloseBtn
              onClick={this.props.onClose}
              className="btn-fullsize" />
          </Col>
        </Row>
      </div>
    )
  }
}
