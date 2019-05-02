import React, { Component } from 'react'
import { Nav, NavItem } from 'reactstrap'

import LineMenu from './lineMenu'
import ColorMenu from './colorMenu'

const icon_list = [
  { icon: 'fas fa-pen', name: 'pen'},
  { icon: 'far fa-square', name: 'square'},
  { icon: 'far fa-circle', name: 'circle'},
  { icon: 'fas fa-eraser', name: 'eraser'},
]

// <i class="fas fa-minus">

class MenuIcon extends Component {
  render() {
    let color = this.props.color ? this.props.color : 'black'
    let click = this.props.onClick
    if (this.props.disabled) {
      click = undefined
      color = 'grey'
    }
    let icon = this.props.icon ? this.props.icon : 'far fa-square'
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
    let data = this.props.setting
    data.tools = name
    if (this.props.onChange) this.props.onChange(data)
  }

  onChange(name, val) {
    let data = this.props.setting
    data[name] = val
    if (this.props.onChange) this.props.onChange(data)
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
    const { setting } = this.props
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
          onClick={this.props.onUndo}
          disabled={this.props.onUndo === undefined} />
        <MenuIcon
          icon="fas fa-redo"
          onClick={this.props.onRedo}
          disabled={this.props.onRedo === undefined} />
        <MenuIcon
          icon="fas fa-broom"
          onClick={this.props.onReset}
          disabled={this.props.onReset === undefined} />
        <MenuIcon
          icon="fas fa-file-download"
          onClick={this.props.onSave} />
      </Nav>
    )
  }
}
