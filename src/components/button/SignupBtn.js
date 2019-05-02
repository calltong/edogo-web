import React, { Component } from 'react'

export default class SignupBtn extends Component {
  render() {
    return (
      <button type={this.props.type || 'button'}
        name={this.props.name}
        className={`btn btn-primary ${this.props.className}`}
        disabled={this.props.disabled}
        style={this.props.style}
        onClick={this.props.onClick}>
        {this.props.children || 'Sign up'}
      </button>
    )
  }
}
