import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import { Container } from 'reactstrap'

import ProfileView from '../ProfileView'
import { Loading } from '../../../components/loading'
import Implementing from '../../../components/Implementing'

import Content from './content'

export class Booking extends Component {
  constructor() {
    super()
    this.state = {
      loading: false,
      status: '',
      message: '',
    }
  }

  async componentDidMount() {
    this.onLoad()
  }

  async onLoad() {

  }

  render() {
    let { loading, valid, status, message } = this.state

    return (
      <ProfileView title="My Booking">
        <Container>
          <Loading dialog loading={loading} />
          <Implementing />
        </Container>
      </ProfileView>
    )
  }
}

export default inject('course')(observer(Booking))
