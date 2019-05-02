import React, { Component } from 'react'

export default class ProfileImage extends Component {
  render() {
    let css = {margin: 'auto', width: '100%'}
    return (
      <div style={css}>
        <img className={`img-center ${this.props.className}`} alt="" src={this.props.src} />
      </div>
    )
  }
}
