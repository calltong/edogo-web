import React, { Component } from 'react'
import {
  Row, Col,
  Form, Input } from 'reactstrap'

import _ from 'lodash'

import { full_year } from '../../../constant'
import { helper } from '../../../utils/helper'
import { DropdownList, FormGroup } from '../../../components/forms'

import ConfirmSection from '../section/confirm'

const origin = {
  data: {
    school: '',
    degree: '',
    duration: {
      start_at: undefined,
      end_at: undefined,
    },
  },
  valid: {
    school: false,
    degree: false,
    start_at: false,
    end_at: false,
  }
}

export default class EduForm extends Component {
  constructor() {
    super()
    this.state = _.cloneDeep(origin)

    this.onConfirm = this.onConfirm.bind(this)
    this.onCancel = this.onCancel.bind(this)
    this.onChange = this.onChange.bind(this)
  }

  setValue(val) {
    let data = _.cloneDeep(val)
    this.setState({ data })
  }

  onChange = (evt) => {
    let name = evt.target.name
    let value = evt.target.value
    let data = this.state.data
    data[name] = value
    this.setState({ data })
  }

  chDuration = (name, item) => {
    let data = this.state.data
    data.duration[name] = item.value
    this.setState({ data })
  }

  onConfirm = async () => {
    let { data } = this.state
    let checkList = ['school', 'degree']
    let durationList = ['start_at', 'end_at']

    let valid = _.cloneDeep(origin.valid)
    let res = await helper.checkValue({ item: data, valid, list: checkList })

    let invalid = res.invalid
    res = await helper.checkValue({ item: data.duration, valid: res.data, list: durationList })

    if (invalid || res.invalid ) {
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
    let { data, valid } = this.state

    return (
      <Form>
        <h4>Create Your Education</h4>
        <Row>
          <Col md="12">
            <FormGroup label="School">
              <Input
                name="school"
                placeholder="School"
                invalid={valid.school}
                value={data.school}
                onChange={this.onChange} />
            </FormGroup>
          </Col>
          <Col md="12">
            <FormGroup label="Degree">
              <Input
                name="degree"
                placeholder="your degree"
                invalid={valid.degree}
                value={data.degree}
                onChange={this.onChange} />
            </FormGroup>
          </Col>
        </Row>

        <Row>
          <Col md="6">
            <FormGroup label="From">
              <DropdownList
                placeholder="From Year"
                value={data.duration.start_at}
                menus={full_year}
                onChange={this.chDuration.bind(this, 'start_at')} />
            </FormGroup>
          </Col>
          <Col md="6">
            <FormGroup label="To">
              <DropdownList
                placeholder="To Year"
                value={data.duration.end_at}
                menu={full_year}
                onChange={this.chDuration.bind(this, 'end_at')} />
            </FormGroup>
          </Col>
        </Row>

        <br />
        <ConfirmSection onConfirm={this.onConfirm} onCancel={this.onCancel} />
      </Form>
    )
  }
}
