import React, { Component } from 'react'

export default class Btn extends Component {
  render() {
    let active = this.props.active || false
    return (
      <button type={this.props.type || 'button'}
        name={this.props.name}
        className={active ? 'btn btn-menu-active' : 'btn btn-menu'}
        disabled={this.props.disabled}
        style={this.props.style}
        onClick={this.props.onClick}>
        {this.props.children}
      </button>
    )
  }
}


// export { default as WhiteboardBtn } from './whiteboard'
