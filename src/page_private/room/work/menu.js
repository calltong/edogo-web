import React, { Component } from 'react'
import { observer, inject } from 'mobx-react'

import Btn from '../../../components/menu'

export class WorkMenu extends Component {
  constructor() {
    super()
    this.state = {
      loading: false,
      email: '',
      password: '',
      retry: '',
      valid: {
        email: false,
        password: false,
        retry: false,
      }
    }

    this.onMenu = this.onMenu.bind(this)
  }

  async onMenu(evt) {
    this.props.session.setRoomMenu({ data: evt.target.name })
  }

  render() {
    let doc = this.props.session.toJS()
    let selected = doc.room.menu.selected
    return (
      <div className="room-work-menu">
        <Btn
          name="whiteboard"
          onClick={this.onMenu}
          active={selected === 'whiteboard'}>Whiteboard</Btn>
        <Btn
          name="editor"
          onClick={this.onMenu}
          active={selected === 'editor'}>Editor</Btn>
        <Btn
          name="practice"
          onClick={this.onMenu}
          active={selected === 'practice'}>Practice</Btn>
      </div>
    )
  }
}

export default inject('session')(observer(WorkMenu))
