import React, { Component } from 'react';

export default class CheckBox extends Component {
  render() {
    return (
      <div className="checkbox checkbox-danger" style={{ paddingTop: 0 }}>
        <input type="checkbox" id={this.props.id || ''}
          checked={this.props.checked} onChange={this.props.onClick} />
        <label htmlFor={this.props.id || ''}>
          {this.props.title || 'undefined'}
        </label>
      </div>
    );
  }
}
