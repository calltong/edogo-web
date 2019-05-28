import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
// import { Link } from 'react-router-dom'
import {
  Row, Col,
  Form, FormGroup, Label,
  Input, FormFeedback } from 'reactstrap'

import { OkBtn } from '../../../components/button'
import { Page, Title } from '../../../components/layout'
import InputGroup from '../../../components/forms/InputGroup'
import { error } from '../../../utils/error'

class Content extends Component {
  constructor() {
    super()
    this.state = {
      message: '',
      password: '',
      retry: '',
      valid: {
        password: false,
        retry: false,
      }
    }

    this.onConfirm = this.onConfirm.bind(this)
    this.onChange = this.onChange.bind(this)
  }

  async onConfirm() {
    try {
      let { password, retry, valid} = this.state
      if (password === '') {
        valid.password = true
        this.setState({ valid })
      } else if (retry === '') {
        valid.retry = true
        this.setState({ valid })
      } else if (password !== retry) {
        this.setState({ message: 'Password is not same.' })
      } else {
        let doc = this.props.verify.toJS().password
        await this.props.onSave({ email: doc.email, password })
      }
    } catch(e) {
      this.setState({ message: e.message })
    }

  }

  onChange(evt) {
    let state = this.state
    state[evt.target.name] = evt.target.value
    state.error = ''
    state.valid = {
      password: false,
      retry: false,
    }
    this.setState(state)
  }

  render() {
    let { loading, status, message, password, retry, valid } = this.state
    let doc = this.props.verify.toJS().password

    let textError
    if (message !== '') textError = (<p className="text-res-error">{message}</p>)

    return (
      <Page>
        <Title>Set Password</Title>
        <br />
        <Row>
          <Col md="12">
            <Form>
              <InputGroup
                readOnly
                label="Email"
                type="email"
                name="email"
                value={doc.email} />

              <InputGroup
                label="Password"
                type="password"
                name="password"
                placeholder="your password"
                feedback="please fill your password"
                invalid={valid.password}
                value={password}
                onChange={this.onChange} />

              <InputGroup
                label="Retry Password"
                type="password"
                name="retry"
                placeholder="your retry password"
                feedback="please fill your retry password"
                invalid={valid.retry}
                value={retry}
                onChange={this.onChange} />
            </Form>
          </Col>
          <Col md="12">
            {textError}
            <OkBtn className="btn-fullsize" onClick={this.onConfirm} />
          </Col>
        </Row>
      </Page>
    )
  }
}

export default inject('member', 'verify')(observer(Content))
