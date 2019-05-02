import BaseStore from './BaseStore'
import _ from 'lodash'

import { config } from '../config'
import { helper } from '../utils/helper'
import { timer } from '../utils/timer'
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

const originValid = {
  invalid: false,
  name: false,
  image: false,
  price: false,
  description: false,
  opening: false,
  day_list: [],
}

export class Course extends BaseStore {
  constructor() {
    super()
    this.observable({
      owner: {
        mode: '',
        index: 0,
        data: _.cloneDeep(origin),
        valid: _.cloneDeep(originValid),
        list: [],
      },
      category: {
        list: [],
      }
    })
  }

  async getList(params = {}) {
    try {
      this.owner.mode = 'display'
      this.owner.list = []
      let { category } = params

      let url = `${config.api.content}/v1/course/list`
      if (category) url += `?category=${category}`

      let res = await http.get(url)
      if (res.statusCode !== 200) {
        return { err: res.body.message }
      }

      let data = res.body.data
      this.owner.list = data
      return { data }
    } catch (e) {
      return { err: e.message }
    }
  }

  setMode({ mode, index }) {
    if (mode === 'edit' && index >= 0) {
      this.owner.index = index
      let doc = this.toJS().owner.list[index]

      this.owner.data = _.cloneDeep(doc)
    } else if (mode === 'create') {
      this.owner.data = _.cloneDeep(origin)
    }

    this.owner.mode = mode
  }

  setData({ data }) {
    this.owner.data = data
  }

  addDuration() {
    this.owner.data.detail.opening_list.push({
      start_at: timer.getNoMinute(),
      end_at: timer.getNoMinute().add(1, 'hours'),
      day_list: _.cloneDeep(days),
    })
  }

  async validate() {
    let data = this.toJS().owner.data
    let valid = _.cloneDeep(originValid)

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
  }

  async confirmForm() {
    try {
      let doc = this.toJS().owner
      let mode = doc.mode
      let data = doc.data

      let url = `${config.api.content}/v1/course`

      if (mode === 'create') url += '/create'
      else if (mode === 'edit') url += `/update/${data._id}`

      let res = await http.post(url, { token: true, json: data })
      if (res.statusCode !== 200) {
        return { err: res.body.message }
      }

      data = res.body.data
      if (mode === 'create') {
        doc.list.push(data)
      } else if (mode === 'edit') {
        doc.list[doc.index] = data
      }

      doc.mode = 'display'
      this.owner = doc
      return {}
    } catch (e) {
      return { err: e.message }
    }
  }
}

export default new Course()
