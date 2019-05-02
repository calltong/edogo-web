import React, { Component } from 'react';
import Input from './Input'
import { Btn } from '../button'

import { InputGroup, InputGroupAddon } from 'reactstrap'

export default class FindBox extends Component {
  render() {
    return (
      <InputGroup className={this.props.className}>
        <Input
          className="find-box-input"
          value={this.props.value}
          onChange={this.props.onChange}
          placeholder={this.props.placeholder} />
        <InputGroupAddon addonType="append">
          <Btn className="find-box-btn"><i className="fas fa-search" /></Btn>
        </InputGroupAddon>
      </InputGroup>
    );
  }
}
