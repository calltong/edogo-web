import React, { Component } from 'react'
import { Row, Col } from 'reactstrap'

import { history } from '../../utils/history'
import { Btn, CloseBtn } from '../../components/button'
import { Link } from '../../components/link'

export default class Success extends Component {
  constructor() {
    super()
    this.onProfile = this.onProfile.bind(this)
  }

  onProfile() {
    history.push('../pv/member/profile')
    let { onClose } = this.props
    if (onClose) onClose()
  }

  render() {
    let css = { textAlign: 'center' }
    let pad = { padding: '10px' }
    let { id } = this.props
    return (
      <div style={pad}>
        <h3 style={css}>Sign up completed</h3>
        <br />
        <p style={css}>Thank you for sign up with Edogo</p>
        <br />
        <Row>
          <Col md="6">
            <Btn
              onClick={this.onProfile}
              className="btn-fullsize">
              Edit Profile
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
