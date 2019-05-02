import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import { Container } from 'reactstrap'

import { Loading } from '../../../components/loading'
import Content from './content'

export class Booking extends Component {
  constructor() {
    super()
    this.state = {
      loading: false,
      error: '',
    }
  }

  async componentDidMount() {
    this.onLoad()
  }

  async onLoad() {
    this.setState({ loading: true })
    let res = await this.props.course.getList()
    let error = ''
    if (res.err) error = res.err

    this.setState({ loading: false, error })
  }

  render() {
    let owner = this.props.course.toJS().owner
    let list = owner.list.map((item, index) => {
      return <Content key={index} item={item} />
    })
    return (
      <Container>
        <Loading dialog loading={this.state.loading} />
        {list}
      </Container>
    )
  }
}

export default inject('course')(observer(Booking))
