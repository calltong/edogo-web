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

    this.onSignin = this.toggleSignin.bind(this)
    this.onSignup = this.toggleSignup.bind(this)
  }

  toggleSignin() {
    let { signin } = this.state
    this.setState({ signin: !signin })
  }

  toggleSignup() {
    let { signup } = this.state
    this.setState({ signup: !signup })
  }

  render() {
    let { signin, signup } = this.state
    return (
      <Nav className="header-item ml-auto" navbar>
        <NavItem>
          <label className="btn header-btn" onClick={this.onSignin}>Login</label>
        </NavItem>
        <NavItem>
          <label className="btn header-signup" onClick={this.onSignup}>Signup</label>
        </NavItem>
        <SigninDialog
          display={signin}
          onClose={this.onSignin} />
        <SignupDialog
          display={signup}
          onClose={this.onSignup} />
      </Nav>
    )
  }
}
