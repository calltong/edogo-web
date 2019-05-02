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
      error: '',
    }
  }

  componentDidMount() {
    this.onLoad()
  }

  async onLoad() {
    this.setState({ loading: true })

    let { id } = this.props.match.params
    let res = await this.props.profile.getDoc({ id })
    let error
    if (res.err !== undefined) error = res.err

    this.setState({ loading: false, error })
  }
  render() {
    let { loading, error } = this.state
    let content
    if (error) {
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
