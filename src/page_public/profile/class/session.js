import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import { Row, Col } from 'reactstrap'

import { SaveBtn, Btn } from '../../../components/button'

class MySession extends Component {
  render() {
    let list = [
      {
        name: 'Basic Programming by Javascript',
        rate: 'B200/hr',
      },
      {
        name: 'Database Programming by SQL',
        rate: 'B200/hr',
      },
      {
        name: 'Database Programming by NOSQL',
        rate: 'B200/hr',
      },
    ]
    let objects = list.map((item, index) => {
      return (
        <div>
          <Row>
            <Col md="7">{item.name}</Col>
            <Col md="2">{item.rate}</Col>
            <Col md="3">
              <SaveBtn
                style={{fontSize: '12px'}}
                className="btn-fullsize">
                Booking
              </SaveBtn>
            </Col>
          </Row>
        <hr />
        </div>
      )
    })

    let cssTitle = {
      fontWeight: 'bold',
    }
    return (
      <div>
        <h5>My Session</h5>

        <Row>
          <Col md="7">
            <label style={cssTitle}>Subject</label>
          </Col>
          <Col md="2">
            <label style={cssTitle}>Prices</label>
          </Col>
          <Col md="3" />
        </Row>
        <hr style={{marginTop: '0px'}} />
        {objects}

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

export default inject('profile')(observer(MySession))
