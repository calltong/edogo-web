import BaseStore from './BaseStore'
//import _ from 'lodash'
import { config } from '../config'
import { http } from '../connection/http'
import { helper } from '../utils/helper'

export class Setting extends BaseStore {
  constructor() {
    super()
    this.observable({
      signup: {
        status: '',
        message: '',
      },
    })
  }

  resetSignup() {
    this.signup = {
      status: '',
      message: '',
    }
  }

  async register({ email, password }) {
    let status = 'completed'
    let message
    try {
      let data = {
        email,
        password,
      }

      let url = `${config.api.content}/v1/register/signup`

      let res = await http.post(url, { json: data })
      console.log('register res:', res)
      if (res.statusCode !== 200) {
        status = 'error'
        message =  res.body.message
      }

    } catch (e) {
      status = 'error'
      message =  e.message
    }

    this.signup = {
      status,
      message,
    }
  }

  /*
  async setPassword({ id, code, password, retry }) {
    try {
      this.check.member = {
        mode: 'save',
        status: '',
        message: '',
      }
      let url = `${config.api.content}/v1/register/set/password/${id}/${code}`
      console.log('url', url)
      let res = await http.put(url, { json: { password, retry }})
      if (res.statusCode !== 200) return { err: res.body.message }

      return {}
    } catch (e) {
      return { err: e.message }
    }
  }

  async resetPassword({ email }) {
    try {
      this.reset.password.status = ''
      let url = `${config.api.content}/v1/register/reset/password/${email}`
      console.log('url', url)
      let res = await http.put(url)
      if (res.statusCode !== 200) return { err: res.body.message }
      return {}
    } catch (e) {
      return { err: e.message }
    }
  }
  */
}

export default new Setting()
