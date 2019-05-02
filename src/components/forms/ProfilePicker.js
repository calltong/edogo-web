import React, { Component } from 'react'
import DropZone from 'react-dropzone'

export default class ProfilePicker extends Component {
  render() {
    let width = '100%'
    let content = (
      <button type="button" className="btn btn-profile" style={{ width, minHeight: '100px' }}>
        <i className="far fa-user-circle" />
      </button>
    )

    if (this.props.src) {
      content = (
        <img alt="" src={this.props.src} style={{ width, border: '1px solid #ccc' }} />
      )
    }

    return (
      <div>
        <DropZone
          style={{ width, border: '0px', cursor: 'pointer' }}
          accept={this.props.accept}
          multiple={false}
          onDrop={this.props.onDrop}>
          {content}
        </DropZone>
      </div>
    )
  }
}
