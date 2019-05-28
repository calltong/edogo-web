import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { Row, Col, Form } from 'reactstrap'

import {
  SigninBtn, CloseBtn,
  GoogleBtn, FacebookBtn } from '../../components/button'

import { Loading } from '../../components/loading'
import InputGroup from '../../components/forms/InputGroup'
import { Title } from '../../components/layout'
import { helper } from '../../utils/helper'
import { history } from '../../utils/history'

export class Content extends Component {
  constructor() {
    super()
    this.state = {
      email: '',
      password: '',
      valid: {
        email: false,
        password: false,
      }
    }

    this.onChange = this.onChange.bind(this)
    this.onEmail = this.onEmail.bind(this)
    this.onGmail = this.onGmail.bind(this)
  }

  onChange(evt) {
    let name = evt.target.name
    let value = evt.target.value
    let state = this.state
    state[name] = value
    state.valid = {
      email: false,
      password: false,
    }
    this.setState(state)
  }

  async onEmail() {
    let { email, password, valid } = this.state

    if (email === '') valid.email = true
    else if (password === '') valid.password = true
    else {
      await this.props.onEmail({ email, password })
      return
    }
    this.setState({ valid })
  }

  async onGmail(res) {
    await this.props.onGmail(res)
  }

  render() {
    let { loading, email, password, valid } = this.state
    let { error } = this.props
    let text = { textAlign: 'center' }
    let btn = { marginBottom: '4px' }

    let errText
    if (error) errText = (<p className="text-res-error">{error}</p>)
    return (
      <div>
        <Loading dialog loading={loading} />
        <Title>Welcome to login</Title>
        <br />
        <Row>
          <Col md="12">
            <GoogleBtn
              text="LOGIN WITH GMAIL"
              className="btn-fullsize"
              onResponse={this.onGmail} />
          </Col>
        </Row>
        <br />
        <p style={text}>or login with your email</p>
        <Row>
          <Col md="12">
            <Form>
              <InputGroup
                label="Email"
                type="email"
                name="email"
                placeholder="your email"
                text="Example myemail@mail.com"
                feedback="please fill your email"
                invalid={valid.email}
                value={email}
                onChange={this.onChange} />

              <InputGroup
                label="Password"
                type="password"
                name="password"
                placeholder="your password"
                feedback="please fill your password"
                invalid={valid.password}
                value={password}
                onChange={this.onChange} />
            </Form>
          </Col>
          <Col md="12">
            {errText}
            <SigninBtn
              className="btn-fullsize"
              style={btn}
              onClick={this.onEmail} />
          </Col>
          <Col md="12">
            <CloseBtn
              className="btn-fullsize"
              onClick={this.props.onClose} />
          </Col>
          <Col md="12">
            <ResetPassword>
              <Link to="" onClick={this.props.onResetPassword}>Forgot your password?</Link>
            </ResetPassword>
          </Col>
        </Row>
      </div>
    )
  }
}

const ResetPassword = styled.div`
  margin-top: 10px;
`

export default inject('member')(observer(Content))
