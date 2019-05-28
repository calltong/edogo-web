import React, { Component } from 'react'
import styled from 'styled-components'

export default class FormGroup extends Component {
  render() {
    let { label } = this.props
    let txt
    if (label) txt = <Label>{label}</Label>
    else txt = <Label>&nbsp;</Label>

    return (
      <Page>
        {txt}
        {this.props.children}
      </Page>
    )
  }
}

const Page = styled.div`
  padding: 4px 0px;
`

const Label = styled.p`
  font-size: 14px;
  font-weight: 600;
  margin-bottom: 2px;
`
