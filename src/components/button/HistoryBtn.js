import React, { Component } from 'react'

export default class HistoryBtn extends Component {
  render() {
    return (
      <button type={this.props.type || 'button'}
        className={`btn btn-info ${this.props.className}`}
        disabled={this.props.disabled}
        style={this.props.style}
        onClick={this.props.onClick}>
        <i className="fas fa-history" /> {this.props.children || 'History'}
      </button>
    )
  }
}
