import moment from 'moment'

export class Timer {
  get() {
    return moment()
  }

  getNoMinute() {
    return moment().minute(0).second(0)
  }

  format() {
    return moment().format()
  }
}

export const timer = new Timer()
export default timer
