import React from 'react'
import { observer, inject } from 'mobx-react';

export class LiveBar extends React.Component {
  onHide() {
    console.log('onHide')
    this.props.liveMenu.hide()
  }

  onClose() {
    console.log('onClose')
    this.props.liveMenu.close()
  }

  render () {
    return (
      <div className="live-bar">
        <span>Go Live</span>
        <span className="live-bar-button">
          <i onClick={this.onHide.bind(this)} className="fa fa-minus" />
          <i onClick={this.onClose.bind(this)} className="fa fa-times" />
        </span>
      </div>
    )
  }
}

export default inject('liveMenu')(observer(LiveBar));
