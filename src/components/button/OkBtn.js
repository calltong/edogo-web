import React, { Component } from 'react'

export default class OkBtn extends Component {
  render() {
    return (
      <button type={this.props.type || 'button'}
        className={`btn btn-primary ${this.props.className}`}
        disabled={this.props.disabled}
        style={this.props.style}
        onClick={this.props.onClick}>
        <i className="far fa-check-circle" /> {this.props.children || 'OK'}
      </button>
    )
  }
}
