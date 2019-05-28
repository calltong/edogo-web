import React, { Component } from 'react'

export default class SaveError extends Component {
  render() {
    let { message } = this.props

      return (
        <div>
          <br />
          <p style={{color: 'red'}}>* {message}</p>
        </div>
      )
    }
}
