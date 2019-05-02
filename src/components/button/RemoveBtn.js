import React, { Component } from 'react'
import BaseBtn from './BaseBtn'

export default class RemoveBtn extends Component {
  render() {
    return (
      <BaseBtn
        icon="fas fa-trash-alt"
        text="Delete"
        noIcon={this.props.noIcon}
        noText={this.props.noText}
        className={`btn-danger ${this.props.className}`}
        disabled={this.props.disabled}
        style={this.props.style}
        onClick={this.props.onClick}>
        {this.props.children}
      </BaseBtn>
    )
  }
}
