import React, { Component } from 'react'
import { Container, Row, Col } from 'reactstrap'

import Content from './content'
import { MiniCol } from '../../../components/layout'

export default class ResetPassword extends Component {
  render() {
    return (
      <Row>
        <MiniCol>
          <Content />
        </MiniCol>
      </Row>
    )
  }
}
