import React, { Component } from 'react'
import { observer, inject } from 'mobx-react'
import { Row, Col } from 'reactstrap'

import { EditBtn } from '../../../components/button'
import Dialog from '../../../components/dialog/Dialog'
import { format } from '../../../utils/format'

import TitleSection from '../section/title'
import AddSection from '../section/add'
import ExpForm from './expForm'

export class Experience extends Component {
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

  async onUpdate(index) {
    await this.setState({ display: true, mode: 'edit', index })
    let doc = this.props.member.toJS().info
    let data = doc.teacher
    let item = data.experience_list[index]
    await this.form.setValue(item)
  }

  onAdd() {
    this.setState({display: true, mode: 'create'})
  }

  onConfirm(val) {
    console.log('on confirm', val)
    let { mode, index } = this.state
    let doc = this.props.member.toJS().info
    if (mode === 'edit') {
      doc.teacher.experience_list[index] = val
    } else {
      doc.teacher.experience_list.push(val)
    }

    this.props.member.setInfo(doc)
    this.setState({display: false})
  }

  onCancel() {
    this.setState({display: false})
  }

  render() {
    let { display } = this.state
    let doc = this.props.member.toJS().info
    let teacher = doc.teacher

    let contents = teacher.experience_list.map((item, index) => {
      let duration = item.duration
      let sm = format.toShortMonth(duration.start_month)
      let em = format.toShortMonth(duration.end_month)
      return (
        <div key={index}>
          <Row>
            <Col md="3">
              {item.position}
            </Col>
            <Col md="4">
              {item.company}
            </Col>
            <Col md="3">
              {sm} {duration.start_year} - {em} {duration.end_year}
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
          <ExpForm
            ref={input => { this.form = input }}
            onConfirm={this.onConfirm}
            onCancel={this.onCancel} />
        </Dialog>

        <TitleSection value="Experience" />

        <Row>
          <Col md="3">
            <h6>Position</h6>
          </Col>
          <Col md="4">
            <h6>Company</h6>
          </Col>
          <Col md="3">
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

export default inject('member')(observer(Experience))
