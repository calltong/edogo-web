import React, { Component } from 'react'

export default class BaseBtn extends Component {
  render() {
    let { noIcon, noText, invalid } = this.props
    let icon
    let text
    let valid = ''
    if (noIcon === undefined) icon = <i className={this.props.icon} />
    if (noText === undefined) text = this.props.children || this.props.text
    if (invalid) valid = 'border-invalid'

    let content
    if (icon && text) content = <div>{icon} {text}</div>
    else if (icon) content = <div>{icon}</div>
    else if (text) content = <div>{text}</div>

    return (
      <button type={this.props.type || 'button'}
        className={`btn ${this.props.className} ${valid}`}
        disabled={this.props.disabled}
        style={this.props.style}
        onClick={this.props.onClick}>
        {content}
      </button>
    )
  }
}
