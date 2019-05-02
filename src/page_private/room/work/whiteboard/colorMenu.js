import React, { Component } from 'react'
import { Dropdown, DropdownToggle,
  DropdownMenu, DropdownItem } from 'reactstrap'

const color_list = [
  '#030303', '#F30505',
  '#14EE02', '#021BEE',
  '#E6FC2C', '#2CFCF6',
]

export default class ColorMenu extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isOpen: false,
    }

    this.toggle = this.toggle.bind(this)
  }

  onChange(val) {
    this.setState({value: val})
    if (this.props.onChange) this.props.onChange('color', val)
  }

  toggle() {
    let { isOpen } = this.state
    this.setState({isOpen: !isOpen})
  }

  render() {
    let { isOpen } = this.state
    let { value = color_list[0] } = this.props

    let choose_list = color_list.map((item, index) => {
      return (
        <DropdownItem key={index}>
          <div
            className="whiteboard-menu-color-btn"
            style={{backgroundColor: item}}
            onClick={this.onChange.bind(this, item)} />
        </DropdownItem>
      )
    })

    let css = {
      backgroundColor: value,
      width: '50px',
      minHeight: '18px',
      marginTop: '5px',
      marginLeft: '6px',
    }

    return (
      <Dropdown
        nav
        isOpen={isOpen}
        toggle={this.toggle}>
        <DropdownToggle nav className="whiteboard-nav-link">
          <label className="btn whiteboard-menu-btn" style={css} />
        </DropdownToggle>
        <DropdownMenu className="whiteboard-menu-color">
          {choose_list}
        </DropdownMenu>
      </Dropdown>
    )
  }
}
