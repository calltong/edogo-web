import BaseStore from './BaseStore'
//import _ from 'lodash'
import { config } from '../config'
import { http } from '../connection/http'
import { helper } from '../utils/helper'
import { error } from '../utils/error'

export class Reset extends BaseStore {
  constructor() {
    super()
    this.observable({
      register: {},
    })
  }

  async password({ email }) {
    let json = {
      email,
    }
    let url = `${config.api.main}/v1/public/reset/password`
    let res = await http.post(url, { json })
    console.log('reset password res:', res)
    if (res.statusCode !== 200) {
      error.lunch({ message: res.body.message })
    }
  }
}

export default new Reset()
