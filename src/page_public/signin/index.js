import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import { Row, Col } from 'reactstrap'

import Content from './content'
import { Loading } from '../../components/loading'
import { history } from '../../utils/history'

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

    this.onCompleted = this.onCompleted.bind(this)
    this.onClose = this.onClose.bind(this)
    this.onResetPassword = this.onResetPassword.bind(this)
  }

  async onEmail(params) {
    try {
      this.setState({ loading: true })
      await this.props.member.loginByEmail(params)
      this.setState({ loading: false})
      this.onClose()
      this.onCompleted()
    } catch(e) {
      this.setState({ status: 'error', loading: false, message: e.message })
    }
  }

  async onGmail(params) {
    try {
      this.setState({ loading: true })
      await this.props.member.loginByGmail(params)
      this.setState({ loading: false})
      this.onClose()
      this.onCompleted()
    } catch(e) {
      this.setState({ status: 'error', loading: false, message: e.message })
    }
  }

  async onCompleted() {
    try {
      let { onCompleted } = this.props
      if (onCompleted) await onCompleted()

    } catch(e) {
      this.setState({ status: 'error', message: e.message })
    }
  }

  async onClose() {
    try {
      let { onClose } = this.props
      if (onClose) await onClose()

    } catch(e) {
      this.setState({ status: 'error', message: e.message })
    }
  }

  async onResetPassword() {
    await this.onClose()
    history.push('../../../../reset/password')
  }

  render() {
    let { loading, status, message } = this.state

    return (
      <div>
        <Loading dialog loading={loading} />
        <Content
          onEmail={this.onEmail}
          onGmail={this.onGmail}
          onClose={this.onClose}
          onResetPassword={this.onResetPassword}
          error={status === 'error' ? message : undefined} />
      </div>
    )
  }
}

export default inject('member')(observer(Signin))
