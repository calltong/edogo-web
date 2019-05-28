import React, { Component } from 'react'
import { Nav, NavItem } from 'reactstrap'
import styled from 'styled-components'

import LineMenu from './LineMenu'
import ColorMenu from './ColorMenu'

const icon_list = [
  { icon: 'fas fa-pen', name: 'pen'},
  { icon: 'far fa-square', name: 'square'},
  { icon: 'far fa-circle', name: 'circle'},
  { icon: 'fas fa-eraser', name: 'eraser'},
]

// <i class="fas fa-minus">

class MenuIcon extends Component {
  render() {
    let { color='black', onClick, disabled, icon='far fa-square'} = this.props
    let click = onClick
    if (disabled) {
      click = undefined
      color = 'grey'
    }

    return (
      <NavItem className="nav-link whiteboard-nav-link" onClick={click} >
        <label className="btn whiteboard-menu-btn-icon">
          <i className={icon} style={{color}} />
        </label>
      </NavItem>
    )
  }
}

export default class Menu extends Component {
  constructor(props) {
    super(props)

    this.onImg = this.onImg.bind(this)
  }

  async chTools(name) {
    let { setting, onChange } = this.props
    setting.tools = name
    if (onChange) onChange(setting)
  }

  onChange(name, val) {
    let { setting, onChange } = this.props
    setting.tools = name
    setting[name] = val
    if (onChange) onChange(setting)
  }

  onImg(evt) {
    let me = this
    let reader = new FileReader()
    reader.onload = function(event) {
      if (me.props.onImage) me.props.onImage({ data: event.target.result })
    }

    let files = evt.target.files
    if (files.length >= 1) reader.readAsDataURL(evt.target.files[0])
  }

  render() {
    const { setting, onUndo, onRedo, onReset, onSave } = this.props
    let tool_choose = icon_list.map((item, index) => {
      let c = item.name === setting.tools ? 'red' : 'black'
      return (
        <MenuIcon
          key={index}
          color={c}
          icon={item.icon}
          onClick={this.chTools.bind(this, item.name)} />
      )
    })

    return (
      <Section>
        <Nav className="whiteboard-menu">
          {tool_choose}

          <LineMenu
            value={setting.size}
            onChange={this.onChange.bind(this)} />
          <ColorMenu
            value={setting.color}
            onChange={this.onChange.bind(this)} />

          <NavItem className="nav-link whiteboard-nav-link" >
            <label className="btn whiteboard-menu-btn-icon">
              <i className="far fa-image" style={{color: 'black'}} />
              <input
                type="file"
                accept="image/*"
                style={{display: 'none'}}
                onChange={this.onImg} />
            </label>
          </NavItem>

          <MenuIcon
            icon="fas fa-undo"
            onClick={onUndo}
            disabled={onUndo === undefined} />
          <MenuIcon
            icon="fas fa-redo"
            onClick={onRedo}
            disabled={onRedo === undefined} />
          <MenuIcon
            icon="fas fa-broom"
            onClick={onReset}
            disabled={onReset === undefined} />
          <MenuIcon
            icon="fas fa-file-download"
            onClick={onSave} />
        </Nav>
      </Section>
    )
  }
}

const Section = styled.div`
  border: 0px solid grey;
  border-bottom-width: 1px;
`
