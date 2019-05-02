import React, { Component } from 'react'
import { observer, inject } from 'mobx-react'
import moment from 'moment'
import {
  Container, Row, Col, Form,
  FormGroup, Label, Input, FormFeedback } from 'reactstrap'
import DatePicker from 'react-datepicker'

// import DatePicker from '../../../components/picker/DatePicker'
import ProfileImg from './img'

export class Info extends Component {
  constructor() {
    super()
    this.state = {
      loading: false,
    }

    this.chValue = this.chValue.bind(this)
    this.chBirthday = this.chBirthday.bind(this)
  }

  componentWillReceiveProps() {
    this.forceUpdate()
  }

  chValue(evt) {
    let name = evt.target.name
    let value = evt.target.value
    this.doc.profile[name] = value
    this.props.member.setInfo(this.doc)
  }

  chBirthday(val) {
    this.doc.profile.birthday = val
    this.props.member.setInfo(this.doc)
  }

  render() {
    let doc = this.props.member.toJS().info
    let { profile = {} } = doc
    console.log('profile:', profile)
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
                  <FormGroup>
                    <Label>Name</Label>
                    <Input
                      name="name"
                      placeholder="your name"
                      value={profile.name}
                      invalid={valid.name}
                      onChange={this.chValue} />
                    <FormFeedback>please fill name</FormFeedback>
                  </FormGroup>
                </Col>
                <Col md="6">
                  <FormGroup>
                    <Label>Surname</Label>
                    <Input
                      name="surname"
                      placeholder="your surname"
                      value={profile.surname}
                      invalid={false}
                      onChange={this.chValue} />
                  </FormGroup>
                </Col>
              </Row>

              <Row>
                <Col md="6">
                  <FormGroup>
                    <Label>Nickname</Label>
                    <Input
                      name="nickname"
                      placeholder="your nickname"
                      value={profile.nickname}
                      invalid={valid.nickname}
                      onChange={this.chValue} />
                    <FormFeedback>please fill nickname</FormFeedback>
                  </FormGroup>
                </Col>
                <Col md="6">
                  <FormGroup>
                    <Label>Birthday</Label>
                    <div>
                      <DatePicker
                        placeholderText="dd/mm/yyyy"
                        selected={moment()}
                        onChange={this.chBirthday} />
                    </div>
                  </FormGroup>
                </Col>
              </Row>

              <Row>
                <Col md="6">
                  <FormGroup>
                    <Label>Email</Label>
                    <Input
                      disabled
                      type="email"
                      name="email"
                      placeholder="your email"
                      value={profile.email} />
                    <FormFeedback>please fill email</FormFeedback>
                  </FormGroup>
                </Col>
                <Col md="6">
                  <FormGroup>
                    <Label>Phone number</Label>
                    <Input
                      name="phone"
                      placeholder="your phone number"
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
