import React, { Component } from 'react'
import BaseBtn from './BaseBtn'

export default class EditBtn extends Component {
  render() {
    return (
      <BaseBtn
        icon="fas fa-pencil-alt"
        text="Edit"
        noIcon={this.props.noIcon}
        noText={this.props.noText}
        className={this.props.className}
        disabled={this.props.disabled}
        style={this.props.style}
        onClick={this.props.onClick}>
        {this.props.children}
      </BaseBtn>
    )
  }
}
