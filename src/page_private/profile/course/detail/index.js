import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'

import { Row, Col } from 'reactstrap'

import { SaveBtn, BackBtn } from '../../../../components/button'
import { Loading } from '../../../../components/loading'
import SomeError from '../../../../components/SomeError'
import { helper } from '../../../../utils/helper'
import { history } from '../../../../utils/history'

import ProfileView from '../../ProfileView'
import SaveError from '../../SaveError'
import Info from './info'

export class CourseDetail extends Component {
  constructor() {
    super()
    this.state = {
      status: '',
      message: '',
      title: 'Create',
      valid: {
        name: false,
        image: false,
        price: false,
        duration: false,
      },
    }

    this.onSave = this.onSave.bind(this)
    this.onBack = this.onBack.bind(this)
  }

  componentDidMount() {
    this.onLoad()
  }

  onLoad = async () => {
    try {
      let { id } = this.props.match.params
      if (id) {
        this.setState({ loading: true, status: '', title: 'Edit' })
        await this.props.course.getDoc(id)
        this.setState({ loading: false })
      } else {
        await this.props.course.reset()
      }
    } catch(e) {
      this.setState({ loading: false, status: 'fail_load', message: e.message })
    }
  }

  async onSave() {
    try {
      let list = ['name', 'image', 'price']
      let { valid } = this.state
      let doc = this.props.course.toJS().owner.data

      let res = await helper.checkValue({ item: doc.detail, valid, list })
      if (res.invalid) {
        this.setState({ valid: res.data })
      } else {
        this.setState({ status: '', loading: true })
        await this.props.course.save()
        this.setState({ loading: false })
        this.onBack()
      }

    } catch(e) {
      this.setState({ loading: false, status: 'fail_save', message: e.message })
    }
  }

  onBack() {
    history.push('../')
  }

  render() {
    let css = { textAlign: 'right' }
    let { loading, status, message, title, valid } = this.state
    let content
    if (status === 'fail_load') {
      content = <SomeError message={message} onRetry={this.onLoad} />
    } else {
      let msg
      if (status === 'fail_save') msg = <SaveError message={message} />

      content = (
        <div>
          <Info valid={valid} />
          <Row>
            <Col md="12">
              <div style={css}>
                <BackBtn className="btn-m-size" style={{marginRight: '4px'}} onClick={this.onBack} />
                <SaveBtn className="btn-m-size" onClick={this.onSave} />
                {msg}
              </div>
            </Col>
          </Row>
        </div>
      )
    }

    return (
      <ProfileView title="My Course">
        <Loading dialog loading={loading} />
        <Row>
          <Col md="12">
            <h5>{title} Course</h5>
          </Col>
        </Row>
        <hr />
        {content}
      </ProfileView>
    )
  }
}

export default inject('course')(observer(CourseDetail))
