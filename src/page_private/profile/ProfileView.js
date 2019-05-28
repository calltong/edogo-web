import React, { Component } from 'react'
import styled from 'styled-components'
import { Row, Col, Card, CardBody } from 'reactstrap'

import Menu from './menu'

export default class ProfileView extends Component {
  render() {
    let { id, title, content } = this.props

    return (
      <PAGE>
        <Row>
          <Col md="3">
            <Menu title={title} />
          </Col>
          <Col md="9">
            <Card>
              <CardBody>
                {this.props.children}
              </CardBody>
            </Card>
          </Col>
        </Row>
      </PAGE>
    )
  }
}

const PAGE = styled.div`
  padding: 10px;
`
