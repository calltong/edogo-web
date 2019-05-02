import React, { Component } from 'react'
// import { Container, Row, Col } from 'reactstrap'

import LiveMenu from './live'

export default class RoomContent extends Component {
  render() {
    return (
      <div className="room-menu">
        <LiveMenu />
      </div>
    )
  }
}
