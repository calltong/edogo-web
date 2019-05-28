import React, { Component } from 'react'
import { Row, Col } from 'reactstrap'
import { Link } from 'react-router-dom'
import { Page, Title } from './layout'

export default class Completed extends Component {

  render() {
    let text = { textAlign: 'center' }

    return (
      <Page>
        <Title>{this.props.title || 'Completed'}</Title>
        <br />
        <p style={text}>{this.props.detail}</p>
        <br />
        <p style={text}><i className="fas fa-check-circle layout-form-icon text-success" /></p>
        <br />
        <Row>
          <Col md="12" sm="12" xs="12">
            <p style={text}>Go to home page <Link to="../../../">click here</Link></p>
          </Col>
        </Row>
      </Page>
    )
  }
}
