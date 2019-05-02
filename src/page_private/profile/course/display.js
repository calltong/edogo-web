import React, { Component } from 'react'

import { SaveBtn } from '../../../components/button'

import SesionList from './sessionList'

export default class Display extends Component {
  render() {
    return (
      <div>
        <SesionList />
        <br />
        <div style={{ textAlign: 'right' }}>
          <SaveBtn className="btn-m-size btn-m-font" />
        </div>
      </div>
    )
  }
}
