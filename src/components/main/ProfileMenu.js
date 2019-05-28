import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import { Link } from 'react-router-dom'
import {
  Nav, UncontrolledDropdown,
  DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap'

import { config } from '../../config'
import { helper } from '../../utils/helper'
import ProfileImage from '../image/ProfileImage'

class ProfileMenu extends Component {
  constructor(props) {
    super(props)

    this.onLogout = this.onLogout.bind(this)
  }

  async onLogout() {
    await this.props.member.logout()
  }

  render() {
    let profile = this.props.member.toJS().user

    let pimg = <i className="far fa-user-circle header-profile-icon" />
    if (helper.isValue(profile.image)) {
      pimg = <ProfileImage className="header-profile-img" src={profile.image} />
    }
    return (
      <Nav className="header-item ml-auto" navbar>
        <UncontrolledDropdown nav inNavbar>
          <DropdownToggle className="header-profile" nav>
            {pimg}
          </DropdownToggle>
          <DropdownMenu right>
            <DropdownItem>
              <Link className="header-profile-menu-btn" to="../../pv/profile/booking">My Booking</Link>
            </DropdownItem>
            <DropdownItem>
              <Link className="header-profile-menu-btn" to="../../pv/messenger">Messenger</Link>
            </DropdownItem>
            <DropdownItem divider />
            <DropdownItem>
              <Link className="header-profile-menu-btn" to="../../pv/profile/general">My Profile</Link>
            </DropdownItem>
            <DropdownItem divider />
            <DropdownItem>
              <a onClick={this.onLogout}>Logout</a>
            </DropdownItem>
          </DropdownMenu>
        </UncontrolledDropdown>
      </Nav>
    )
  }
}

export default inject('member')(observer(ProfileMenu))
