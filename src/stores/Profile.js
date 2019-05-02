import BaseStore from './BaseStore'
import _ from 'lodash'
import { config } from '../config'
import { http } from '../connection/http'
import { resp } from '../utils/resp'
import { helper } from '../utils/helper'

import constant from './constant'

export class Profile extends BaseStore {
  constructor() {
    super()
    this.observable({
      doc: _.cloneDeep(constant.member),
    })
  }

  async getDoc({ id }) {
    try {
      this.doc = _.cloneDeep(constant.member)

      let url = `${config.api.content}/v1/member/info/${id}`
      let res = await http.get(url)
      console.log('get doc:', res)
      if (res.statusCode !== 200) {
        let msg = res.body.message
        return { err: msg }
      }

      let data = res.body.data
      this.doc = data
      return  { data }
    } catch (e) {
      return { err: 'something wrong'}
    }
  }
}

export default new Profile()
