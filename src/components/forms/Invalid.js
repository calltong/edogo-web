import React, { Component } from 'react'

export default class Invalid extends Component {
  render() {
    if (this.props.invalid) {
      return <p className="text-invalid">{this.props.text || ''}</p>
    } else {
      return <div />
    }
  }
}
