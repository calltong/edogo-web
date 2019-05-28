import React, { Component } from 'react'
import { observer, inject } from 'mobx-react'
import styled from 'styled-components'
import { Row, Col } from 'reactstrap'

import { Link } from '../../../components/link'
import { Image } from '../../../components/forms'

import doc from './contants'

export default class Feature extends Component {
  constructor() {
    super()
  }

  async componentDidMount() {

  }

  render() {
    let css = {
      margin: '0 auto',
      textAlign: 'center',
      paddingBottom: '15px',
    }

    let cssLink = {
      border: '0'
    }

    let cssImg = {
      width: '65px',
      hight: '65px',
      paddingBottom: '20px',
    }

    let cssTitle = {
      paddingTop: '10px',
      color: '#1a1a1a',
    }

    let list = doc.map((item, index) => {
      return (
        <Col md="2" key={index} style={css}>
            <Link style={cssLink} to="../">
              <Image style={cssImg} src={item.image} />
              <h5 style={cssTitle}>{item.name}</h5>
            </Link>
        </Col>
      )
    })

    return (
      <PAGE className="app-content">
        <Title>FEATURES</Title>

        <Row>
          {list}
        </Row>

      </PAGE>
    )
  }
}

const PAGE = styled.div`
  background-color: white;
`

const Title = styled.h3`
  color: #000000;
  text-align: center;
  margin-top: 20px;
  margin-bottom: 40px;
  hover {
    color: #000000;
  }
`
