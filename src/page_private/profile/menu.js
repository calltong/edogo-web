import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Nav, Card, CardHeader, CardBody } from 'reactstrap'
const menus = [
  {
    label: 'Profile',
    url: `/pv/member/profile`,
    icon: 'far fa-user',
  },
  {
    label: 'My Booking',
    url: `/pv/member/booking`,
    icon: 'far fa-address-book',
  },
  {
    label: 'Be Teacher',
    url: `/pv/member/teacher`,
    icon: 'fas fa-user-graduate',
  },
  {
    label: 'My Course',
    url: `/pv/member/course`,
    icon: 'fas fa-book',
  },
  {
    label: 'Payment',
    url: `/pv/member/payment`,
    icon: 'far fa-money-bill-alt',
  },
  {
    label: 'Invitation',
    url: `/pv/member/invitation`,
    icon: 'fas fa-link',
  },
  {
    label: 'Password',
    url: `/pv/member/password`,
    icon: 'fas fa-key',
  }
]

export default class Menu extends Component {
  render() {
    let title = this.props.title
    let list = menus.map((item, index) => {
      let css = item.label === title ? 'profile-menu-item-active' : 'profile-menu-item'
      return (
        <Link key={index} className={`${css} nav-link`} to={item.url}>
          <i className={item.icon} /> {item.label}
        </Link>
      )
    })
    return (
      <Card>
        <CardHeader>Menus</CardHeader>
        <CardBody>
          <Nav vertical>
            {list}
          </Nav>
        </CardBody>
      </Card>
    )
  }
}
