import React, { Component } from 'react'

import Link from './link'

export default class Home extends Component {
  render() {
    return (
      <div className="footer-home">
        <ul>
          <li><Link to="../../../">Home</Link></li>
          <li><Link to="../../../">Courses</Link></li>
          <li><Link to="../../../">BLOG</Link></li>
          <li><Link to="../../../">Features</Link></li>
        </ul>
      </div>
    )
  }
}
