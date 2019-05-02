import React, { Component } from 'react'
import {
  Container, Row, Col, Form,
  FormGroup, Label, Input } from 'reactstrap'

import { GoogleBtn, FacebookBtn } from '../../../components/button'

export default class Setting extends Component {
  constructor() {
    super()
    this.state = {
      loading: false,
    }

    this.chValue = this.chValue.bind(this)
    this.onSave = this.onSave.bind(this)
  }

  chValue(evt) {
    // let name = evt.target.name
    // let value = evt.target.value
  }

  render() {
    // let text = { textAlign: 'center' }
    // let btn = { marginBottom: '5px'}
    return (
      <Container>
        <Row>
          <Col md="8">
            <Form>
              <FormGroup>
                <Label>Integrations</Label>
                <div>
                  <FacebookBtn className="btn-fullsize" style={{marginBottom: '5px'}} />
                  <GoogleBtn className="btn-fullsize" />
                </div>
              </FormGroup>
            </Form>
          </Col>
        </Row>
      </Container>
    )
  }
}
