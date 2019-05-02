import React, { Component } from 'react'

export default class AccessDenied extends Component {
  render() {
    return (
      <div className="container">
        <div className="row" style={{ textAlign: 'center', marginTop: '15%' }}>
          <div>
            <h1>Oops!</h1>
            <h2>403 Access Denied</h2>
            <div>Sorry, an error has occured, You don't have permission!</div>
            <div>please login</div>
          </div>
        </div>
      </div>
    )
  }
}
