import React, { Component } from 'react'
import { Row, Col } from 'reactstrap'

import Signin from './index'
import { history } from '../../utils/history'
import { Page, MiniCol } from '../../components/layout'

export default class SigninPage extends Component {
  constructor() {
    super()

    this.onClose = this.onClose.bind(this)
    this.onCompleted = this.onCompleted.bind(this)
  }

  onClose() {
    history.push('../../../../')
  }

  onCompleted() {
    history.push('../../../../pv/profile/general')
  }

  render() {
    return (
      <Row>
        <MiniCol>
          <Page>
            <Signin onCompleted={this.onCompleted} onClose={this.onClose} />
          </Page>
        </MiniCol>
      </Row>
    )
  }
}
