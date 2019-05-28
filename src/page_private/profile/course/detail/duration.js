import React, { Component } from 'react'
import {
  Row, Col,
  Form, Label } from 'reactstrap'
import { TimePicker } from 'antd'
import moment from 'moment'

import { Select, FormGroup, CheckList } from '../../../../components/forms'
import { RemoveBtn } from '../../../../components/button'

import { min_day } from '../../../../constant'

export default class Duration extends Component {
  chStart = (val) => {
    let { value } = this.props
    value.start_at = val
    this.onUpdate(value)
  }

  chEnd = (val) => {
    let { value } = this.props
    value.end_at = val
    this.onUpdate(value)
  }

  chDays = (val) => {
    let { value } = this.props
    value.day_list = val
    this.onUpdate(value)
  }

  onUpdate = (value) => {
    let { onUpdate, index } = this.props
    if (onUpdate) onUpdate(value, index)
  }

  onRemove = () => {
    let { onRemove, index } = this.props
    if (onRemove) onRemove(index)
  }

  render() {
    let { value } = this.props
    return (
      <Form>
        <Row>
          <Col md="2">
            <FormGroup label="Start">
              <TimePicker
                defaultValue={moment(value.start_at)}
                onChange={this.chStart} />
            </FormGroup>
          </Col>
          <Col md="2">
            <FormGroup label="To">
              <TimePicker
                defaultValue={moment(value.end_at)}
                onChange={this.chEnd} />
            </FormGroup>
          </Col>

          <Col md="7">
            <FormGroup label="Which of days">
              <CheckList
                placeholder="Choose Days"
                menus={min_day}
                value={value.day_list}
                onChange={this.chDays} />
            </FormGroup>
          </Col>

          <Col md="1">
            <FormGroup>
              <RemoveBtn
                noText
                className="btn-fullsize"
                onClick={this.onRemove} />
            </FormGroup>
          </Col>
        </Row>

        <hr />
      </Form>
    )
  }
}
