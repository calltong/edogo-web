import React, { Component } from 'react'
import { Dropdown, DropdownToggle,
  DropdownMenu, DropdownItem,
  Container, Row, Col } from 'reactstrap'

  const size_list = [
    {
      label: 1,
      value: 2,
    },
    {
      label: 2,
      value: 4,
    },
    {
      label: 3,
      value: 6,
    },
    {
      label: 4,
      value: 8,
    },
    {
      label: 5,
      value: 10,
    },
  ]

export default class LineMenu extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isOpen: false,
    }

    this.toggle = this.toggle.bind(this)
  }

  onChange(item) {
    if (this.props.onChange) this.props.onChange('size', item.value)
  }

  toggle() {
    let { isOpen } = this.state
    this.setState({isOpen: !isOpen})
  }

  render() {
    let { isOpen } = this.state
    let { value } = this.props
    let selected = size_list.find((it) => {
      return it.value === value
    })

    if (selected === undefined) selected = size_list[0]
    let col = {
      paddingRight: '8px',
      paddingLeft: '8px',
    }

    let choose_list = size_list.map((item, index) => {
      let cssLine = { borderTop: `${item.label + 2}px solid black` }
      return (
        <DropdownItem key={index}>
          <Container onClick={this.onChange.bind(this, item)}>
            <Row>
              <Col md="2" style={col}>{item.label}</Col>
              <Col md="9" style={col}>
                <hr className="whiteboard-menu-line-item" style={cssLine} />
              </Col>
            </Row>
          </Container>
        </DropdownItem>
      )
    })

    return (
      <Dropdown
        nav
        isOpen={isOpen}
        toggle={this.toggle}>
        <DropdownToggle nav className="whiteboard-nav-link" style={{color: 'black'}}>
          <label className="btn whiteboard-menu-line-btn">
            {selected.label}
          </label>
        </DropdownToggle>
        <DropdownMenu className="whiteboard-menu-color">
          {choose_list}
        </DropdownMenu>
      </Dropdown>
    )
  }
}
