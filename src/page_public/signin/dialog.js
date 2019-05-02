import React, { Component } from 'react'

import Dialog from '../../components/dialog/Dialog'
import Signin from './index'

export default class SigninDialog extends Component {
  render() {
    return (
      <Dialog display={this.props.display}>
        <Signin onClose={this.props.onClose} />
      </Dialog>
    )
  }
}
