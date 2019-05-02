import React, {Component} from 'react'

export default class Image extends Component {
  render() {
    let style = this.props.style || {}

    return (
      <img alt=""
        className={this.props.className}
        style={style}
        src={this.props.src || this.props.placeholder}
        width={this.props.width}
        height={this.props.height}
        onClick={this.props.onClick}
      />
    )
  }
}
