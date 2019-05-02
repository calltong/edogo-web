import React from 'react'
import { NavItem, NavLink, Collapse } from 'reactstrap';
import Item from './Item'

export default class ItemList extends React.Component {
  selected(name) {
    if (this.props.onSelected) this.props.onSelected(name)
  }

  renderItem(item, index) {
    return <Item submenu key={index} item={item} />
  }

  render() {
    let { item } = this.props
    let index = 0
    let list = []
    for (let it of item.children) {
      list.push(this.renderItem(it, index++))
    }

    let label = item.label
    return (
      <NavItem>
        <NavLink
          className="side-bar-subtitle" 
          onClick={this.selected.bind(this, label)}>
          <i className={item.icon} style={{marginRight: '5px'}} />{label}
        </NavLink>
        <Collapse isOpen={this.props.selected === label}>
          {list}
        </Collapse>
      </NavItem>
    )
  }
}
