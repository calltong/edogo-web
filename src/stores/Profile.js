import BaseStore from './BaseStore'
import _ from 'lodash'
import { config } from '../config'
import { http } from '../connection/http'
import { resp } from '../utils/resp'
import { helper } from '../utils/helper'
import { error } from '../utils/error'

import constant from './constant'

export class Profile extends BaseStore {
  constructor() {
    super()
    this.observable({
      doc: _.cloneDeep(constant.member),
    })
  }

  async getDoc({ id }) {
    this.doc = _.cloneDeep(constant.member)

    let url = `${config.api.main}/v1/public/member/${id}/info`
    let res = await http.get(url)
    console.log('get doc:', res)
    error.isError(res.statusCode !== 200, { message: res.body.message })

    this.doc = res.body
  }
}

export default new Profile()
