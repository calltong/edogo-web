import React, { Component } from 'react'
import { Badge } from 'reactstrap'
import { Link } from 'react-router-dom'

export default class Completed extends Component {

  render() {
    let text = { textAlign: 'center' }
    let bade = { marginLeft: '10px', padding: '6px' }
    let id = this.props.id

    return (
      <div className="layout-form">
        <h2 style={text}>Sign up Completed</h2>
        <br />
        <h4 style={text}>Thank you for sign up with Edugo</h4>
        <br />
        <p style={text}><i className="fas fa-check-circle layout-form-icon text-success" /></p>
        <br />

        <p style={text}>
          go to register page <Link to={this.props.link}>click here</Link> In
          <Badge className="text-countdown" style={bade}>{this.props.counter}</Badge>
        </p>

      </div>
    )
  }
}
