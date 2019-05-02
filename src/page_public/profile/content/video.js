import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import { Row, Col } from 'reactstrap'

import { Image } from '../../../components/forms'

import engineer from '../../../assets/img/engineer.jpg'

class MyVideo extends Component {
  render() {
    let list = [
      {
        image: engineer,
        title: 'How to setup MongoDB',
        created_at: '2 hours ago',
      },
      {
        image: engineer,
        title: 'How to make the unit test',
        created_at: '5 days ago',
      }
    ]
    let cssTitle = {fontSize: '14px', marginTop: '5px'}
    let cssTime = {fontSize: '10px', marginTop: '5px'}

    let objects = list.map((item, index) => {
      return (
        <Col md="6" key={index}>
          <Image className="user-video-img" src={item.image} />
          <div style={cssTitle}>{item.title}</div>
          <div style={cssTime}>{item.created_at}</div>
        </Col>
      )
    })
    return (
      <div>
        <h5>Video</h5>
        <Row>
          {objects}
        </Row>
      </div>
    )
  }
}

export default inject('profile')(observer(MyVideo))
