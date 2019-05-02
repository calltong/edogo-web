import React from 'react'

export default class DateTimeBtn extends React.Component {
  render() {
    return (
      <label
        className="btn btn-datepicker"
        onClick={this.props.onClick}>
        {this.props.value} <i className="far fa-clock" />
      </label>
    )
  }
}
