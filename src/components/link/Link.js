import React, { Component } from 'react'
import { Link as RLink } from 'react-router-dom'

export default class Link extends Component {
  render() {
    return (
      <RLink
        to={this.props.to}
        style={this.props.style}
        className={`btn link ${this.props.className || ''}`}>
        {this.props.children || 'Click'}
      </RLink>
    )
  }
}
