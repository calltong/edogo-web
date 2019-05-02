import React, { Component } from 'react'
import { observer, inject } from 'mobx-react'
import { Row, Col } from 'reactstrap'

export class Step extends Component {
  render() {
    let data = this.props.register.toJS().data
    let len = data.process.length

    let offset = 2
    let size = 2
    let list

    if (len === 1) {
      list = (
        <Col md={{ size: 8, offset: 2 }} style={{textAlign: 'center'}}>
          <div className="reg-step reg-step-main reg-step-active">
            Please choose your user type
          </div>
        </Col>
      )
    } else {
      if (len === 2) offset = 4

      list = data.process.map((item, index) => {
        let active = ''
        if (data.step === item.value) active = 'reg-step-active'
        if (index !== 0) offset = 0
        return (
          <Col md={{ size, offset }} key={index} >
            <div className={`reg-step ${active}`}>
              {index + 1}<br />
              {item.title}
            </div>
          </Col>
        )
      })
    }

    return (
      <Row>
        {list}
      </Row>
    )
  }
}

export default inject('register')(observer(Step))
