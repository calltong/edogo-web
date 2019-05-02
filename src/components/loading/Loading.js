import React from 'react'
import { PulseLoader } from 'halogenium'

export default class Loading extends React.Component {
  render() {
    let css = 'loading'
    let loading = this.props.loading || false
    if (this.props.dialog) {
      css = 'loading-dialog'
    }

    return (
      <PulseLoader className={css}
        loading={loading}
        color="#26548F"
        size="36px"
        margin="4px" />
    )
  }
}
