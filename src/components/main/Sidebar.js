import React from 'react'
import { inject, observer } from 'mobx-react'
import { Nav } from 'reactstrap';

import Item from './Item'
import ItemList from './ItemList'

let menus = [
  {
    label: 'Dashboard',
    icon: 'fas fa-tachometer-alt',
    url: '/dashboard',
  },
  {
    label: 'Chat',
    icon: 'far fa-comments',
    children: [
      {
        label: 'Lists',
        icon: 'fas fa-list-ol',
        url: '/chat/list',
      },
    ],
  },
  {
    label: 'Products',
    icon: 'fab fa-product-hunt',
    children: [
      {
        label: 'Create',
        icon: 'far fa-plus-square',
        url: '/product/create',
      },
      {
        label: 'Lists',
        icon: 'fas fa-list-ol',
        url: '/product/list',
      },
    ],
  },
  {
    label: 'Setting',
    icon: 'fas fa-cogs',
    children: [
      {
        label: 'Profile',
        icon: 'far fa-calendar-alt',
        url: '/setting/profile',
      },
    ],
  },
]

class Sidebar extends React.Component {
  constructor() {
    super()
    this.state = {
      menu: '',
    }
  }

  selected(name) {
    if (this.state.menu === name) name = ''
    this.setState({ menu: name })
  }

  logout() {
    this.props.member.reset()
  }

  renderItem(item, index) {
    if (item.children) {
      return (
        <ItemList
          key={index}
          onSelected={this.selected.bind(this)}
          selected={this.state.menu}
          item={item} />
      )
    }
    else {
      return <Item key={index} item={item} />
    }
  }

  render() {
    //let { menu } = this.state
    //let { member } = this.props
    let list = []
    let index = 0
    for (let item of menus) {
      list.push(this.renderItem(item, index++))
    }
    return (
      <div className="side-bar">
        <Nav vertical>
          {list}
        </Nav>
      </div>
    )
  }
}

export default inject('member')(observer(Sidebar))
