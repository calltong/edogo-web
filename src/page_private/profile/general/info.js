import React, { Component } from 'react'
import { observer, inject } from 'mobx-react'
import moment from 'moment'
import {
  Container, Row, Col, Form,
  Input } from 'reactstrap'

import { DatePicker } from 'antd'
import { DropdownList, FormGroup } from '../../../components/forms'

import ProfileImg from './ProfileImg'

export class Info extends Component {
  constructor() {
    super()
    this.state = {
      loading: false,
    }
  }

  componentWillReceiveProps() {
    this.forceUpdate()
  }

  chValue = (evt) => {
    let name = evt.target.name
    let value = evt.target.value
    this.doc.profile[name] = value
    this.props.member.setInfo(this.doc)
  }

  chBirthday = (val) => {
    this.doc.profile.birthday = val
    this.props.member.setInfo(this.doc)
  }

  render() {
    let doc = this.props.member.toJS().info
    let { profile = {} } = doc
    let valid= this.props.valid
    this.doc = doc || {}
    return (
      <Container>
        <Row>
          <Col md="3">
            <ProfileImg />
          </Col>
          <Col md="9">
            <Form>
              <Row>
                <Col md="6">
                  <FormGroup label="Name">
                    <Input
                      name="name"
                      placeholder="name"
                      value={profile.name}
                      invalid={valid.name}
                      onChange={this.chValue} />
                  </FormGroup>
                </Col>
                <Col md="6">
                  <FormGroup label="Surname">
                    <Input
                      name="surname"
                      placeholder="surname"
                      value={profile.surname}
                      invalid={false}
                      onChange={this.chValue} />
                  </FormGroup>
                </Col>
              </Row>

              <Row>
                <Col md="6">
                  <FormGroup label="Nickname">
                    <Input
                      name="nickname"
                      placeholder="fill nickname"
                      value={profile.nickname}
                      invalid={valid.nickname}
                      onChange={this.chValue} />

                  </FormGroup>
                </Col>
                <Col md="6">
                  <FormGroup label="Birthday">
                    <div>
                      <DatePicker
                        allowClear
                        placeholderText="dd/mm/yyyy"
                        defaultValue={moment()}
                        onChange={this.chBirthday} />
                    </div>
                  </FormGroup>
                </Col>
              </Row>

              <Row>
                <Col md="6">
                  <FormGroup label="Email">
                    <Input
                      disabled
                      type="email"
                      name="email"
                      placeholder="email"
                      value={profile.email} />
                  </FormGroup>
                </Col>
                <Col md="6">
                  <FormGroup label="Phone number">
                    <Input
                      name="phone"
                      placeholder="phone number"
                      value={profile.phone}
                      onChange={this.chValue} />
                  </FormGroup>
                </Col>
              </Row>
            </Form>
          </Col>
        </Row>

      </Container>
    )
  }
}

export default inject('member')(observer(Info))
