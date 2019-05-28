import React, { Component } from 'react'
import { Select } from 'antd'

export default class DropdownList extends Component {
  onSelected = async (selected) => {
    let { onChange, name } = this.props
    if (onChange) onChange(selected, name)
  }

  render() {
    let { menus=[], placeHolder = 'Please Select', value } = this.props
    const choice = []
    for (let item of menus) {
      choice.push(
        <Select.Option key={item.value}>{item.name || item.label}</Select.Option>
      )
    }

    return (
      <Select
        style={{ width: '100%' }}
        placeholder={placeHolder}
        defaultValue={value}
        allowClear={true}
        showArrow={true}
        onChange={this.onSelected}>
        {choice}
      </Select>
    )
  }
}
