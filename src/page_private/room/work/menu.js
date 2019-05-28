import React, { Component } from 'react'
import { observer, inject } from 'mobx-react'
import styled from 'styled-components'

import Btn from '../../../components/menu'

export class WorkMenu extends Component {
  constructor() {
    super()
    this.state = {
      loading: false,
      email: '',
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
      <Section>
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
      </Section>
    )
  }
}

const Section = styled.div`
  border-radius: 5px;
  margin-bottom: 2px;
  button {
    font-size: 12px;
  }
`

export default inject('session')(observer(WorkMenu))
