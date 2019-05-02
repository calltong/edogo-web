import React, { Component } from 'react'
import { observer, inject } from 'mobx-react'
import { Container, Row, Col } from 'reactstrap'

import { helper } from '../../../utils/helper'
import { Loading } from '../../../components/loading'
import SomeError from '../../../components/SomeError'
import { SaveBtn } from '../../../components/button'

import Info from './info'

export class General extends Component {
  constructor() {
    super()
    this.state = {
      loading: false,
      status: '',
      message: '',
      valid: {
        name: false,
        nickname: false,
        email: false,
        image: false,
      },
    }

    this.onSave = this.onSave.bind(this)
    this.onLoad = this.onLoad.bind(this)
  }

  async componentDidMount() {
    this.onLoad()
  }

  async onLoad() {
    try {
      this.setState({ loading: true })
      await this.props.member.getInfo()
      this.setState({ loading: false })
    } catch(e) {
      this.setState({ status: 'error', message: e.message })
    }
  }

  async onSave(evt) {
    try {
      let list = ['name', 'nickname', 'email']
      let { valid } = this.state
      let doc = this.props.member.toJS().info
      let res = await helper.checkValue({ item: doc.profile, valid, list })
      if (res.invalid) {
        this.setState({ valid: res.data })
      } else {
        this.setState({ loading: true })
        await this.props.member.save()
      }
    } catch(e) {
      console.log('catch:', e.message)
      this.setState({ status: 'error', message: e.message })
    }

    this.setState({ loading: false })
  }

  render() {
    let { loading, status, message, valid } = this.state
    let content
    if (status === '') {
      console.log('render:', valid)
      content = (
        <div>
          <Info valid={valid} />

          <br />
          <Row>
            <Col md="12">
              <div style={{ textAlign: 'right' }}>
                <SaveBtn className="btn-m-size" onClick={this.onSave} />
              </div>
            </Col>
          </Row>
        </div>
      )
    } else {
      content = <SomeError message={message} onRetry={this.onLoad} />
    }

    return (
      <Container>
        <Loading dialog loading={loading} />
        {content}
      </Container>
    )
  }
}

export default inject('member')(observer(General))
