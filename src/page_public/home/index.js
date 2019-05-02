import React, { Component } from 'react'

import Title from '../layout/Title'
import BrowseCourse from '../layout/BrowseCourse'
import Category from '../layout/Category'

export default class Home extends Component {
  render() {
    return (
      <div>
        <Title />
        <BrowseCourse />
        <Category />
      </div>
    )
  }
}
