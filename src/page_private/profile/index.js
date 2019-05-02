import React, { Component } from 'react'
import { observer, inject } from 'mobx-react'
import {
  Row, Col,
  Card, CardBody } from 'reactstrap'

import Menu from './menu'
import General from './general'
import Booking from './booking'
import Teacher from './teacher'
import Course from './course'
import Payment from './payment'
import Invitation from './invitation'
import Password from './password'

export class Profile extends Component {
  render() {
    let menu = this.props.match.params.menu

    let content
    let title = ''
    switch (menu) {
      case 'booking':
        title = 'My Booking'
        content = <Booking />
        break
      case 'teacher':
        title = 'Be Teacher'
        content = <Teacher />
        break
      case 'course':
        title = 'My Course'
        content = <Course />
        break
      case 'payment':
        title = 'Payment'
        content = <Payment />
        break
      case 'invitation':
        title = 'Invitation'
        content = <Invitation />
        break
      case 'password':
        title = 'Password'
        content = <Password />
        break
      default:
        title = 'Profile'
        content = <General />
    }

    return (
      <div>
        <Row>
          <Col md="3">
            <Menu id={this.props.match.params.id} title={title} />
          </Col>
          <Col md="9">
            <Card>
              <CardBody>
                {content}
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    )
  }
}

export default inject('member')(observer(Profile))
