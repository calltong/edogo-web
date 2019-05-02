import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import { Table } from 'reactstrap'

class IsCheck extends Component {
  render() {
    if (this.props.value) {
      return (
        <td style={{textAlign: 'center'}}><i className="fas fa-check" style={{color: 'green'}} /></td>
      )
    } else {
      return (
        <td />
      )
    }
  }
}

class MyTiming extends Component {
  render() {
    let cssCol = {width: '60px', textAlign: 'center'}
    let list = [
      {
        name: 'Pre 12pm',
        mon: false,
        tue: false,
        wed: false,
        thu: true,
        fri: true,
        sat: false,
        sun: true,
      },
      {
        name: '12 - 5pm',
        mon: false,
        tue: false,
        wed: false,
        thu: false,
        fri: true,
        sat: false,
        sun: true,
      },
      {
        name: 'after 12pm',
        mon: true,
        tue: false,
        wed: false,
        thu: false,
        fri: true,
        sat: false,
        sun: true,
      }
    ]

    let objects = list.map((item, index) => {
      return (
        <tr key={index}>
          <th scope="row" style={{textAlign: 'right'}}>{item.name}</th>
          <IsCheck value={item.mon} />
          <IsCheck value={item.tue} />
          <IsCheck value={item.wed} />
          <IsCheck value={item.thu} />
          <IsCheck value={item.fri} />
          <IsCheck value={item.sat} />
          <IsCheck value={item.sun} />
        </tr>
      )
    })
    return (
      <div>
        <h5>Available</h5>
        <Table bordered>
          <thead>
            <tr>
              <th />
              <th style={cssCol}>Mon</th>
              <th style={cssCol}>Tue</th>
              <th style={cssCol}>Wed</th>
              <th style={cssCol}>Thu</th>
              <th style={cssCol}>Fri</th>
              <th style={cssCol}>Sat</th>
              <th style={cssCol}>Sun</th>
            </tr>
          </thead>
          {objects}
        </Table>
      </div>
    )
  }
}

export default inject('profile')(observer(MyTiming))
