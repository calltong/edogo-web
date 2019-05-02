import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Container, Row, Col } from 'reactstrap'

import Main from './main'
import Home from './home'
import Menu from './menu'
import Social from './social'

export default class Footer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isOpen: false,
    }
  }

  render() {
    return (
      <footer className="footer-body">
        <Row>
          <Col md={{size: 3, offset: 1}}>
            <Main />
          </Col>
          <Col md="2">
            <Home />
          </Col>
          <Col md="2">
            <Menu />
          </Col>
          <Col md="4">
            <Social />
          </Col>
        </Row>

        <Row>
          <Col md="12" className="footer-company">
            <i className="far fa-copyright" /> Edogo | All Rights Reserved
          </Col>
        </Row>

      </footer>
    );
  }
}
