import BaseStore from './BaseStore'
//import _ from 'lodash'
import { config } from '../config'
import { http } from '../connection/http'
import { helper } from '../utils/helper'
import { error } from '../utils/error'

export class Verify extends BaseStore {
  constructor() {
    super()
    this.observable({
      register: {},
      password: {
        email: '',
      },
    })
  }

  async confirmRegister({ id, code }) {
    let json = {
      id,
      code,
    }
    let url = `${config.api.main}/v1/public/verify/register`
    let res = await http.post(url, { json })
    console.log('verify register res:', res)
    if (res.statusCode !== 200) {
      error.lunch({ message: res.body.message })
    }
  }

  async confirmPassword({ id, code }) {
    let json = {
      id,
      code,
    }
    let url = `${config.api.main}/v1/public/verify/password`
    let res = await http.post(url, { json })
    console.log('verify password res:', res)
    if (res.statusCode !== 200) {
      error.lunch({ message: res.body.message })
    }

    this.password.email = res.body.email
  }
}

export default new Verify()
