import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
// import { Link } from 'react-router-dom'
import {
  Row, Col,
  Form, FormGroup, Label,
  Input, FormFeedback } from 'reactstrap';

import { OkBtn } from '../../../components/button'
import { Loading } from '../../../components/loading'

class Content extends Component {
  constructor() {
    super()
    this.state = {
      loading: false,
      error: '',
      password: '',
      retry: '',
      valid: {
        password: false,
        retry: false,
      }
    }

    this.onConfirm = this.onConfirm.bind(this)
    this.chValue = this.chValue.bind(this)
    console.log('code password')
  }

  async onConfirm() {
    let { password, retry, valid} = this.state
    if (password === '') {
      valid.password = true
      this.setState({ valid })
    } else if (retry === '') {
      valid.retry = true
      this.setState({ valid })
    } else if (password !== retry) {
      this.setState({ error: 'Password is not same.' })
    } else {
      this.setState({ loading: true })
      let id = this.props.id
      let code = this.props.code
      await this.props.setting.setPassword({ id, code, password, retry })
      this.setState({ loading: false })
    }
  }

  chValue(evt) {
    console.log('ch', evt.target)
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
    let text = { textAlign: 'center' }
    let { error, password, retry, valid, loading } = this.state
    let data = this.props.setting.toJS().check.member
    if (data.status === 'error') error = data.message
    if (error !== '') error = (<p className="text-res-error">{data.message}</p>)

    return (
      <Row>
        <Loading dialog loading={loading} />
        <h4 style={text}>Set Password</h4>
        <br />
        <Col md="12">
          <Form>
            <FormGroup>
              <Label>Password</Label>
              <Input
                type="password"
                name="password"
                placeholder="your password"
                invalid={valid.password}
                value={password}
                onChange={this.chValue} />
              <FormFeedback>'please fill your password'</FormFeedback>
            </FormGroup>

            <FormGroup>
              <Label>Retry-Password</Label>
              <Input
                type="password"
                name="retry"
                placeholder="your retry password"
                invalid={valid.retry}
                value={retry}
                onChange={this.chValue} />
              <FormFeedback>'please fill your retry password'</FormFeedback>
            </FormGroup>
          </Form>
        </Col>
        <Col md="12">
          {error}
          <OkBtn className="btn-fullsize" onClick={this.onConfirm} />
        </Col>
      </Row>
    )
  }
}

export default inject('setting')(observer(Content))
