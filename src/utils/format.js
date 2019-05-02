import numeral from 'numeral'
import moment from 'moment'

export class Format {
  isNull(val) {
    if (val === undefined || val === null || val === '') return true
    else return false
  }

  toDigi(val) {
    if (this.isNull(val) || isNaN(+val)) return '0'
    else return numeral(val).format('0,0')
  }

  toMoney(val) {
    if (this.isNull(val) || isNaN(+val)) return '0'
    else return numeral(val).format('0,0.00')
  }

  toText(val) {
    if (this.isNull(val)) return '-'
    else return val
  }

  toFullDT(val) {
    if (this.isNull(val)) return '-'
    else return moment(val).format('DD/MM/YYYY HH:mm')
  }

  toShortDay(val) {
    if (this.isNull(val)) return '-'
    else if (typeof val === 'string') return val.slice(0, 3)
    else return moment(val).format('DD')
  }

  toShortMonth(val) {
    if (this.isNull(val)) return '-'
    else if (typeof val === 'string') return val.slice(0, 3)
    else return moment(val).format('MM')
  }

  toDate(val) {
    if (this.isNull(val)) return '-'
    else return moment(val).format('DD/MM/YYYY')
  }

  toTime(val) {
    if (this.isNull(val)) return '-'
    else return moment(val).format('HH:mm')
  }
}

export const format = new Format()
export default format
