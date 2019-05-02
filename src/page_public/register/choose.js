import React, { Component, Fragment } from 'react'
import { observer, inject } from 'mobx-react'
import { Row, Col } from 'reactstrap'

import { Btn } from '../../components/button'

export class Choose extends Component {
  constructor() {
    super()

    this.onStudent = this.onStudent.bind(this)
    this.onTeacher = this.onTeacher.bind(this)
  }

  onStudent() {
    this.props.register.setType('student')
    this.props.member.setType('student')
  }

  onTeacher() {
    this.props.register.setType('teacher')
    this.props.member.setType('teacher')
  }

  render() {
    return (
      <Fragment>
        <Row>
          <Col md={{size: 2, offset: 4}}>
            <Btn className="btn-fullsize btn-l-font" onClick={this.onStudent}>
              Student
            </Btn>
          </Col>
          <Col md="2">
            <Btn className="btn-fullsize btn-l-font" onClick={this.onTeacher}>
              Teacher
            </Btn>
          </Col>
        </Row>
      </Fragment>
    )
  }
}

export default inject('register', 'member')(observer(Choose))
