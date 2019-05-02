import React, { Component } from 'react'

import Dialog from '../../components/dialog/Dialog'
import Signup from './index'

export default class SignupDialog extends Component {
  render() {
    return (
      <Dialog display={this.props.display}>
        <Signup onClose={this.props.onClose} />
      </Dialog>
    )
  }
}
