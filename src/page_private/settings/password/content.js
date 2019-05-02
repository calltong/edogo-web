import React, { Component } from 'react'

import {
  Container, Row, Col,
  Form, FormGroup, Label, Input } from 'reactstrap';

import { SaveBtn } from '../../../components/forms/button'

export default class Content extends Component {
  render() {
    let md = { size: 12 }
    let btn = { marginBottom: '5px' }
    return (
      <Container>
        <Row>
          <Col md={md}>
            <Form>
              <FormGroup>
                <Label>Email</Label>
                <Input type="email" name="email" placeholder="email" readonly />
              </FormGroup>
              <FormGroup>
                <Label>Password</Label>
                <Input type="password" name="password" placeholder="password" />
              </FormGroup>
              <FormGroup>
                <Label>Confirm Password</Label>
                <Input type="password" name="confirm_password" placeholder="confirm password" />
              </FormGroup>
            </Form>
          </Col>
          <Col md={md}>
            <SaveBtn className="btn-fullsize" />
          </Col>
        </Row>
      </Container>
    )
  }
}
