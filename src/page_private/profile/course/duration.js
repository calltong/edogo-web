import React, { Component } from 'react'
import {
  Row, Col,
  Form, FormGroup, Label } from 'reactstrap'

import { Select } from '../../../components/forms'

import { RemoveBtn } from '../../../components/button'
import TimePicker from '../../../components/picker/TimePicker'
import { min_day } from '../../../constant'

export default class SesionDuration extends Component {
  constructor() {
    super()

    this.chStart = this.chStart.bind(this)
    this.chEnd = this.chEnd.bind(this)
    this.onRemove = this.onRemove.bind(this)
    this.chDays = this.chDays.bind(this)
  }

  chStart(val) {
    let value = this.props.value
    value.start_at = val
    this.onUpdate(value)
  }

  chEnd(val) {
    let value = this.props.value
    value.end_at = val
    this.onUpdate(value)
  }

  chDays(val) {
    let value = this.props.value
    value.day_list = val.map((item) => {
      return item.value
    })

    this.onUpdate(value)
  }

  onUpdate(value) {
    if (this.props.onUpdate) this.props.onUpdate(value, this.props.index)
  }

  onRemove() {
    if (this.props.onRemove) this.props.onRemove(this.props.index)
  }

  render() {
    let value = this.props.value

    let myDays = value.day_list.map((item) => {
      return min_day.find((it) => {
        return it.value === item
      })
    })
    return (
      <Form>
        <Row>
          <Col md="2">
            <FormGroup>
              <Label>From</Label>
              <TimePicker
                value={value.start_at}
                onChange={this.chStart} />
            </FormGroup>
          </Col>
          <Col md="2">
            <FormGroup>
              <Label>To</Label>
              <TimePicker
                value={value.end_at}
                onChange={this.chEnd} />
            </FormGroup>
          </Col>

          <Col md="7">
            <FormGroup>
              <Label>Which of days</Label>
              <Select
                isMulti
                placeholder="Days"
                value={myDays}
                options={min_day}
                onChange={this.chDays} />
            </FormGroup>
          </Col>

          <Col md="1">
            <FormGroup>
              <Label>&nbsp;</Label>
              <div>
                <RemoveBtn
                  noText
                  className="btn-fullsize"
                  onClick={this.onRemove} />
              </div>
            </FormGroup>
          </Col>
        </Row>

        <hr />
      </Form>
    )
  }
}
