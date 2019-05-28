import BaseStore from './BaseStore'
import _ from 'lodash'

import { config } from '../config'
import { http } from '../connection/http'
import { error } from '../utils/error'
import { storage } from '../utils/storage'

const origin_user = {
  id: '',
  register_by: '',
  profile: {
    name: '',
    nickname: '',
    image_url: '',
    email: '',
  },
  gmail: {
    token: '',
    google_id: '',
  },
}

const origin_info = {
  id: '',
  register_by: '',
  profile: {
    name: '',
    nickname: '',
    image_url: '',
    email: '',
  },
  teacher: {
    rate: undefined,
    about: '',
    lang_list: [],
    tutor_list: [],
    education_list: [],
    experience_list: [],
  },
  created_at: undefined,
  updated_at: undefined,
}

export class Member extends BaseStore {
  constructor() {
    super()
    this.observable({
      token_checking: false,
      user: _.cloneDeep(origin_user),
      info: _.cloneDeep(origin_info),
    })
  }

  reset() {
    this.user = _.cloneDeep(origin_user)
  }

  async verifyToken() {
    let auth = storage.load('authentication')
    if (auth && auth.token) {
      await http.setToken(auth.token)

      await this.getProfile()
    }
  }

  saveToStorage({ token }) {
    let auth = {
      token,
    }
    storage.save('authentication', auth)
  }

  removeStorage() {
    storage.save('authentication', {})
  }

  async registerByGmail(params = {}) {
    let { accessToken, profileObj } = params
    let { googleId, email, name, givenName, familyName, imageUrl } = profileObj
    let json = {
      given_name: givenName || name,
      family_name: familyName || name,
      google_id: googleId,
      email,
      image_url: imageUrl,
    }
    let url = `${config.api.main}/v1/public/member/signup/gmail`
    let res = await http.post(url, { json })
    let option = {
      gmail: {
        token: accessToken,
        google_id: googleId,
      }
    }
    this.setLogin('gmail', res, option)
  }

  async registerByEmail(params = {}) {
    let { email, password, name } = params
    let json = {
      name,
      email,
      password,
    }
    let url = `${config.api.main}/v1/public/member/signup/email`
    let res = await http.post(url, { json })
    if (res.statusCode !== 200) {
      error.lunch({ message: res.body.message })
    }
  }

  async loginByGmail(params = {}) {
    let { accessToken, profileObj } = params
    let { googleId, email, name, givenName, familyName, imageUrl } = profileObj
    let json = {
      google_id: googleId,
      email,
    }
    let url = `${config.api.main}/v1/public/member/login/gmail`
    let res = await http.post(url, { json })
    let option = {
      gmail: {
        token: accessToken,
        google_id: googleId,
      }
    }
    this.setLogin('gmail', res, option)
  }

  async loginByEmail(params = {}) {
    let { email, password } = params
    let json = {
      email,
      password,
    }
    let url = `${config.api.main}/v1/public/member/login/email`
    let res = await http.post(url, { json })
    let option = { gmail: {} }
    this.setLogin('gmail', res, option)
  }

  setLogin(type, res, option = {}) {
    if (res.statusCode === 200) {
      let { id, register_by, profile, token } = res.body
      this.user = {
        id,
        register_by,
        profile,
        gmail: option.gmail,
      }
      http.setToken(token)
      this.saveToStorage({ token })
      return undefined
    } else {
      error.lunch({ message: res.body.message })
    }
  }

  isLogin() {
    return this.user.id !== ''
  }

  logout() {
    this.reset()
    this.removeStorage()
  }

  async getProfile() {
    let url = `${config.api.main}/v1/member/profile`
    let res = await http.get(url, { token: true })
    if (res.statusCode === 200) {
      let { id, register_by, profile } = res.body
      this.user = {
        id,
        register_by,
        profile,
      }
    } else {
      error.lunch({ message: res.body.message })
    }
  }

  async getInfo() {
    let url = `${config.api.main}/v1/member/info`
    let res = await http.get(url, { token: true })
    if (res.statusCode === 200) {
      this.info = res.body
    } else {
      error.lunch({ message: res.body.message })
    }
  }

  async setInfo(val) {
    this.info = val
  }

  async save() {
    let json = this.toJS().info
    let url = `${config.api.main}/v1/member/update`
    let res = await http.post(url, { json, token: true })
    if (res.statusCode === 200) {
      let { id, register_by, profile } = json
      this.user = {
        id,
        register_by,
        profile,
      }
    } else {
      error.lunch({ message: res.body.message })
    }
  }

  async updatePassword({ code, email, password }) {
    let json = {
      email,
      password,
    }
    let url = `${config.api.main}/v1/public/member/password/${code}`
    let res = await http.post(url, { json })
    if (res.statusCode !== 200) {
      error.lunch({ message: res.body.message })
    }

    let option = { gmail: {} }
    this.setLogin('email', res, option)
  }
}

export default new Member()
