import React, { Component } from 'react'
import { observer, inject } from 'mobx-react'
import styled from 'styled-components'

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
      <Section>
        {content}
      </Section>
    )
  }
}

const Section = styled.div`
  background-color: white;
  margin-top: 2px;
`


export default inject('session')(observer(WorkContent))
