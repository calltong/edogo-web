import React, { Component } from 'react'
import BaseBtn from './BaseBtn'

export default class UploadBtn extends Component {
  render() {

    return (
      <BaseBtn
        icon="fas fa-upload"
        text="Upload"
        className="btn-primary"
        {...this.props}>
        {this.props.children}
      </BaseBtn>
    )
  }
}
