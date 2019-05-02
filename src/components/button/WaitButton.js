import React, { Component } from 'react'

export default class WaitButton extends Component {
  render() {
    return (
      <button type={this.props.type || 'button'}
        className={`btn btn-info ${this.props.className}`}
        disabled={this.props.disabled}
        style={this.props.style}
        onClick={this.props.onClick}>
        <i className="fas fa-calendar-alt" /> {this.props.children || 'Waiting'}
      </button>
    )
  }
}
