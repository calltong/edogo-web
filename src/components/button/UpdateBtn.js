import React, { Component } from 'react'

export default class UpdateBtn extends Component {
  render() {
    return (
      <button type={this.props.type || 'button'}
        className={`btn btn-update ${this.props.className}`}
        disabled={this.props.disabled}
        style={this.props.style}
        onClick={this.props.onClick}>
        <i className="fas fa-pen-square" /> {this.props.children || 'Update'}
      </button>
    )
  }
}
