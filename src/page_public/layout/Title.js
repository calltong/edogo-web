import React, { Component } from 'react'
import styled from 'styled-components'
import { Row, Col } from 'reactstrap'

import title from '../../assets/img/title-img.svg'
import { Btn } from '../../components/button'
import { history } from '../../utils/history'

const cssBtn = {
  color: 'black',
  backgroundColor: 'white',
  borderRadius: '15px',
  width: '150px'
}

export default class Title extends Component {
  onDemo = () => {
    history.push('./')
  }

  render() {
    return (
      <PAGE className="app-content">
        <LAYOUT>
          <Row>
            <Col md={{size: 4, offset: 2}}>
              <HEADER>Live</HEADER>
              <HEADER>Leaning Center</HEADER>
              <INFO>
                We are different learning center from other website because you can learn with teacher in realtime.
              </INFO>
              <Btn style={cssBtn} onClick={this.onDemo}>Get a demo</Btn>
            </Col>
            <Col md={{size: 4}}>
              <IMG alt="" src={title} />
            </Col>
          </Row>
        </LAYOUT>
      </PAGE>
    )
  }
}

const PAGE = styled.div`
  background: rgb(91,172,216);
  background: linear-gradient(180deg, rgba(91,172,216,1) 0%, rgba(33,130,182,1) 100%);
  min-height: 320px;
  margin: 0px;
`

const LAYOUT = styled.div`
  color: white;
  margin: 80px;
  max-width: 100%;
  margin 0;
`

const HEADER = styled.div`
  font-size: 30px;
`

const INFO = styled.div`
  margin: 30px 0px;
  font-size: 15px;
`

const IMG = styled.img`
  width: 100%;
  height: 280px;
`
