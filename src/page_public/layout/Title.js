import React, { Component } from 'react'

import title from '../../assets/img/H1.jpg'
import { Link } from '../../components/link'
import { Btn } from '../../components/button'

export default class Title extends Component {

  render() {
    let css = {
      backgroundImage: `url(${title})`,
    }

    return (
      <div className="app-content lay-title" style={css}>
        <div className="lay-title-info">
          <div className="lt-header">Live</div>
          <div className="lt-header">Leaning Center</div>
          <div className="lt-info">We are different learning center from other website because you can learn with teacher in realtime.</div>
          <Btn className="lt-btn">Get Start</Btn>
        </div>
      </div>
    )
  }
}
