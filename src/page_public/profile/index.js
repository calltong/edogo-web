import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'

import { Loading } from '../../components/loading'
import MemberNotFound from '../../components/MemberNotFound'

import Title from './title'
import Detail from './detail'
import MyClass from './class'
import Content from './content'

export class Profile extends Component {
  constructor() {
    super()
    this.state = {
      loading: false,
      status: '',
      message: '',
    }
  }

  componentDidMount() {
    this.onLoad()
  }

  async onLoad() {
    try {
      this.setState({ status: '', loading: true })

      let { id } = this.props.match.params
      await this.props.profile.getDoc({ id })
      this.setState({ loading: false })
    } catch(e) {
      this.setState({ loading: false, status: 'fail_load', message: e.message })
    }
  }

  render() {
    let { loading, status, message } = this.state
    let content
    if (status === 'fail_load') {
      content = <MemberNotFound />
    } else {
      content = (
        <div>
          <Title />
          <br />
          <Detail />
          <br />
          <MyClass />
          <br />
          <Content />
        </div>
      )
    }
    return (
      <div>
        <Loading dialog loading={loading} />
        {content}
      </div>
    )
  }
}

export default inject('profile')(observer(Profile))
