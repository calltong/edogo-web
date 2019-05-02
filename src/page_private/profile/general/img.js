import React, { Component } from 'react'
import { observer, inject } from 'mobx-react'
import { Container, Row, Col } from 'reactstrap'

import { Invalid } from '../../../components/forms'
import ProfileImage from '../../../components/image/ProfileImage'
import defaultImg from '../../../assets/img/profile.png'

export class ProfileImg extends Component {
  constructor() {
    super()

    this.onImg = this.onImg.bind(this)
  }

  onImg(evt) {
    let profile = this.props.member.toJS().doc.profile

    let me = this
    let reader = new FileReader()
    reader.onload = function(event) {
      profile.image = event.target.result
      me.props.member.setProfile(profile)
    }

    let files = evt.target.files
    if (files.length >= 1) reader.readAsDataURL(evt.target.files[0]);
  }

  render() {
    let { valid = {} } = this.props
    let doc = this.props.member.toJS().info
    let profile = doc.profile

    return (
      <Container>
        <Row>
          <Col md="12">
            <ProfileImage className="profile-img" src={profile.image || defaultImg} />
          </Col>
        </Row>
        <Row>
          <Col md="12">

            <label className="btn btn-fullsize btn-s-font" style={{marginTop: '10px'}}>
              <i className="far fa-image"/> Upload
              <input
                type="file"
                accept="image/*"
                style={{display: 'none'}}
                onChange={this.onImg} />
            </label>

            <Invalid invalid={valid.image || false} text="please upload your image" />
          </Col>
        </Row>
      </Container>
    )
  }
}

export default inject('member')(observer(ProfileImg))
/*
<UploadBtn
  className="btn-fullsize profile-btn-upload"
  style={{marginTop: '15px'}}
  invalid={valid.image} />
  */
