import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import { Row, Col } from 'reactstrap'

import { Btn } from '../../../components/button'

class MyInfo extends Component {
  render() {
    let doc = this.props.profile.toJS().doc
    let teacher = doc.teacher

    let subjects = teacher.tutor_list.map((item, index) => {
      return (
        <Btn className="pro-user-info-skill" key={index}>{item}</Btn>
      )
    })
    return (
      <div>
        <h5>ABOUT ME</h5>
        <Row>
          <Col md="12">
            <div className="pro-user-info-about">{teacher.about || ''}</div>
          </Col>
        </Row>
        <br />
        <h5>SUBJECTS</h5>
        <Row>
          <Col md="12">
            {subjects}
          </Col>
        </Row>
      </div>
    )
  }
}

export default inject('profile')(observer(MyInfo))
