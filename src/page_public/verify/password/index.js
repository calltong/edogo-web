import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import { Row, Col } from 'reactstrap'

import { Loading } from '../../../components/loading'
import { Completed, MiniCol } from '../../../components/layout'
import SomeError from '../../../components/SomeError'
import Content from './Content'

export class ConfirmPassword extends Component {
  constructor() {
    super()
    this.state = {
      loading: false,
    }

    this.onVerify = this.onVerify.bind(this)
    this.onSave = this.onSave.bind(this)
  }

  async componentDidMount() {
    this.onVerify()
  }

  async onVerify() {
    try {
      let { id, code } = this.props.match.params
      this.setState({ loading: true, status: '', message: '' })

      await this.props.member.logout()
      await this.props.verify.confirmPassword({ id, code })
      this.setState({ loading: false, status: 'verify' })
    } catch (e) {
      this.setState({ loading: false, status: 'error', message: e.message })
    }
  }

  async onSave({ email, password }) {
    try {
      let { code } = this.props.match.params
      this.setState({ loading: true, message: '' })

      await this.props.member.updatePassword({ code, email, password })
      this.setState({ loading: false, status: 'completed' })
    } catch(e) {
      this.setState({ loading: false })
      throw e
    }
  }

  render() {
    let { loading, status, message } = this.state

    let page
    switch (status) {
      case 'verify':
        page = <Content onSave={this.onSave} />
        break
      case 'completed':
        page = <Completed title="Update Password Completed" gotoText="Go to home page" gotoLink="../../../../" />
        break
      case 'error':
        page = <SomeError title="Reset Password Confirmation" message={message} onRetry={this.onVerify} />
        break
      default:
        page = <div />
    }

    return (
      <div>
        <Loading dialog loading={loading} />
        <Row>
          <MiniCol>
            {page}
          </MiniCol>
        </Row>
      </div>
    )
  }
}

export default inject('member', 'verify')(observer(ConfirmPassword))
