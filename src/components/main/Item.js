import React from 'react'
import { Link } from 'react-router-dom'

export default class Item extends React.Component {
  render() {
    let { item, submenu } = this.props
    let css = 'side-bar-item nav-link'
    if (submenu) css = 'side-bar-subitem nav-link'
    return (
      <Link className={css} to={item.url}>
        <i className={item.icon} style={{marginRight: '5px'}} />{item.label}
      </Link>
    )
  }
}
