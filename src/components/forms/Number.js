import React, {Component} from 'react';

export default class Number extends Component {
  handleKeyPress(event) {
    if (event.charCode >= 48 && event.charCode <= 57) {
    } else {
      event.preventDefault();
    }
  }

  render() {
    return (
      <input
        type={this.props.type || 'text'}
        className={`form-control ${this.props.className || ''}`}
        style={this.props.style}
        placeholder={this.props.placeholder || ''}
        value={this.props.value}
        disabled={this.props.disabled || false}
        readOnly={this.props.readOnly || false}
        maxLength={this.props.maxLength || ''}
        onChange={this.props.onChange}
        onBlur={this.props.onBlur}
        onKeyPress={this.handleKeyPress.bind(this)}
      />
    );
  }
}
