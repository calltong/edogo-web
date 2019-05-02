import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import { Row, Col } from 'reactstrap'

import { Btn } from '../../../components/button'

class MyHistory extends Component {
  render() {
    let doc = this.props.profile.toJS().doc
    let teacher = doc.teacher

    let cssText = {fontSize: '12px'}
    let edications = [
      {
        level: 'Bachelor degree',
        department: 'Computer Engineering @KMITL',
        duration: '2005 - 2008',
      }
    ]
    edications = edications.map((item, index) => {
      return (
        <div key={index}>
          <Row>
            <Col md="8">
              <div style={cssText}>{item.level}</div>
              <div style={cssText}>{item.department}</div>
            </Col>
            <Col md="4">
              <p style={cssText}>{item.duration}</p>
            </Col>
          </Row>
          <hr />
        </div>
      )
    })

    let experiences = [
      {
        company: 'JIB Exchange',
        position: 'Software Engineer Leader',
        duration: 'Jan 2017 - Current',
      },
      {
        company: 'Bridge Asia Group',
        position: 'Senior Software Engineer',
        duration: 'Jan 2017 - Dec 2017',
      },
      {
        company: 'Bangkok Payment Solution',
        position: 'Senior Software Engineer',
        duration: 'Jan 2016 - Dec 2016',
      }
    ]
    experiences = experiences.map((item, index) => {
      return (
        <div key={index}>
          <Row>
            <Col md="8">
              <div style={cssText}>{item.position}</div>
              <div style={cssText}>{item.company}</div>
            </Col>
            <Col md="4">
              <p style={cssText}>{item.duration}</p>
            </Col>
          </Row>
          <hr />
        </div>
      )
    })
    return (
      <div>
        <h5>Education</h5>
        {edications}
        <h5>Experiences</h5>
        {experiences}

        <Row>
          <Col md={{offset: 4, size: 4}}>
            <Btn style={{fontSize: '12px'}} className="btn-fullsize">
              Load More
            </Btn>
          </Col>
        </Row>
      </div>
    )
  }
}

export default inject('profile')(observer(MyHistory))
