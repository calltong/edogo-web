import React, { Component } from 'react'

export default class CloseBtn extends Component {
  render() {
    return (
      <button type={this.props.type || 'button'}
        className={`btn ${this.props.className}`}
        disabled={this.props.disabled}
        style={this.props.style}
        onClick={this.props.onClick}>
        {this.props.children || 'Close'}
      </button>
    )
  }
}
