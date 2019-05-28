import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import { Row, Col } from 'reactstrap'

import { EditBtn, Btn } from '../../../components/button'

import history from '../../../utils/history'
import { format } from '../../../utils/format'

import TitleSection from '../section/title'
import AddSection from '../section/add'

export class CourseList extends Component {
  constructor() {
    super()
    this.state = {
      loading: false,
    }

    this.onAdd = this.onAdd.bind(this)
  }

  onAdd() {
    history.push("../../pv/profile/course/create")
  }

  onEdit(id) {
    history.push(`../../pv/profile/course/${id}/edit`)
  }

  render() {
    let ccsItem = { textAlign: 'right' }
    let list = this.props.course.toJS().owner.list
    let cssBtn = { marginBottom: '2px' }

    let contents = list.map((item, index) => {
      let detail = item.detail
      let duration = detail.opening_list.map((it, i) => {
        let len = it.day_list.length
        let days = ''

        if (len === 0) days = 'no day'
        else if (len === 7) days = 'everyday'
        else days = it.day_list.map((day) => { return format.toShortDay(day) + ' ' })

        return (
          <Btn className="btn-s-font" style={cssBtn} key={i}>
            {format.toTime(it.start_at)}-{format.toTime(it.end_at)} {days}
          </Btn>
        )
      })

      return (
        <div key={index}>
          <Row>
            <Col md="4">
              {detail.name}
            </Col>
            <Col md="2">
              {detail.price}
            </Col>
            <Col md="4">
              {duration}
            </Col>
            <Col md="2" style={ccsItem}>
              <EditBtn
                noText
                className="btn-s-size btn-s-font"
                onClick={this.onEdit.bind(this, item._id)} />
            </Col>
          </Row>
          <hr />
        </div>
      )
    })

    return (
      <div>
        <Row>
          <Col md="4">
            <h6>Name</h6>
          </Col>
          <Col md="2">
            <h6>Price/hr</h6>
          </Col>
          <Col md="6">
            <h6>Opening</h6>
          </Col>
        </Row>
        <hr />

        {contents}

        <AddSection onClick={this.onAdd} />
      </div>
    )
  }
}

export default inject('course')(observer(CourseList))
