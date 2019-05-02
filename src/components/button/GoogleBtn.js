import React, { Component } from 'react'
import GoogleLogin from 'react-google-login'
import { config } from '../../config'

export default class GoogleBtn extends Component {
  constructor() {
    super();
    this.state = {
      display: false,
    }

    this.onResp = this.onResp.bind(this)
  }

  onResp(params) {
    let { onResponse } = this.props
    if (onResponse) onResponse(params)
  }

  render() {
    let { text, className } = this.props
    return (
      <GoogleLogin
        className={`btn btn-google ${className}`}
        clientId={config.gmail.client_id}
        buttonText={`${text || ' Gmail'}`}
        onSuccess={this.onResp}
        onFailure={this.onResp} />
    )
  }
}
