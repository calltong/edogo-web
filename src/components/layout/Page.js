import React, { Component } from 'react'
import { Container } from 'reactstrap'
import styled from 'styled-components'

export default class Page extends Component {

  render() {
    return (
      <Section>
        {this.props.children}
      </Section>
    )
  }
}

export const Section = styled.div`
  background-color: white;
  border-radius: 5px;
  padding: 20px;
  margin-top: 20px;
  margin-bottom: 20px;
`
