import React, { Component } from 'react'
import { Row, Col } from 'reactstrap'

import { Btn, CancelBtn } from '../../../components/button'
import { Link } from '../../../components/link'
import ProfileImage from '../../../components/image/ProfileImage'

export default class Content extends Component {
  render() {
    let css = {
      border: '1px solid grey',
      padding: '20px',
      borderRadius: '5px',
      marginBottom: '2px',
    }

    let cssBtn = {
      marginTop: '2px',
    }

    let item = this.props.item
    let { detail, member } = item

    let link = `../../pv/room/${item._id}`
    return (
      <div style={css}>
        <Row>
          <Col md="2">
            <ProfileImage className="booking-img" src={member.profile.image} />
          </Col>
          <Col md="8">
            <p style={{fontWeight: 'bold'}}>{detail.name}</p>
            <p style={{fontSize: '14px'}}>Date: 26 Sep 2018 Time: 15.00 pm to 17.00 pm</p>
          </Col>
          <Col md="2">
            <Link className="btn-m-size btn-s-font" to={link}>
              Start
            </Link>
            <CancelBtn className="btn-m-size btn-s-font" style={cssBtn} />
          </Col>
        </Row>
      </div>
    )
  }
}
