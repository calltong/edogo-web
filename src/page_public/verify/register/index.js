import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import { Row, Col } from 'reactstrap'

import { Loading } from '../../../components/loading'
import { MiniCol, Completed } from '../../../components/layout'
import SomeError from '../../../components/SomeError'

export class ConfirmRegister extends Component {
  constructor() {
    super()
    this.state = {
      loading: false,
      status: '',
      message: '',
    }

    this.onVerify = this.onVerify.bind(this)
  }

  async componentDidMount() {
    this.onVerify()
  }

  async onVerify() {
    try {
      let { id, code } = this.props.match.params
      this.setState({ loading: true, status: '', message: '' })

      await this.props.member.logout()
      await this.props.verify.confirmRegister({ id, code })
      this.setState({ loading: false, status: 'completed' })
    } catch (e) {
      this.setState({ loading: false, status: 'error', message: e.message })
    }
  }

  render() {
    let { loading, status, message } = this.state

    let page
    switch (status) {
      case 'completed':
        page = <Completed title="Register Completed" gotoText="Go to login page" gotoLink="../../../../login" />
        break
      case 'error':
        page = <SomeError title="Register Email Confirmation" message={message} onRetry={this.onVerify} />
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

export default inject('member', 'verify')(observer(ConfirmRegister))
