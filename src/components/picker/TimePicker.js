import React from 'react'
import DatePicker from 'react-datepicker'
import moment from 'moment'

import DateTimeBtn from './DateTimeBtn'

export default class TimePicker extends React.Component {
  render() {
    let value
    if (this.props.value) value = moment(this.props.value)
    else value = moment()

    return (
      <DatePicker
        customInput={<DateTimeBtn />}
        selected={value}
        onChange={this.props.onChange}
        showTimeSelect
        showTimeSelectOnly
        timeIntervals={30}
        dateFormat="LT"
        timeCaption="Time" />
    )
  }
}
