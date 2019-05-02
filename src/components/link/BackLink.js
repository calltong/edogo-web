import React, { Component } from 'react'
import { Link } from 'react-router-dom'

export default class BackLink extends Component {
  render() {
    return (
      <Link
        to={this.props.to}
        style={this.props.style}
        className={`btn link ${this.props.className}`}>
        <i className="fas fa-level-up-alt" /> {this.props.children || 'Back'}
      </Link>
    )
  }
}
