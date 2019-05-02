import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import { Row, Col } from 'reactstrap'

import Content from './content'
import Success from './success'
import { Loading } from '../../components/loading'
import { history } from '../../utils/history'

export class Signup extends Component {
  constructor() {
    super()
    this.state = {
      loading: false,
      status: '',
      message: '',
    }

    this.onEmail = this.onEmail.bind(this)
    this.onGmail = this.onGmail.bind(this)
  }

  async componentDidMount() {
    this.props.member.reset()
  }

  async onEmail(params) {
    try {
      this.setState({ loading: true })
      await this.props.member.registerByEmail(params)
      this.setState({ loading: false})
      history.push('../../pv/member/profile')
    } catch(e) {
      this.setState({ status: 'error', message: e.message })
    }
  }

  async onGmail(params) {
    try {
      this.setState({ loading: true })
      await this.props.member.registerByGmail(params)
      this.setState({ loading: false})
      history.push('../../pv/member/profile')
    } catch(e) {
      this.setState({ status: 'error', message: e.message })
    }
  }

  render() {
    let { loading, status, message } = this.state
    let page
    if (status === 'success') {
      page = (<Success onClose={this.props.onClose} />)
    } else {
      page = (
        <Content
          onEmail={this.onEmail}
          onGmail={this.onGmail}
          error={status === 'error' ? message : undefined} />
      )
    }

    return (
      <div>
        <Loading dialog loading={loading} />
        <Row>
          <Col md="12" sm="12" xs="12">
            {page}
          </Col>
        </Row>
      </div>
    )
  }
}

export default inject('member')(observer(Signup))
