import BaseStore from './BaseStore'
import _ from 'lodash'

import { config } from '../config'
import { helper } from '../utils/helper'
import { timer } from '../utils/timer'
import { error } from '../utils/error'
import { http } from '../connection/http'

import { min_day } from '../constant'

const days = min_day.map(item => { return item.value })

const origin = {
  _id: undefined,
  status: 'ready',
  created_at: undefined,
  updated_at: undefined,
  owner: undefined,
  student_list: [],
  detail: {
    name: '',
    image: '',
    price: 100,
    description: '',
    opening_list: [],
    keyword_list: [],
  }
}

export class Course extends BaseStore {
  constructor() {
    super()
    this.observable({
      popular_course: [],
      owner: {
        data: _.cloneDeep(origin),
        list: [],
      },
      category: {
        list: [],
      }
    })
  }

  reset() {
    this.owner.data = _.cloneDeep(origin)
  }

  async getPopularCourse(params = {}) {
    let url = `${config.api.main}/v1/public/course/popular`
    let res = await http.get(url)
    error.isError(res.statusCode !== 200, { message: res.body.message })

    this.popular_course = res.body || []
  }

  async getList(params = {}) {
    this.owner.list = []
    let { category } = params
    let url = `${config.api.main}/v1/course`
    if (category) url += `?category=${category}`

    let res = await http.get(url, { token: true })
    error.isError(res.statusCode !== 200, { message: res.body.message })

    this.owner.list = res.body
  }

  async getDoc(id) {
    await this.reset()

    let url = `${config.api.main}/v1/course/${id}`

    let res = await http.get(url, { token: true })
    error.isError(res.statusCode !== 200, { message: res.body.message })

    this.owner.data = res.body
  }

  setDoc({ data }) {
    this.owner.data = data
  }

  async validate() {
    /*
    let data = this.toJS().owner.data

    let detail = data.detail
    let checkList = ['name', 'image', 'price', 'description']

    let res = await helper.checkValue({ item: detail, valid, list: checkList })
    let invalid = res.invalid
    valid = res.data

    if (detail.opening_list.length === 0) {
      valid.opening = true
      invalid = true
    } else {
      let index = 0
      for(let it of detail.opening_list) {
        if (it.day_list.length === 0) {
          valid.day_list.push({ index })
          invalid = true
        }
        index++
      }
    }

    valid.invalid = invalid
    this.owner.valid = valid
    return valid
    */
  }

  async save() {
    let doc = this.toJS().owner.data

    let url = `${config.api.main}/v1/course`

    if (doc._id === undefined) url += '/create'
    else url += `/update/${doc._id}`

    let res = await http.post(url, { token: true, json: doc })
    error.isError(res.statusCode !== 200, { message: res.body.message })

    this.owner.data._id = res.body._id
  }
}

export default new Course()
