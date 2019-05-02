import React, { Component } from 'react'
//import {
//  Container, Row, Col,
//  Form, FormGroup, Label, Input } from 'reactstrap';

import { SaveBtn } from '../../components/button'


export default class Invitation extends Component {
  render() {
    return (
      <div>
        <div style={{ textAlign: 'right' }}>
          <SaveBtn className="btn-medium" />
        </div>
      </div>
    )
  }
}
