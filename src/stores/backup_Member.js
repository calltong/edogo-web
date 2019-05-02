import BaseStore from './BaseStore'
import _ from 'lodash'

import { config } from '../config'
import { http } from '../connection/http'
import { resp } from '../utils/resp'
import { helper } from '../utils/helper'
import { storage } from '../utils/storage'

import constant from './constant'

const profileValid = {
  image: false,
  name: false,
  nickname: false,
  email: false,
  phone: false,
}

const teacherValid = {
  rate: false,
  about: false,
  languages: false,
  tutor: false,
}

export class Member extends BaseStore {
  constructor() {
    super()
    this.observable({
      signin: {
        status: '',
        message: '',
      },
      profile: _.cloneDeep(constant.member.profile),
      doc: _.cloneDeep(constant.member),
      valid: {
        profile: _.cloneDeep(profileValid),
        teacher: _.cloneDeep(teacherValid),
      },
      id: '',
    })
    this.init()
  }

  init() {
    this.loadFromStorage()
  }

  async reset() {
    await http.setToken(undefined)
    this.id = ''
    this.profile = _.cloneDeep(constant.member.profile)
    this.user = _.cloneDeep(constant.member)
    this.removeStorage()
  }

  isLogin() {
    return this.id !== ''
  }

  async login({ email, password }) {
    try {
      this.reset()
      let url = `${config.api.content}/v1/member/login`
      let json = {
        email,
        password,
      }
      let res = await http.post(url, { json })
      if (res.statusCode !== 200) {
        this.signin = {
          status: 'error',
          message: res.body.message,
        }
        return false
      }

      let data = res.body.data
      await this.setSignin({ token: data.token, id: data._id, profile: data.profile })
      return true
    } catch (e) {
      this.signin = {
        status: 'error',
        message: 'something wrong. please try again',
      }
      return false
    }
  }

  async logout() {
    this.reset()
  }

  async setSignin({ token, id, user, profile }) {
    if (token) {
      await http.setToken(token)
      this.saveToStorage({ token })
    }

    if (id) this.id = id

    if (user) this.doc = user

    if (profile) this.profile = profile
  }

  setType(type) {
    this.doc.profile.type = type
    this.profile.type = type
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

  async loadFromStorage() {
    let auth = storage.load('authentication')
    if (auth && auth.token) {
      await http.setToken(auth.token)
      this.getMemberProfile()
    }
  }

  setProfile(val) {
    this.doc.profile = val
  }

  setTeacher(val) {
    this.doc.teacher = val
  }

  async validateProfile() {
    let doc = this.toJS().doc
    let valid = _.cloneDeep(profileValid)
    let checkList = ['name', 'nickname']

    let res = await helper.checkValue({ item: doc.profile, valid, list: checkList })
    this.valid.profile = res.data
    return res.invalid
  }

  async validateTeacher() {
    let doc = this.toJS().doc
    let valid = _.cloneDeep(teacherValid)
    let checkList = ['rate', 'about']

    let res = await helper.checkValue({ item: doc.teacher, valid, list: checkList })
    valid = res.data
    valid.languages = doc.teacher.lang_list.length === 0
    valid.tutor = doc.teacher.tutor_list.length === 0

    this.valid.teacher = valid
    return res.invalid
  }

  async save() {
    try {
      let doc = this.toJS().doc

      let url = `${config.api.content}/v1/member/update`
      let res = await http.post(url, { token: true, json: doc })
      if (res.statusCode !== 200) {
        let msg = res.body.message
        return { err: msg }
      }

      return res
    } catch (e) {
      return resp.catcher(e)
    }
  }

  async getMemberInfo() {
    try {
      this.doc = _.cloneDeep(constant.member)

      let url = `${config.api.content}/v1/member/info`
      let res = await http.get(url, { token: true })
      if (res.statusCode !== 200) {
        let msg = res.body.message
        return { err: msg }
      }

      let data = res.body.data

      this.id = data._id
      this.profile = data.profile
      this.doc = data
      return res
    } catch (e) {
      return resp.catcher(e)
    }
  }

  async getMemberProfile() {
    try {
      this.doc = _.cloneDeep(constant.member)
      if (http.haveToken() === false) return { err: 'token is undefined'}

      let url = `${config.api.content}/v1/member/profile`
      let res = await http.get(url, { token: true })
      if (res.statusCode !== 200) {
        let msg = res.body.message
        return { err: msg }
      }

      let data = res.body.data

      this.id = data._id
      this.profile = data.profile
      return res
    } catch (e) {
      return resp.catcher(e)
    }
  }
}

export default new Member()
