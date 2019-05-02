import BaseStore from './BaseStore'
import _ from 'lodash'
import { config } from '../config'
import { resp } from '../utils/resp'
import { http } from '../connection/http'
import member from './Member'

const unknow = [
  { title: 'Select User Type', value: 'set_user_type' },
]

const student = [
  { title: 'Profile', value: 'profile' },
  { title: 'Complete', value: 'complete' },
]

const teacher = [
  { title: 'Profile', value: 'profile' },
  { title: 'Teacher', value: 'teacher' },
  { title: 'Courses', value: 'course' },
  { title: 'Complete', value: 'complete' },
]

const origin = {
  type: '',
  process: unknow,
  step: 'set_user_type',
  message: '',
}

const origin_user = {
  status: '',
  created_at: undefined,
  updated_at: undefined,
  profile: {
    image: '',
    name: '',
    nickname: '',
    birthday: '',
    email: '',
    phone: '',
  },
  teacher: {
    rate: undefined,
    about: '',
    lang_list: [],
    tutor_list: [],
    education_list: [],
    experience_list: [],
  },
}

export class Register extends BaseStore {
  constructor() {
    super()
    this.observable({
      data: _.cloneDeep(origin),
      user: _.cloneDeep(origin_user),
      checking: {
        status: '',
        message: '',
      }
    })
  }

  async checkRegister({ id, code }) {
    try {
      this.checking = {
        status: 'waiting',
        message: '',
      }

      let url = `${config.api.content}/v1/register/check/signup/${id}/${code}`
      let res = await http.get(url)
      console.log('register:', res)
      if (res.statusCode !== 200) {
        let msg = res.body.message || 'server is down'
        this.checking = {
          status: 'error',
          message: msg,
        }
        return { err: msg }
      }


      let data = res.body.data
      this.checking = {
        status: 'completed',
        message: '',
      }

      console.log('check signup:', data)
      let user = data.user
      await member.setSignin({ token: data.token, id: user._id , user: user, profile: user.profile })
      return { data }
    } catch (e) {
      return resp.catcher(e)
    }
  }

  setType(type) {
    let list = unknow
    if (type === 'student') list = student
    else if (type === 'teacher') list = teacher

    this.data = {
      type,
      process: list,
      step: 'profile',
    }
  }

  back() {
    let data = this.toJS().data
    let index = data.process.findIndex((item) => {
      return item.value === data.step
    })

    if (index > 0) {
      let item = data.process[index - 1]
      let step = item.value
      this.data.step = step
    } else {
      this.data = {
        type: '',
        process: unknow,
        step: 'set_user_type',
      }
    }
  }

  next() {
    let data = this.toJS().data
    let index = data.process.findIndex((item) => {
      return item.value === data.step
    })

    if (index >= 0 && index + 1 < data.process.length) {
      let item = data.process[index + 1]
      let step = item.value
      this.data.step = step
    }
  }

  reset() {
    this.data = _.cloneDeep(origin)
  }
}

export default new Register()
