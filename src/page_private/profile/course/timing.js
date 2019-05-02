import React, { Component } from 'react'
import { Row, Col, Table } from 'reactstrap'

class IsCheck extends Component {
  render() {
    return (
      <td style={{textAlign: 'center'}}>
        {this.props.value}
      </td>
    )
  }
}

export default class Timing extends Component {
  onToggle(evt) {
    console.log('evt', evt.target.name)
  }

  render() {
    let cssCol = {width: '105px', textAlign: 'center'}
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
          <IsCheck
            name="mon"
            value={item.mon}
            onToggle={this.onToggle.bind(this)} />
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
        <Row>
          <Col md="12">
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
              <tbody>
              {objects}
              </tbody>
            </Table>
          </Col>
        </Row>
      </div>
    )
  }
}
