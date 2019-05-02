import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import { Row, Col } from 'reactstrap'

export class Messenger extends Component {
  async componentDidMount() {
    console.log('Messenger')
  }

  render() {
    console.log('msg')
    return (
      <div>
        <Row>
          <Col md="4" sm="12" xs="12">
            Menus
          </Col>
        </Row>
      </div>
    )
  }
}

export default inject('messenger')(observer(Messenger))
