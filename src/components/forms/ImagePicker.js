import React, { Component } from 'react'
import DropZone from 'react-dropzone'

export default class ImagePicker extends Component {
  render() {
    let width = '100%'
    let remove = <div />
    let content = (
      <button type="button" className="btn btn-image" style={{ width, minHeight: '100px' }}>
        <i className="fa fa-plus" /> {this.props.title ? this.props.title : 'Add Image' }
      </button>
    )

    if (this.props.src) {
      content = (
        <img alt="" src={this.props.src} style={{ width, border: '1px solid #ccc' }} />
      )

      remove = (
        <button className="pull-right" style={{ position: 'absolute' }} onClick={this.props.onDelete}>
          <strong>x</strong>
        </button>
      )
    }

    return (
      <div>
        {remove}
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
