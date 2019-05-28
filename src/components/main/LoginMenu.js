import React, { Component } from 'react'

import { Nav, NavItem } from 'reactstrap'

import SigninDialog from '../../page_public/signin/dialog'
import SignupDialog from '../../page_public/signup/dialog'

export default class LoginMenu extends Component {
  constructor(props) {
    super(props)
    this.state = {
      signin: false,
      signup: false,
    }

    this.openSignin = this.openSignin.bind(this)
    this.closeSignin = this.closeSignin.bind(this)
    this.openSignup = this.openSignup.bind(this)
    this.closeSignup = this.closeSignup.bind(this)
  }

  openSignin() {
    this.setState({ signin: true, signup: false })
  }

  closeSignin() {
    this.setState({ signin: false })
  }

  openSignup() {
    this.setState({ signup: true, signin: false })
  }

  closeSignup() {
    this.setState({ signup: false })
  }

  render() {
    let { signin, signup } = this.state
    return (
      <Nav className="header-item ml-auto" navbar>
        <NavItem>
          <label className="btn header-login" onClick={this.openSignin}>Login</label>
        </NavItem>
        <NavItem>
          <label className="btn header-signup" onClick={this.openSignup}>Signup</label>
        </NavItem>
        <SigninDialog
          display={signin}
          onClose={this.closeSignin} />
        <SignupDialog
          display={signup}
          onClose={this.closeSignup} />
      </Nav>
    )
  }
}
