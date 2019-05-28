import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import { Row, Col } from 'reactstrap'
import styled from 'styled-components'

import RoomMenu from './menu/menu'
import RoomContent from './menu/content'

import WorkMenu from './work/menu'
import WorkContent from './work'

const css = {
  paddingRight: '5px',
  paddingLeft: '5px',
}

export class Room extends Component {
  async componentDidMount() {
    let session_id = this.props.match.params.id
    let doc = this.props.member.toJS()
    let user_id = doc.id
    console.log('member id:', user_id)
    this.props.session.connectSession({ session_id, user_id })
  }

  render() {

    return (
      <Page>
        <Row>
          <Col md="3" sm="12" xs="12" style={css}>
            <RoomMenu />
          </Col>
          <Col md="9" sm="12" xs="12" style={css}>
            <WorkMenu />
          </Col>
        </Row>

        <Row>
          <Col md="3" sm="12" xs="12" style={css}>
            <RoomContent />
          </Col>
          <Col md="9" sm="12" xs="12" style={css}>
            <WorkContent />
          </Col>
        </Row>
      </Page>
    )
  }
}

const Page = styled.div`
  padding: 10px 20px;
  min-height: 690px;
`
export default inject('member', 'session')(observer(Room))
