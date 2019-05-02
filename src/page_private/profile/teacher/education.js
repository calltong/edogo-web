import React, { Component } from 'react'
import { observer, inject } from 'mobx-react'
import { Row, Col } from 'reactstrap'

import { EditBtn } from '../../../components/button'
import Dialog from '../../../components/dialog/Dialog'

import TitleSection from '../section/title'
import AddSection from '../section/add'
import EduForm from './eduForm'

export class Education extends Component {
  constructor() {
    super()
    this.state = {
      loading: false,
      display: false,
      mode: '',
      index: 0,
    }

    this.onAdd = this.onAdd.bind(this)
    this.onConfirm = this.onConfirm.bind(this)
    this.onCancel = this.onCancel.bind(this)
  }

  onAdd() {
    this.setState({display: true, mode: 'create'})
  }

  async onUpdate(index) {
    await this.setState({ display: true, mode: 'edit', index })
    let doc = this.props.member.toJS().doc
    let data = doc.teacher
    let item = data.education_list[index]
    await this.form.setValue(item)
  }

  onConfirm(val) {
    let { mode, index } = this.state
    let doc = this.props.member.toJS().doc
    let data = doc.teacher
    if (mode === 'edit') {
      data.education_list[index] = val
    } else {
      data.education_list.push(val)
    }

    this.props.member.setTeacher(data)
    this.setState({display: false})
  }

  onCancel() {
    this.setState({display: false})
  }

  render() {
    let { display } = this.state
    let doc = this.props.member.toJS().doc
    let teacher = doc.teacher
    this.data = teacher

    let contents = teacher.education_list.map((item, index) => {
      let duration = item.duration
      return (
        <div key={index}>
          <Row>
            <Col md="4">
              {item.school}
            </Col>
            <Col md="4">
              {item.degree}
            </Col>
            <Col md="2">
              {duration.start_at} - {duration.end_at}
            </Col>
            <Col md="2" style={{ textAlign: 'right' }}>
              <EditBtn
                noText
                className="btn-s-size btn-s-font"
                onClick={this.onUpdate.bind(this, index)} />
            </Col>
          </Row>
          <hr />
        </div>
      )
    })
    return (
      <div>
        <Dialog display={display}>
          <EduForm
            ref={input => { this.form = input }}
            onConfirm={this.onConfirm}
            onCancel={this.onCancel} />
        </Dialog>

        <TitleSection value="Educations" />

        <Row>
          <Col md="4">
            <h6>School</h6>
          </Col>
          <Col md="4">
            <h6>Degree</h6>
          </Col>
          <Col md="2">
            <h6>Duration</h6>
          </Col>
        </Row>
        <hr />

        {contents}

        <AddSection onClick={this.onAdd} />
      </div>
    )
  }
}

export default inject('member')(observer(Education))
