import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import {
  Container, Row, Col,
  Form } from 'reactstrap'

import {
  SigninBtn, CloseBtn,
  GoogleBtn, FacebookBtn } from '../../components/button'

import { Loading } from '../../components/loading'
import InputGroup from '../../components/forms/InputGroup'
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
    console.log('on email')
    let { email, password, valid } = this.state

    if (email === '') valid.email = true
    else if (password === '') valid.password = true
    else {
      console.log('p:',this.props)
      await this.props.onEmail({ email, password })
      return
    }
    this.setState({ valid })
  }

  async onGmail(res) {
    //let { profileObj } = res
    //let { googleId, email } = profileObj
    await this.props.onGmail(res)
  }

  render() {
    let { status, message, email, password, valid } = this.state
    let text = { textAlign: 'center' }
    let btn = { marginBottom: '2px' }

    let error
    if (status === 'error') error = (<p className="text-res-error">{message}</p>)

    return (
      <Container className="layout-form">
        <Loading dialog loading={this.state.loading} />
        <h4 style={text}>Welcome to sign in</h4>
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
            {error}
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
        </Row>
      </Container>
    )
  }
}

export default inject('member')(observer(Content))
