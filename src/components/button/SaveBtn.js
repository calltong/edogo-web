import React, { Component } from 'react'
import BaseBtn from './BaseBtn'

export default class SaveBtn extends Component {
  render() {
    return (
      <BaseBtn
        icon="fas fa-save"
        text="Save"
        noIcon={this.props.noIcon}
        noText={this.props.noText}
        className={`btn-primary ${this.props.className}`}
        disabled={this.props.disabled}
        style={this.props.style}
        onClick={this.props.onClick}>
        {this.props.children}
      </BaseBtn>
    )
  }
}
