import React, { Component } from 'react'
//import { Container, Row, Col } from 'reactstrap'

import Header from './Header'
import Footer from './footer'
// import Sidebar from './Sidebar'

export default class MainLayout extends Component {
  render() {
    return (
      <div className="wrapper">
        <Header />
        <div className="app-body">
          {this.props.children}
        </div>
        <Footer />
      </div>
    )
  }
}
