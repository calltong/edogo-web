import React, { Component } from 'react'
import { Select } from 'antd'

export default class CheckList extends Component {
  onSelected = async (selected) => {
    let { onChange, name } = this.props
    if (onChange) onChange(selected, name)
  }

  render() {
    let { menus=[], value = [], placeHolder = 'Please Select' } = this.props
    const choice = []
    for (let item of menus) {
      choice.push(
        <Select.Option key={item.value}>{item.name || item.label}</Select.Option>
      )
    }

    return (
      <Select
        mode="multiple"
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
