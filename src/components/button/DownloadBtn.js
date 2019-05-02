import React, { Component } from 'react'

export default class DownloadBtn extends Component {
  render() {
    return (
      <button type={this.props.type || 'button'}
        className={`btn btn-download ${this.props.className}`}
        disabled={this.props.disabled}
        style={this.props.style}
        onClick={this.props.onClick}>
        <i className="fas fa-download" /> {this.props.children || 'Download'}
      </button>
    )
  }
}
