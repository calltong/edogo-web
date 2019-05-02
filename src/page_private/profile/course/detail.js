import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import _ from 'lodash'

import {
  Row, Col,
  FormGroup, Label,
  Input, FormFeedback } from 'reactstrap'

import { Select, Image } from '../../../components/forms'
import { OkBtn, BackBtn } from '../../../components/button'
import { rates } from '../../../constant'

import AddSection from '../section/add'

import SesionDuration from './duration'

const origin = {
  valid: {
    name: false,
    price: false,
    duration: false,
  }
}

export class DataDetail extends Component {
  constructor() {
    super()
    this.state = _.cloneDeep(origin)

    this.onUpdate = this.onUpdate.bind(this)
    this.onRemove = this.onRemove.bind(this)
    this.onAdd = this.onAdd.bind(this)

    this.onImg = this.onImg.bind(this)

    this.chPrice = this.chPrice.bind(this)
    this.onChange = this.onChange.bind(this)
    this.onConfirm = this.onConfirm.bind(this)
    this.onCancel = this.onCancel.bind(this)
  }

  onUpdate(item, index) {
    let data = this.data
    data.detail.opening_list[index] = item
    this.props.course.setData({ data })
  }

  onRemove(index) {
    let data = this.data
    data.detail.opening_list.splice(index, 1)
    this.props.course.setData({ data })
  }

  onChange(evt) {
    let name = evt.target.name
    let value = evt.target.value
    let data = this.data

    data.detail[name] = value
    this.props.course.setData({ data })
  }

  onImg(evt) {
    let data = this.data

    let me = this
    let reader = new FileReader()
    reader.onload = function(event) {
      data.detail.image = event.target.result
      me.props.course.setData({ data })
    }

    let files = evt.target.files
    if (files.length >= 1) reader.readAsDataURL(evt.target.files[0]);
  }


  chPrice(val) {
    let data = this.data
    data.detail.price = val
    this.props.course.setData({ data })
  }

  onAdd() {
    this.props.course.addDuration()
  }

  async onConfirm() {
    let valid = await this.props.course.validate()
    if (valid.invalid === false) this.props.course.confirmForm()
  }

  onCancel() {
    this.props.course.setMode({ mode: 'display' })
  }

  reset() {
    let val = _.cloneDeep(origin)
    this.setState(val)
  }

  render() {
    let { data, valid } = this.props.course.toJS().owner

    this.data = data
    let detail = data.detail
    let list = detail.opening_list.map((item, index) => {
      return (
        <SesionDuration
          key={index}
          index={index}
          value={item}
          onUpdate={this.onUpdate}
          onRemove={this.onRemove} />
      )
    })

    let myPrice = rates.find((item) => {
      return item.value === detail.price
    })

    return (
      <div>
        <Row>
          <Col md="8">
            <FormGroup>
              <Label>Name</Label>
              <Input
                name="name"
                placeholder="Name"
                invalid={valid.name}
                value={detail.name}
                onChange={this.onChange} />
              <FormFeedback>please fill name</FormFeedback>
            </FormGroup>
          </Col>
          <Col md="4">
            <FormGroup>
              <Label>Price</Label>
              <Select
                placeholder="price"
                invalid={valid.price}
                value={myPrice}
                options={rates}
                onChange={this.chPrice} />
            </FormGroup>
          </Col>
        </Row>

        <Row>
          <Col md="8">
            <FormGroup>
              <Label>Image 3x2</Label>
              <Image
                className="image-title"
                src={detail.image}
                onChange={this.onImg} />
              <FormFeedback>please fill name</FormFeedback>
            </FormGroup>
          </Col>
        </Row>

        <Row>
          <Col md="12">
            <FormGroup>
              <Label>Description</Label>
              <Input
                name="description"
                placeholder="description"
                type="textarea"
                rows="4"
                invalid={valid.description}
                value={detail.description}
                onChange={this.onChange} />
              <FormFeedback>please fill description</FormFeedback>
            </FormGroup>
          </Col>
        </Row>

        <br />
        <h5>Opening</h5>
        <hr />
        {list}

        <AddSection onClick={this.onAdd} invalid={valid.opening} />
        <br />

        <Row>
          <Col md={{size: '2', offset: '8'}}>
            <BackBtn className="btn-fullsize" onClick={this.onCancel} />
          </Col>
          <Col md="2">
            <OkBtn className="btn-fullsize" onClick={this.onConfirm} />
          </Col>
        </Row>
      </div>
    )
  }
}

export default inject('course')(observer(DataDetail))
