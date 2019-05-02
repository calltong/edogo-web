import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import { Container, Row, Col } from 'reactstrap'

import { Btn, SaveBtn } from '../../components/button'

import ProfileImage from '../../components/image/ProfileImage'
import profile from '../../assets/img/ac03.jpg'
import { helper } from '../../utils/helper'

export class Title extends Component {
  render() {
    let doc = this.props.profile.toJS().doc
    let profile = doc.profile
    let teacher = doc.teacher

    console.log('detail:', doc)
    let detail = []
    let index = 0
    if (helper.isValue(profile.nickname)) {
      detail.push(<div className="detail" key={index++}>Nickname: {profile.nickname}</div>)
    }

    if (teacher.lang_list.length > 0) {
      let lang = ''
      for (let item of teacher.lang_list) lang += `${item}, `

      lang = lang.slice(0, -2)
      detail.push(<div className="detail" key={index++}>Language: {lang}</div>)
    }

    return (
      <Container className="pro-user-title">
        <Row>
          <Col md="2">
            <ProfileImage className="pro-user-title-img " src={profile.image || profile} />
          </Col>
          <Col md="7">
            <div className="pro-user-title-detail">
              <h4>{profile.name} {profile.surname}</h4>
              {detail}
              <div className="detail">Rate: {profile.rate || '-'}THB/Hour</div>
            </div>
          </Col>
          <Col md="2">
            <Btn
              className="btn-fullsize"
              style={{marginTop: '2px'}}>
              Message
            </Btn>
          </Col>
        </Row>
      </Container>
    )
  }
}

export default inject('profile')(observer(Title))
