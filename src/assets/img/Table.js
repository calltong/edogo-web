import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import { Table as TableReact } from 'reactstrap'

export class Table extends Component {
  constructor() {
    super()
    this.state = {
      loading: false,
      name: '',
    }
    this.onFind = this.onFind.bind(this)
  }

  chStatus(val) {
    let value = this.props.value
    value.status = val.value
    this.props.onUpdate(value)
  }

  async onFind() {
    await this.props.stock.getList()
  }

  render() {

    return (
      <div style={{padding: '15px'}}>
        <TableReact responsive>
          <thead>
            <tr>
              <th>#</th>
              <th>Table heading</th>
              <th>Table heading</th>
              <th>Table heading</th>
              <th>Table heading</th>
              <th>Table heading</th>
              <th>Table heading</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th scope="row">1</th>
              <td>Table cell</td>
              <td>Table cell</td>
              <td>Table cell</td>
              <td>Table cell</td>
              <td>Table cell</td>
              <td>Table cell</td>
            </tr>
          </tbody>
        </TableReact>
      </div>
    )
  }
}

export default inject('stock')(observer(Table))
