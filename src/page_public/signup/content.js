import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import { Link } from 'react-router-dom'
import { Container, Row, Col, Form } from 'reactstrap'

import InputGroup from '../../components/forms/InputGroup'
import { SignupBtn, CloseBtn, GoogleBtn } from '../../components/button'
import { Title } from '../../components/layout'

export default class Content extends Component {
  constructor() {
    super()
    this.state = {
      email: '',
      password: '',
      valid: {
        email: true,
        password: false,
      },
    }

    this.onChange = this.onChange.bind(this)
    this.onEmail= this.onEmail.bind(this)
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
    let { email, password, retry, valid } = this.state

    if (email === '') valid.email = true
    else if (password === '') valid.password = true
    else {
      await this.props.onEmail({ email, password })
      return
    }

    this.setState({ valid })
  }

  async onGmail(res) {
    let { onGmail } = this.props
    if (onGmail) onGmail(res)
  }

  async onGotoPage(uri) {
    let { onClose } = this.props
    if (onClose) onClose(uri)
  }


  render() {
    let { email, password, valid } = this.state
    let error = this.props.error
    let msg
    if (error !== undefined) msg = (<p className="text-res-error">{error}</p>)

    let text = { textAlign: 'center' }
    let btn = { marginBottom: '2px'}
    return (
      <div>
        <Title style={text}>Welcome to signup</Title>
        <br />
        <Row>
          <Col md="12">
            <GoogleBtn
              text="SIGNUP WITH GMAIL"
              className="btn-fullsize"
              onResponse={this.onGmail} />
          </Col>
        </Row>
        <br />
        <p style={text}>or signup with your email</p>
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
            {msg}
            <SignupBtn
              name="signup"
              className="btn-fullsize"
              style={btn}
              onClick={this.onEmail} />
          </Col>
          <Col md="12">
            <CloseBtn
              className="btn-fullsize"
              style={btn}
              onClick={this.onGotoPage.bind(this, undefined)} />
          </Col>
        </Row>
        <br />
        <Row>
          <Col>
            <p style={{fontSize: '12px', textAlign: 'center'}}>By clicking ‘Sign Up’ you agree to the
              <Link to="" onClick={this.onGotoPage.bind(this, '../../terms')}> Terms of Use</Link> and <Link to="" onClick={this.onGotoPage.bind(this, '../../privacy')}>Privacy Policy</Link>.
            </p>
          </Col>
        </Row>
      </div>
    )
  }
}
