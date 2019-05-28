import React, { Component } from 'react'
import styled from 'styled-components'
// import { Container, Row, Col } from 'reactstrap'

import LiveMenu from './live'

export default class RoomContent extends Component {
  render() {
    return (
      <Section>
        <LiveMenu />
      </Section>
    )
  }
}

const Section = styled.div`
  margin-top: 5px;
`
