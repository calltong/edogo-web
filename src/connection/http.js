import validator from 'validator'
import request from 'then-request'
import { error } from '../utils/error'

const opt = { authorization: false }

export class Http {
  constructor() {
    this.httpReq = request
    this.token = undefined
  }

  setToken(auth) {
    this.token = auth
  }

  haveToken() {
    return this.token !== undefined && this.token !== ''
  }

  setOptions(options) {
    let setting = {
      headers: {},
      json: options.json,
    }

    if (options.token && this.token) setting.headers['authorization'] = `Bearer ${this.token}`

    return setting
  }

  parseBody(res) {
    let isJson = validator.isJSON(res.body)
    if (isJson) res.body = JSON.parse(res.body)
    else if (res.statusCode === 0) res.body = { message: 'server is down'}
    else res.body = {}

    error.handle(res)
    return res
  }

  async get(url, options = opt) {
    const config = this.setOptions(options)
    let response = await this.httpReq('GET', url, config)
    return this.parseBody(response)
  }

  async post(url, options = opt) {
    const config = this.setOptions(options)
    let res = await this.httpReq('POST', url, config)
    return this.parseBody(res)
  }

  async put(url, options = opt) {
    const config = this.setOptions(options)
    let res = await this.httpReq('PUT', url, config)
    return this.parseBody(res)
  }

  async patch(url, options = opt) {
    const config = this.setOptions(options)
    let res = await this.httpReq('PATCH', url, config)
    return this.parseBody(res)
  }

  async delete(url, options = opt) {
    const config = this.setOptions(options)
    let res = await this.httpReq('DELETE', url, config)
    return this.parseBody(res)
  }
}

export const http = new Http()
export default http
