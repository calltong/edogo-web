import React, { Component } from 'react'
import { observer, inject } from 'mobx-react'
import { Container, Row, Col } from 'reactstrap'

import { Loading } from '../../components/loading'
import { Btn, SaveBtn } from '../../components/button'

import { helper } from '../../utils/helper'
import { history } from '../../utils/history'

import GeneralInfo from '../../page_private/profile/general/info'
import TeacherInfo from '../../page_private/profile/teacher/info'
import Course from '../../page_private/profile/course'
import Error from './error'

import Choose from './choose'
import Complete from './complete'
import Step from './step'

export class Register extends Component {
  constructor() {
    super()
    this.state = {
      loading: false,
    }

    let css = {
      margin: '50px 0px'
    }
    this.menu = (
      <div>
        <hr style={css} />
        <Row>
          <br />
          <Col md={{size: 2, offset: 4}}>
            <Btn className="btn-fullsize" onClick={this.onBack.bind(this)}>
              <i className="fas fa-chevron-circle-left" /> Back
            </Btn>
          </Col>
          <Col md="2">
            <Btn className="btn-fullsize" onClick={this.onNext.bind(this)}>
              Next <i className="fas fa-chevron-circle-right" />
            </Btn>
          </Col>
        </Row>
      </div>
    )

    this.completed = (
      <div>
        <hr style={css} />
        <Row>
          <br />
          <Col md={{size: 2, offset: 4}}>
            <Btn className="btn-fullsize" onClick={this.onBack.bind(this)}>
              <i className="fas fa-chevron-circle-left" /> Back
            </Btn>
          </Col>
          <Col md="2">
            <SaveBtn className="btn-fullsize" onClick={this.onSave.bind(this)} />
          </Col>
        </Row>
      </div>
    )
  }

  async onBack() {
    this.props.register.back()
  }

  async onNext() {
    let data = this.props.register.toJS().data
    let invalid = false
    if (data.step === 'profile') {
      invalid = await this.props.member.validateProfile()
    } else if (data.step === 'teacher') {
      invalid = await this.props.member.validateTeacher()
    }

    if (invalid === false) this.props.register.next()
  }

  async onSave() {
    this.setState({ loading: true })
    const res = await this.props.member.save()
    this.setState({ loading: false })

    if (helper.isNull(res.err)) history.push('../../../pv/member/profile')
  }

  render() {
    let cssMenu = {
      margin: '20px 0px',
    }

    let css = {
      backgroundColor: '#FCFBFB',
      border: '1px solid #E4E5E4',
      borderRadius: '5px',
      padding: '40px 10px',
    }

    let data = this.props.register.toJS().data
    let content
    let menu = this.menu
    let step = <Step />
    let login = this.props.member.isLogin()

    if (login) {
      switch (data.step) {
        case 'set_user_type':
          content = <Choose />
          menu = <div />
          break
        case 'profile':
          content = <GeneralInfo />
          break
        case 'teacher':
          content = <TeacherInfo />
          break
        case 'course':
          content = <Course noSave />
          break
        case 'complete':
          content = <Complete />
          menu = this.completed
          break
        default:
          content = <Error text={data.message} />
          menu = <div />
          step = <div />
          break
      }
    } else {
      content = <Error text="Token is expired" />
      menu = <div />
      step = <div />
    }

    return (
      <Container>
        <Loading dialog loading={this.state.loading} />
        <div style={cssMenu}>
          {step}
        </div>
        <div style={css}>
          {content}
          {menu}
        </div>
      </Container>
    )
  }
}

export default inject('register', 'member')(observer(Register))
