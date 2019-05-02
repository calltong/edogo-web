import React, { Component } from 'react'

export default class FacebookBtn extends Component {
  render() {
    return (
      <button type={this.props.type || 'button'}
        className={`btn btn-facebook ${this.props.className}`}
        disabled={this.props.disabled}
        style={this.props.style}
        onClick={this.props.onClick}>
        <i className="fab fa-facebook-f" /> {this.props.children || 'Facebook'}
      </button>
    )
  }
}
