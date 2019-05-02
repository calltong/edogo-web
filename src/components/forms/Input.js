import React, { Component } from 'react'

export default class Input extends Component {
  render() {
    return (
      <input
        id={this.props.id || ''}
        name={this.props.name || ''}
        type={this.props.type || 'text'}
        className={`form-control ${this.props.className || ''}`.trim()}
        style={this.props.style || {}}
        placeholder={this.props.placeholder || ''}
        value={this.props.value || ''}
        size={this.props.size || ''}
        onChange={this.props.onChange}
        onBlur={this.props.onBlur}
        onKeyPress={this.props.onKeyPress}
        readOnly={this.props.readOnly || false}
        disabled={this.props.disabled || false} />
    )
  }
}
