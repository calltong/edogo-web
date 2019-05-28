import React, { Component } from 'react'
import _ from 'lodash'
import {
  Row, Col,
  Form, Input } from 'reactstrap'

import { DropdownList, FormGroup } from '../../../components/forms'
import { full_month, full_year } from '../../../constant'
import { helper } from '../../../utils/helper'

import ConfirmSection from '../section/confirm'

const origin = {
  data: {
    position: '',
    company: '',
    duration: {
      start_month: undefined,
      start_year: undefined,
      end_month: undefined,
      end_year: undefined,
    },
  },
  valid: {
    position: false,
    company: false,
    start_month: false,
    start_year: false,
    end_month: false,
    end_year: false,
  },
}

export default class ExpForm extends Component {
  constructor() {
    super()
    this.state = _.cloneDeep(origin)

    this.onConfirm = this.onConfirm.bind(this)
    this.onCancel = this.onCancel.bind(this)
    this.onChange = this.onChange.bind(this)
  }

  setValue = (val) => {
    let data = _.cloneDeep(val)
    this.setState({ data })
  }

  onChange = (evt) => {
    let name = evt.target.name
    let value = evt.target.value
    let { data } = this.state
    data[name] = value
    this.setState({ data })
  }

  chDuration = (name, item) => {
    let { data } = this.state
    data.duration[name] = item.value
    this.setState({ data })
  }

  onConfirm = async () => {
    let { data } = this.state
    let checkList = ['position', 'company']
    let durationList = ['start_month', 'start_year', 'end_month', 'end_year']

    let valid = _.cloneDeep(origin.valid)
    let res = await helper.checkValue({ item: data, valid, list: checkList })
    let invalid = res.invalid
    valid = res.data

    res = await helper.checkValue({ item: data.duration, valid, list: durationList })

    if (invalid || res.invalid) {
      valid = res.data
      this.setState({ valid })
    } else {
      let confirm = this.props.onConfirm
      if (confirm) {
        confirm(data)
        this.reset()
      }
    }
  }

  onCancel = () => {
    let cancel = this.props.onCancel
    if (cancel) {
      cancel()
      this.reset()
    }
  }

  reset = () => {
    let val = _.cloneDeep(origin)
    this.setState(val)
  }

  render() {
    let { data, valid } =  this.state
    let { position, company, duration } = data

    return (
      <Form>
        <h4>Create Your Experience</h4>
        <Row>
          <Col md="12">
            <FormGroup label="Position">
              <Input
                name="position"
                placeholder="your position"
                invalid={valid.position}
                value={position}
                onChange={this.onChange} />
            </FormGroup>
          </Col>
          <Col md="12">
            <FormGroup label="Company">
              <Input
                name="company"
                placeholder="your company"
                invalid={valid.company}
                value={company}
                onChange={this.onChange} />
            </FormGroup>
          </Col>
        </Row>

        <Row>
          <Col md="6">
            <FormGroup label="From">
              <DropdownList
                name="start_month"
                placeholder="Month"
                value={duration.start_month}
                menus={full_month}
                onChange={this.chDuration} />
            </FormGroup>
          </Col>
          <Col md="6">
            <FormGroup>
              <DropdownList
                name="start_year"
                placeholder="Year"
                value={duration.start_year}
                menus={full_year}
                onChange={this.chDuration} />
            </FormGroup>
          </Col>
        </Row>

        <Row>
          <Col md="6">
            <FormGroup label="To">
              <DropdownList
                name="end_month"
                placeholder="Month"
                value={duration.end_month}
                menus={full_month}
                onChange={this.chDuration} />
            </FormGroup>
          </Col>
          <Col md="6">
            <FormGroup>
              <DropdownList
                name="end_year"
                placeholder="Year"
                value={duration.end_year}
                menus={full_year}
                onChange={this.chDuration} />
            </FormGroup>
          </Col>
        </Row>

        <br />
        <ConfirmSection onConfirm={this.onConfirm} onCancel={this.onCancel} />
      </Form>
    )
  }
}
