import React from 'react'
import { observer, inject } from 'mobx-react';

export class LiveTool extends React.Component {
  choosePicture() {
    console.log('choosePicture')
  }

  chooseFile() {
    console.log('chooseFile')
  }

  modeCamera() {
    console.log('modeCamera')
  }

  modePhone() {
    console.log('modePhone')
  }

  modeChat() {
    console.log('modeChat')
  }

  render () {
    return (
      <div className="live-tool">
        <i onClick={this.choosePicture.bind(this)} className="fa fa-picture-o" />
        <i onClick={this.chooseFile.bind(this)} className="fa fa-file-text-o" />
      </div>
    )
  }
}

export default inject('live')(observer(LiveTool));
