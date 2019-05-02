import BaseStore from './BaseStore'
import _ from 'lodash'
import { config } from '../config'
import { http } from '../connection/http'

export class Category extends BaseStore {
  constructor() {
    super()
    this.observable({
      status: {
        err: undefined,
        loading: false,
      },
      doc: {},
      list: [],
    })
  }

  setStatus({ err, loading = false }) {
    this.status = {
      err,
      loading,
    }
  }

  async getList() {
    let err
    try {
      this.setStatus({loading: true})
      this.list = []

      let url = `${config.api.content}/v1/category/list`
      let res = await http.get(url)
      if (res.statusCode === 200) {
        let data = res.body.data
        this.list = data
        this.setStatus({loading: false})
        return { data }
      }

      err = res.body.message
    } catch (e) {
      err = e.message
    }

    this.setStatus({err, loading: false})
    return { err }
  }
}

export default new Category()
