import React, { Component } from 'react';

export default class Radio extends Component {
  render() {
    return (
      <div className="radio">
        <label>
          <input type="radio" 
            value={this.props.value} 
            checked={this.props.checked}
            onClick={this.props.onClick}
          /> {this.props.title || ''}
        </label>
      </div>
    );
  }
}
