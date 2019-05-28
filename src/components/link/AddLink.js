import React, { Component } from 'react'
import { Link as RLink } from 'react-router-dom'

export default class AddLink extends Component {
  render() {
    return (
      <RLink
        to={this.props.to}
        style={this.props.style}
        className={`btn link ${this.props.className}`}>
        <i className="fas fa-plus" /> {this.props.children}
      </RLink>
    )
  }
}
