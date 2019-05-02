import React, { Component } from 'react'

import Link from './link'

export default class Menu extends Component {
  render() {
    return (
      <div className="footer-home">
        <ul>
          <li><Link to="../../../">About us</Link></li>
          <li><Link to="../../../">Support</Link></li>
          <li><Link to="../../../">Policy</Link></li>
        </ul>
      </div>
    )
  }
}
