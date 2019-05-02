import React, { Component } from 'react'

export default class TextArea extends Component {
  render() {
    return (
        <textarea ref={this.props.name || 'enInputArea'}
          id={this.props.id}
          type={this.props.type || 'text'}
          rows={this.props.rows || 2}
          className={`form-control ${this.props.className || ''}`}
          style={this.props.style}
          placeholder={this.props.placeholder || ''}
          value={this.props.value}
          onChange={this.props.onChange}
          onBlur={this.props.onBlur}
          onKeyPress={this.props.onKeyPress}
          readOnly={this.props.readOnly || false}
          disabled={this.props.disabled || false}
        />
    );
  }
}
