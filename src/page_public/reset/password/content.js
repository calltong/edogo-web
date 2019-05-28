import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import styled from 'styled-components'
import {
  Row, Col,
  Form, FormGroup, Label,
  Input, FormText, FormFeedback } from 'reactstrap'

import Completed from '../../../components/Completed'
import { OkBtn } from '../../../components/button'
import { Page, Title } from '../../../components/layout'
import { Loading } from '../../../components/loading'

class Content extends Component {
  constructor() {
    super()
    this.state = {
      loading: false,
      status: '',
      message: '',
      email: '',
      valid: {
        email: false,
      },
    }

    this.onConfirm = this.onConfirm.bind(this)
    this.chEmail = this.chEmail.bind(this)
  }

  async onConfirm() {
    try {
      let { email } = this.state
      if (email === '') {
        this.setState({ valid: { email: true } })
        return
      }

      this.setState({ loading: true })
      await this.props.reset.password({ email })
      this.setState({ loading: false, status: 'completed' })
    } catch(e) {
      this.setState({ loading: false, status: 'error', message: e.message })
    }
  }

  chEmail(evt) {
    this.setState({ email: evt.target.value, valid: { email: false } })
  }

  render() {
    let text = { textAlign: 'center' }
    let { loading, email, status, message, valid } = this.state
    if (status === 'completed') {
      return (
        <Page>
          <Completed title="Reset Password Completed" detail="Please confirm on your email." />
        </Page>
      )
    } else {
      let errText
      if (status === 'error') {
        errText = (<p className="text-res-error">{message}</p>)
      }
      return (
        <Page>
          <Loading dialog loading={loading} />
          <Title>Reset Password</Title>
          <Row>
            <Col md="12">
              <Form>
                <FormGroup>
                  <Label>Email</Label>
                  <Input
                    type="email"
                    name="email"
                    placeholder="your email"
                    invalid={valid.email}
                    value={email}
                    onChange={this.chEmail} />
                  <FormText>Example your@mail.com</FormText>
                  <FormFeedback>Please fill your email</FormFeedback>
                </FormGroup>
              </Form>
            </Col>
            <Col md="12">
              {errText}
              <OkBtn className="btn-fullsize" onClick={this.onConfirm} />
            </Col>
          </Row>
        </Page>
      )
    }
  }
}

export default inject('reset')(observer(Content))
