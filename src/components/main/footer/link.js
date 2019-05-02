import React, { Component } from 'react'
import { Link as ALink } from 'react-router-dom'


export default class Link extends Component {
  render() {
    return (
      <ALink className="footer-link" to={this.props.to || '../../'}>
        {this.props.children}
      </ALink>
    )
  }
}
