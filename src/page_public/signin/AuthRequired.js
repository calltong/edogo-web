import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import { Row, Col } from 'reactstrap'

import Signin from './index'
import { Loading } from '../../components/loading'

export class AuthRequired extends Component {
  constructor() {
    super()
    this.state = {
      loading: false,
    }
  }

  render() {
    let md = { size: 6, offset: 3 }
    return (
      <div>
        <Row>
          <Col md={md}>
            <Signin />
          </Col>
        </Row>
      </div>
    )
  }
}

export default inject('member')(observer(AuthRequired))
