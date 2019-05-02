import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import { Container, Row, Col } from 'reactstrap';

import Completed from '../../../components/Completed'
import Content from './content'

export class ResetPassword extends Component {
  render() {
    let md = { size: 6, offset: 3 }
    let data = this.props.setting.toJS().reset.password
    console.log('form', data)
    let page
    if (data.status === 'completed') {
      page = (<Completed title="Reset Password" detail="Reset password completed, please confirm on your email." />)
    } else page = (<Content {...this.props} />)

    return (
      <Row>
        <Col md={md}>
          <Container className="layout-form">
            {page}
          </Container>
        </Col>
      </Row>
    )
  }
}

export default inject('setting')(observer(ResetPassword))
