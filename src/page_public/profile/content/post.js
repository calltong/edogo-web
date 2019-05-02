import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import { Row, Col } from 'reactstrap'

import { Image } from '../../../components/forms'

import developer from '../../../assets/img/developer.jpg'

class MyPost extends Component {
  render() {
    let list = [
      {
        image: developer,
        title: 'JavaScript Essentials: Numbers and Math',
        detail: 'Essentials is a series that covers the most used and important methods',
        created_at: '2 hours ago',
      },
      {
        image: developer,
        title: 'Blockchain’s Quiet Revolution',
        detail: 'Most of us will never use the technology, but we’ll still feel its effects',
        created_at: '5 days ago',
      },
      {
        image: developer,
        title: 'JavaScript Arrow Functions: How, Why, When (and WHEN NOT) to Use',
        detail: 'In this article we’ll first review how arrow functions work, then',
        created_at: '2 weeks ago',
      }
    ]
    let cssTitle = {fontSize: '15px'}
    let cssText = {fontSize: '12px', marginTop: '5px'}
    let cssTime = {fontSize: '10px', marginTop: '5px'}
    let objects = list.map((item, index) => {
      return (
        <div key={index}>
          <Row>
            <Col md="5">
              <Image className="user-post-img" src={item.image} />
            </Col>
            <Col md="7">
              <div style={cssTitle}>{item.title}</div>
              <div style={cssText}>{item.detail}... read more</div>
              <div style={cssTime}>{item.created_at}</div>
            </Col>
          </Row>
          <hr />
        </div>
      )
    })
    return (
      <div>
        <h5>Posts</h5>
        {objects}
      </div>
    )
  }
}

export default inject('profile')(observer(MyPost))
