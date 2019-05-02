import React, { Component } from 'react'
import { observer, inject } from 'mobx-react'
import {
  Row, Col,
  FormGroup, Label, Input } from 'reactstrap'

import { Select, Invalid } from '../../../components/forms'

import { rates, tutors, languages } from '../../../constant'
import TitleSection from '../section/title'

export class Detail extends Component {
  constructor() {
    super()

    this.chValue = this.chValue.bind(this)
    this.chRate = this.chRate.bind(this)
    this.chLanguage = this.chLanguage.bind(this)
    this.chTutor = this.chTutor.bind(this)
  }

  chValue(evt) {
    let name = evt.target.name
    let value = evt.target.value
    this.data[name] = value
    this.props.member.setTeacher(this.data)
  }

  chRate(item) {
    this.data.rate = item.value
    this.props.member.setTeacher(this.data)
  }

  chLanguage(value) {
    this.data.lang_list = value.map(item => {
      return item.value
    })
    this.props.member.setTeacher(this.data)
  }

  chTutor(value) {
    this.data.tutor_list = value.map(item => {
      return item.value
    })
    this.props.member.setTeacher(this.data)
  }

  render() {
    let member = this.props.member.toJS()
    let { doc } = member
    let teacher = doc.teacher
    let valid = member.valid.teacher
    this.data = teacher

    let myRate = rates.find(item => {
      return item.value === teacher.rate
    })

    let myLangs = teacher.lang_list.map(item => {
      return languages.find((it) => {
        return it.value === item
      })
    })

    let myTutors = teacher.tutor_list.map(item => {
      return tutors.find((it) => {
        return it.value === item
      })
    })
    return (
      <div>
        <TitleSection value="Basic Information" />
        <Row>
          <Col md="3">
            <FormGroup>
              <Label>Rate per hours</Label>
              <Select
                name="rate"
                placeholder="Fill your rate"
                value={myRate}
                options={rates}
                onChange={this.chRate} />
              <Invalid invalid={valid.rate} text="please fill rate" />
            </FormGroup>
          </Col>
          <Col md="9">
            <FormGroup>
              <Label>Languages</Label>
              <Select
                isMulti
                placeholder="Fill your languages"
                value={myLangs}
                options={languages}
                onChange={this.chLanguage} />
              <Invalid invalid={valid.languages} text="please fill languages" />
            </FormGroup>
          </Col>
        </Row>

        <Row>
          <Col md="12">
            <FormGroup>
              <Label>My Tutor</Label>
              <Select
                isMulti
                placeholder="Fill your tutors"
                value={myTutors}
                options={tutors}
                onChange={this.chTutor} />
              <Invalid invalid={valid.tutor} text="please fill tutor" />
            </FormGroup>

            <FormGroup>
              <Label>About Me</Label>
              <Input
                name="about"
                placeholder="about me"
                type="textarea"
                rows="4"
                onChange={this.chValue} />
              <Invalid invalid={valid.about} text="please fill about me" />
            </FormGroup>
          </Col>
        </Row>

      </div>
    )
  }
}

export default inject('member')(observer(Detail))
