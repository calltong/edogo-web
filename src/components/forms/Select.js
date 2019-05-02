import React, { Component } from 'react'
import { default as Selector } from 'react-select'

export default class Select extends Component {
  render() {
    let cn = this.props.className ? this.props.className : ''
    let valid = this.props.invalid ? 'border-invalid' : ''
    return (
      <Selector
        className={`${valid} ${cn}`}
        isMulti={this.props.isMulti}
        placeholder={this.props.placeholder}
        value={this.props.value}
        options={this.props.options}
        onChange={this.props.onChange} />
    )
  }
}
