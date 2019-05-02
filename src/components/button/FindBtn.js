import React, { Component } from 'react'

export default class FindBtn extends Component {
  render() {
    return (
      <button type={this.props.type || 'button'}
        className={`btn btn-find ${this.props.className}`}
        disabled={this.props.disabled}
        style={this.props.style}
        onClick={this.props.onClick}>
        <i className="fas fa-search" /> {this.props.children || 'Find'}
      </button>
    )
  }
}
