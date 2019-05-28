import React, { Component } from 'react'
import { observer, inject } from 'mobx-react'
import { Container } from 'reactstrap'

import ProfileView from '../ProfileView'
import Detail from './detail'
import Education from './education'
import Experience from './experience'
import SaveError from '../SaveError'

import { helper } from '../../../utils/helper'
import { Loading } from '../../../components/loading'
import SomeError from '../../../components/SomeError'
import { SaveBtn } from '../../../components/button'

export class Teacher extends Component {
  constructor() {
    super()
    this.state = {
      loading: false,
      status: '',
      message: '',
      valid: {
        rate: false,
        about: false,
        languages: false,
        tutor: false,
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
    } catch(e) {
      this.setState({ status: 'fail_load', message: e.message })
    }

    this.setState({ loading: false })
  }

  async onSave() {
    try {
      let list = ['rate', 'about']
      let { valid } = this.state
      let doc = this.props.member.toJS().info
      let res = await helper.checkValue({ item: doc.teacher, valid, list })
      valid = res.data
      valid.languages = doc.teacher.lang_list.length === 0
      valid.tutor = doc.teacher.tutor_list.length === 0
      console.log('valid:', valid)
      if (res.invalid || valid.languages || valid.tutor) {
        this.setState({ valid })
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
    let { loading, valid, status, message } = this.state
    let content
    if (status === 'fail_load') {
      content = <SomeError message={message} onRetry={this.onLoad} />
    } else {
      let msg
      if (status === 'fail_save') msg = <SaveError message={message} />
      content = (
        <div>
          <Container>
            <Detail valid={valid} />
            <br />
            <Education />
            <br />
            <Experience />
          </Container>
          <br />
          <div style={{ textAlign: 'right' }}>
            <SaveBtn className="btn-m-size" onClick={this.onSave} />
            {msg}
          </div>
        </div>
      )
    }
    return (
      <ProfileView title="Be Teacher">
        <Container>
          <Loading dialog loading={loading} />
          {content}
        </Container>
      </ProfileView>
    )
  }
}

export default inject('member')(observer(Teacher))
