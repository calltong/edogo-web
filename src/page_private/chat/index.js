import React from 'react'
import { Row, Col } from 'reactstrap'

import Menu from './menu'

export default class ChatView extends React.Component {
  render() {
    return (
      <div className="visitor-area">
        <Row>
          <Col md="2">
            <Menu />
          </Col>
        </Row>
      </div>
    );
  }
}
