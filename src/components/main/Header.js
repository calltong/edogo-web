import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import { Link } from 'react-router-dom'
import {
  Collapse, Navbar, NavbarToggler,
  Nav, NavItem } from 'reactstrap'

import { config } from '../../config'
import FindBox from '../forms/FindBox'
import ProfileMenu from './ProfileMenu'
import LoginMenu from './LoginMenu'

export class Header extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isOpen: false,
      find: '',
    }

    this.fnToggle = this.toggle.bind(this)
    this.onFind = this.onFind.bind(this)
  }

  async componentDidMount() {
    await this.props.member.verifyToken()
  }

  toggle() {
    this.setState({ isOpen: !this.state.isOpen })
  }

  onFind(evt) {
    this.setState({ find: evt.target.value })
  }

  render() {
    let { find } = this.state
    let menu
    let login = this.props.member.isLogin()
    console.log('login:', login)
    if (login === false) menu = (<LoginMenu />)
    else menu = (<ProfileMenu />)

    return (
      <div>
        <Navbar className="header" expand="md">
          <Link className="header-name navbar-brand" to="/">{config.web.name}</Link>
          <NavbarToggler className="header-menu" onClick={this.fnToggle}>
            <i className="fas fa-bars" />
          </NavbarToggler>
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="header-item mr-auto" navbar>
              <NavItem>
                <Link className="btn header-btn" to="/courses">Courses</Link>
              </NavItem>

              <NavItem>
                <Link className="btn header-btn" to="/blog">BLOG</Link>
              </NavItem>

              <NavItem>
                <Link className="btn header-btn" to="/features">Features</Link>
              </NavItem>
              <NavItem>
                <FindBox
                  className="header-find"
                  value={find}
                  onChange={this.onFind}
                  placeholder="Search your courses" />
              </NavItem>
            </Nav>
            {menu}
          </Collapse>
        </Navbar>
      </div>
    );
  }
}

export default inject('member')(observer(Header))
