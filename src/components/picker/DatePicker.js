import React from 'react'
import RDatePicker from 'react-datepicker'
import moment from 'moment'

import DateTimeBtn from './DateTimeBtn'

export default class DatePicker extends React.Component {
  render() {
    let value
    if (this.props.value) value = moment(this.props.value)
    else value = moment()

    return (
      <RDatePicker
        customInput={<DateTimeBtn />}
        selected={value}
        onChange={this.props.onChange}
        dateFormat="DD/MM/YYYY" />
    )
  }
}
