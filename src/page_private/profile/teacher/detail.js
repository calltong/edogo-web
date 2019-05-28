import React, { Component } from 'react'
import { observer, inject } from 'mobx-react'
import { Row, Col, Input } from 'reactstrap'

import { DropdownList, CheckList, FormGroup } from '../../../components/forms'

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

  componentWillReceiveProps() {
    this.forceUpdate()
  }

  chValue = (evt) => {
    let name = evt.target.name
    let value = evt.target.value
    this.doc.teacher[name] = value
    this.props.member.setInfo(this.doc)
  }

  chRate = (value) => {
    this.doc.teacher.rate = value
    this.props.member.setInfo(this.doc)
  }

  chLanguage = (value) => {
    this.doc.teacher.lang_list = value
    this.props.member.setInfo(this.doc)
  }

  chTutor = (value) => {
    this.doc.teacher.tutor_list = value
    this.props.member.setInfo(this.doc)
  }

  render() {
    let { valid = {} } = this.props
    let doc = this.props.member.toJS().info
    this.doc = doc
    let teacher = doc.teacher

    return (
      <div>
        <TitleSection value="Basic Information" />
        <Row>
          <Col md="3">
            <FormGroup label="Rate per hours">
              <DropdownList
                name="rate"
                placeholder="Fill your rate"
                value={teacher.rate}
                menus={rates}
                onChange={this.chRate} />
            </FormGroup>
          </Col>
          <Col md="9">
            <FormGroup label="Languages">
              <CheckList
                placeholder="Fill your languages"
                value={teacher.lang_list}
                menus={languages}
                onChange={this.chLanguage} />
            </FormGroup>
          </Col>
        </Row>

        <Row>
          <Col md="12">
            <FormGroup label="My Tutor">
              <CheckList
                placeholder="Fill your tutors"
                value={teacher.tutor_list}
                menus={tutors}
                onChange={this.chTutor} />
            </FormGroup>

            <FormGroup label="About Me">
              <Input
                name="about"
                placeholder="about me"
                type="textarea"
                rows="4"
                value={teacher.about}
                onChange={this.chValue} />
            </FormGroup>
          </Col>
        </Row>

      </div>
    )
  }
}

export default inject('member')(observer(Detail))
