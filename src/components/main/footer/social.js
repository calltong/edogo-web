import React, { Component } from 'react'

import Link from './link'

export default class Social extends Component {
  render() {
    return (
      <div className="footer-social">
        <p className="title">Follow us on</p>
        <div className="icon">
          <i className="fab fa-facebook" />
          <i className="fab fa-twitter-square" />
          <i className="fab fa-instagram" />
          <i className="fab fa-youtube" />
        </div>
      </div>
    )
  }
}
