import React, { Component } from 'react'

import Link from './link'

export default class Main extends Component {
  render() {
    return (
      <div className="footer-main">
        <p className="title">
          <Link to="../../../">Edogo</Link>
        </p>
        <p className="description">
          Edogo is a Knowledge Center platforms for everyone can lean or teach, it's easy to use and fun.
        </p>
      </div>
    )
  }
}
