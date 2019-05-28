import React, { Component } from 'react'
import { observer, inject } from 'mobx-react'
import { Container, Row, Col } from 'reactstrap'

import { helper } from '../../../utils/helper'
import { Loading } from '../../../components/loading'
import SomeError from '../../../components/SomeError'
import { SaveBtn } from '../../../components/button'

import ProfileView from '../ProfileView'
import Info from './info'
import SaveError from '../SaveError'

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
      this.setState({ status: '', loading: true })
      await this.props.member.getInfo()
      this.setState({ loading: false })
    } catch(e) {
      this.setState({ status: 'fail_load', message: e.message })
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
        this.setState({ status: '', loading: true })
        await this.props.member.save()
      }
    } catch(e) {
      this.setState({ status: 'fail_save', message: e.message })
    }

    this.setState({ loading: false })
  }

  render() {
    let { loading, status, message, valid } = this.state
    let css = { textAlign: 'right' }
    let content
    if (status === 'fail_load') {
      content = <SomeError message={message} onRetry={this.onLoad} />
    } else {
      let msg
      if (status === 'fail_save') msg = <SaveError message={message} />

      content = (
        <div>
          <Info valid={valid} />

          <br />
          <Row>
            <Col md="12">
              <div style={css}>
                <SaveBtn className="btn-m-size" onClick={this.onSave} />
                {msg}
              </div>
            </Col>
          </Row>
        </div>
      )
    }

    return (
      <ProfileView title="Profile">
        <Container>
          <Loading dialog loading={loading} />
          {content}
        </Container>
      </ProfileView>
    )
  }
}

export default inject('member')(observer(General))
