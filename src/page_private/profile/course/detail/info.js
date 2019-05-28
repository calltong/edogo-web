import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'

import { Row, Col, Input } from 'reactstrap'
import _ from 'lodash'

import { DropdownList, ImagePicker, FormGroup, Invalid } from '../../../../components/forms'
import { rates } from '../../../../constant'
import { timer } from '../../../../utils/timer'

import AddSection from '../../section/add'
import Duration from './duration'

import { min_day } from '../../../../constant'

const days = min_day.map(item => { return item.value })

export class Info extends Component {
  constructor() {
    super()

    this.onUpdate = this.onUpdate.bind(this)
    this.onRemove = this.onRemove.bind(this)
    this.onAdd = this.onAdd.bind(this)

    this.onImg = this.onImg.bind(this)

    this.chPrice = this.chPrice.bind(this)
    this.onChange = this.onChange.bind(this)
  }

  componentWillReceiveProps() {
    this.forceUpdate()
  }

  onUpdate(item, index) {
    let data = this.doc
    data.detail.opening_list[index] = item
    this.props.course.setDoc({ data })
  }

  onRemove(index) {
    let data = this.doc
    data.detail.opening_list.splice(index, 1)
    this.props.course.setDoc({ data })
  }

  onChange(evt) {
    let name = evt.target.name
    let value = evt.target.value
    let data = this.doc

    data.detail[name] = value
    this.props.course.setDoc({ data })
  }

  onImg(files) {
    let data = this.doc

    let me = this
    let reader = new FileReader()
    reader.onload = function(event) {
      data.detail.image = event.target.result
      me.props.course.setDoc({ data })
    }

    if (files.length >= 1) reader.readAsDataURL(files[0])
  }

  chPrice(val) {
    let data = this.doc
    data.detail.price = val
    this.props.course.setDoc({ data })
  }

  onAdd() {
    let data = this.doc
    data.detail.opening_list.push({
      start_at: timer.getNoMinute(),
      end_at: timer.getNoMinute().add(1, 'hours'),
      day_list: _.cloneDeep(days),
    })
    this.props.course.setDoc({ data })
  }

  render() {
    let { valid } = this.props
    let doc = this.props.course.toJS().owner.data
    this.doc = doc
    let detail = doc.detail
    let list = detail.opening_list.map((item, index) => {
      return (
        <Duration
          key={index}
          index={index}
          value={item}
          onUpdate={this.onUpdate}
          onRemove={this.onRemove} />
      )
    })

    return (
      <div>
        <Row>
          <Col md="8">
            <FormGroup label="Name">
              <Input
                name="name"
                placeholder="Name"
                invalid={valid.name}
                value={detail.name}
                onChange={this.onChange} />
            </FormGroup>
          </Col>
          <Col md="4">
            <FormGroup label="Price">
              <DropdownList
                placeholder="Choose Price"
                value={detail.price}
                menus={rates}
                onChange={this.chPrice} />
            </FormGroup>
          </Col>
        </Row>

        <Row>
          <Col md="8">
            <FormGroup label="Image 3x2">
              <ImagePicker
                className="image-title"
                invalid={valid.image}
                src={detail.image}
                onDrop={this.onImg} />
            </FormGroup>
          </Col>
        </Row>

        <Row>
          <Col md="12">
            <FormGroup label="Description">
              <Input
                name="description"
                placeholder="description"
                type="textarea"
                rows="4"
                invalid={valid.description}
                value={detail.description}
                onChange={this.onChange} />
            </FormGroup>
          </Col>
        </Row>

        <br />
        <h5>Opening</h5>
        <hr />
        {list}

        <AddSection onClick={this.onAdd} invalid={valid.opening} />
      </div>
    )
  }
}

export default inject('course')(observer(Info))
