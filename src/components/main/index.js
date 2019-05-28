import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import styled from 'styled-components'

import { Loading } from '../loading'
import Header from './Header'
import Footer from './footer'
// import Sidebar from './Sidebar'

export class MainLayout extends Component {
  constructor(props) {
    super(props)
    this.state = {
      loading: false,
    }
  }

  async componentDidMount() {
    try {
      this.setState({ loading: true })
      await this.props.member.verifyToken()
    } catch(e) {
      
    }

    this.setState({ loading: false })
  }

  render() {
    let { loading } = this.state
    let content
    if (loading) content = <Loading dialog loading={loading} />
    else content = this.props.children
    return (
      <div className="wrapper">
        <Header />
        <AppBody>
          {content}
        </AppBody>
        <Footer />
      </div>
    )
  }
}

export default inject('member')(observer(MainLayout))

const AppBody = styled.div`
  padding: 0px 0px !important;
  min-height: 540px;
  @media (max-width: 768) {
    padding: 8px 65px !important;
  }

  @media (max-width: 425px) {
    padding: 8px 20px !important;
  }
`
