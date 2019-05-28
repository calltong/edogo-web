import React, { Component } from 'react'

import Title from '../layout/Title'
import Feature from '../layout/Feature'
import PopularCourse from '../layout/PopularCourse'

export default class Home extends Component {
  render() {
    return (
      <div>
        <Title />
        <Feature />
        <PopularCourse />
      </div>
    )
  }
}
