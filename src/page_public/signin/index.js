import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import { Row, Col } from 'reactstrap'

import Content from './content'
import { Loading } from '../../components/loading'

export class Signin extends Component {
  constructor() {
    super()
    this.state = {
      loading: false,
      status: 'success',
      message: '',
    }

    this.onGmail = this.onGmail.bind(this)
    this.onEmail = this.onEmail.bind(this)
  }

  async onEmail(params) {
    try {
      console.log('test email')
      this.setState({ loading: true })
      await this.props.member.loginByEmail(params)
    } catch(e) {
      this.setState({ status: 'error', message: e.message })
    }

    this.setState({ loading: false})
  }

  async onGmail(params) {
    try {
      this.setState({ loading: true })

      await this.props.member.loginByGmail(params)
    } catch(e) {
      this.setState({ status: 'error', message: e.message })
    }

    this.setState({ loading: false})
  }

  render() {
    let { loading, status, message } = this.state

    return (
      <div>
        <Loading dialog loading={loading} />
        <Row>
          <Col md="12">
            <Content
              onEmail={this.onEmail}
              onGmail={this.onGmail}
              error={status === 'error' ? message : undefined} />
          </Col>
        </Row>
      </div>
    )
  }
}

export default inject('member')(observer(Signin))
