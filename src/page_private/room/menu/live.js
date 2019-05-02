import React, { Component } from 'react'
// import { Container, Row, Col } from 'reactstrap'

import ac01 from '../../../assets/img/ac01.jpg'
import ac02 from '../../../assets/img/ac02.jpg'

import Person from './person'

export default class LiveMenu extends Component {
  render() {
    let d1 = {
      status: 'online',
      name: 'Tong+',
      img: ac01,
    }

    let d2 = {
      status: 'offline',
      name: 'You',
      img: ac02,
    }
    return (
      <div>
        <div>
          <Person data={d1} />
        </div>
        <div>
          <Person data={d2} />
        </div>
      </div>
    )
  }
}
