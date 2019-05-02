import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
// import { Link } from 'react-router-dom'
import {
  Row, Col,
  Form, FormGroup, Label,
  Input, FormText, FormFeedback } from 'reactstrap';

import { OkBtn } from '../../../components/button'
import { Loading } from '../../../components/loading'

class Content extends Component {
  constructor() {
    super()
    this.state = {
      loading: false,
      error: '',
      email: '',
    }

    this.onConfirm = this.onConfirm.bind(this)
    this.chEmail = this.chEmail.bind(this)
  }

  async onConfirm() {
    let { email } = this.state
    if (email === '') {
      this.setState({ error: 'please fill your email' })
    } else {
      this.setState({ loading: true })
      await this.props.setting.resetPassword({ email })
      this.setState({ loading: false })
    }
  }

  chEmail(evt) {
    this.setState({ error: '', email: evt.target.value })
  }

  render() {
    let text = { textAlign: 'center' }
    let { error, email, loading } = this.state
    let data = this.props.setting.toJS().reset.password
    if (data.status === 'error') error = data.message
    if (error !== '') error = (<p className="text-res-error">{data.message}</p>)

    return (
      <Row>
        <Loading dialog loading={loading} />
        <h4 style={text}>Reset Password</h4>
        <br />
        <Col md="12">
          <Form>
            <FormGroup>
              <Label>Email</Label>
              <Input
                type="email"
                name="email"
                placeholder="your email"
                invalid={error !== ''}
                value={email}
                onChange={this.chEmail} />
              <FormText>Example your@mail.com</FormText>
              <FormFeedback>{error}</FormFeedback>
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
