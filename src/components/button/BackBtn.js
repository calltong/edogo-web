import React, { Component } from 'react'

export default class BackBtn extends Component {
  render() {
    return (
      <button type={this.props.type || 'button'}
        className={`btn ${this.props.className}`}
        disabled={this.props.disabled}
        style={this.props.style}
        onClick={this.props.onClick}>
        <i className="fas fa-level-up-alt" /> {this.props.children || 'Back'}
      </button>
    )
  }
}
