import moment from 'moment'

export const languages = [
  { value: 'English', label: 'English' },
  { value: 'Thai', label: 'Thai' },
  { value: 'Chinese', label: 'Chinese' },
  { value: 'Vietnamese', label: 'Vietnamese' },
  { value: 'Spanish', label: 'Spanish' },
]

export const rates = [
  { value: 50, label: '50' },
  { value: 100, label: '100' },
  { value: 150, label: '150' },
  { value: 200, label: '200' },
  { value: 250, label: '250' },
  { value: 300, label: '300' },
]

export const tutors = [
  { value: 'Math', label: 'Math' },
  { value: 'English', label: 'English' },
  { value: 'Software', label: 'Software' },
  { value: 'Design', label: 'Design' },
]

export const full_day = [
  { value: 'Monday', label: 'Monday' },
  { value: 'Tuesday', label: 'Tuesday' },
  { value: 'Wednesday', label: 'Wednesday' },
  { value: 'Thursday', label: 'Thursday' },
  { value: 'Friday', label: 'Friday' },
  { value: 'Saturday', label: 'Saturday' },
  { value: 'Sunday', label: 'Sunday' },
]

export const min_day = [
  { value: 'Monday', label: 'Mon' },
  { value: 'Tuesday', label: 'Tue' },
  { value: 'Wednesday', label: 'Wed' },
  { value: 'Thursday', label: 'Thu' },
  { value: 'Friday', label: 'Fri' },
  { value: 'Saturday', label: 'Sat' },
  { value: 'Sunday', label: 'Sun' },
]

export const full_month = [
  { value: 'January', label: 'January' },
  { value: 'February', label: 'February' },
  { value: 'March', label: 'March' },
  { value: 'April', label: 'April' },
  { value: 'May', label: 'May' },
  { value: 'June', label: 'June' },
  { value: 'July', label: 'July' },
  { value: 'August', label: 'August' },
  { value: 'September', label: 'September' },
  { value: 'October', label: 'October' },
  { value: 'November', label: 'November' },
  { value: 'December', label: 'December' },
]

export const full_year = []

let year = moment().year()
for (let i = year - 50; i < year; i++) {
  full_year.push({
    value: i,
    label: `${i}`,
  })
}
