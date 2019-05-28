import React, { Component } from 'react'
// import styled from 'styled-components'

import BaseBtn from './BaseBtn'

export default class AddBtn extends Component {
  render() {
    return (
      <BaseBtn
        icon="fas fa-plus"
        text="Add"
        {...this.props}>
        {this.props.children}
      </BaseBtn>
    )
  }
}
/*
const Btn = styled.button`
  color: #000000;
  background-color: #E6FEDF;

  hover {
    color: #000000;
    background-color: #D3F9D0;
  }
`*/
