import React, { Component } from 'react'

import Filter from './Filter'
import Table from './Table'

export default class Stock extends Component {
  render() {

    return (
      <div>
        <Filter />
        <Table />
      </div>
    )
  }
}
