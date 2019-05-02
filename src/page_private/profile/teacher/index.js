import React, { Component } from 'react'
import { observer, inject } from 'mobx-react'
import { Container } from 'reactstrap'

import { Loading } from '../../../components/loading'
import SomeError from '../../../components/SomeError'
import { SaveBtn } from '../../../components/button'

import TeacherInfo from './info'

export class Teacher extends Component {
  constructor() {
    super()
    this.state = {
      loading: false,
      error: '',
    }

    this.onSave = this.onSave.bind(this)
    this.onLoad = this.onLoad.bind(this)
  }

  async componentDidMount() {
    this.onLoad()
  }

  async onLoad() {
    this.setState({ loading: true })
    let res = await this.props.member.getMemberInfo()
    let error = ''
    if (res.err) error = res.err

    this.setState({ loading: false, error })
  }

  async onSave() {
    this.setState({ loading: true })
    let invalid = await this.props.member.validateTeacher()
    if (invalid === false) await this.props.member.save()
    this.setState({ loading: false })
  }

  render() {
    let { loading, error } = this.state
    let content
    if (error === '') {
      content = (
        <div>
          <TeacherInfo />
          <br />
          <div style={{ textAlign: 'right' }}>
            <SaveBtn className="btn-m-size" onClick={this.onSave} />
          </div>
        </div>
      )
    } else {
      content = <SomeError onRetry={this.onLoad} />
    }
    return (
      <Container>
        <Loading dialog loading={loading} />
        {content}
      </Container>
    )
  }
}

export default inject('member')(observer(Teacher))
