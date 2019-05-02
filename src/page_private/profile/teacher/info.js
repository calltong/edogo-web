import React, { Component } from 'react'
import { Container } from 'reactstrap'

import Detail from './detail'
import Education from './education'
import Experience from './experience'

export default class TeacherInfo extends Component {
  render() {
    return (
      <Container>
        <Detail />
        <br />
        <Education />
        <br />
        <Experience />
      </Container>
    )
  }
}
