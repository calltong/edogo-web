import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import { Row, Col } from 'reactstrap'

import Signin from './index'
import { Loading } from '../../components/loading'
import { history } from '../../utils/history'
import { Page, MiniCol } from '../../components/layout'

export class AuthRequired extends Component {
  constructor() {
    super()

    this.onClose = this.onClose.bind(this)
  }

  onClose() {
    history.push('../../../../')
  }

  render() {
    return (
      <Row>
        <MiniCol>
          <Page>
            <Signin />
          </Page>
        </MiniCol>
      </Row>
    )
  }
}

export default inject('member')(observer(AuthRequired))
