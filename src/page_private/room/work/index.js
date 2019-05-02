import React, { Component } from 'react'
import { observer, inject } from 'mobx-react'
// import { Container, Row, Col } from 'reactstrap'

import Whiteboard from './whiteboard'
import Editor from './editor'
import Practice from './practice'

export class WorkContent extends Component {
  render() {
    let doc = this.props.session.toJS().room
    let content = <div />
    switch (doc.menu.selected) {
      case 'whiteboard':
        content = <Whiteboard />
        break
      case 'editor':
        content = <Editor />
        break
      case 'practice':
        content = <Practice />
        break
      default:
        content = <div />
    }
    return (
      <div className="room-work">
        {content}
      </div>
    )
  }
}

export default inject('session')(observer(WorkContent))
