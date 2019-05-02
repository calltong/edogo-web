import React, { Component } from 'react'
import { Link } from 'react-router-dom'

export default class DetailLink extends Component {
  render() {
    return (
      <Link
        to={this.props.to}
        style={this.props.style}
        className={`btn btn-edit ${this.props.className}`}>
        <i className="far fa-edit" /> {this.props.children || 'Detail'}
      </Link>
    )
  }
}
