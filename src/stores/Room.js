import BaseStore from './BaseStore'
import _ from 'lodash'
// import { config } from '../config'
// import { resp } from '../utils/resp'
// import { http } from '../connection/http'
// import { helper } from '../utils/helper'

const original = {
  id: '',
  profile: {
    name: '',
    email: '',
    phone: '',
  },
  calendar: {
    booking: [],
    avaliable: [],
  },
  teacher: {
    skill: [],
    language: [],
    cost: '',
    cv: {},
  },
  payment: {},
}

export class Room extends BaseStore {
  constructor() {
    super()
    this.observable({
      menu: {
        menu: {
          selected: '',
        },
      },
      user: _.cloneDeep(original),
    })
  }

  reset() {
    this.user = _.cloneDeep(original)
  }
}

export default new Room()
