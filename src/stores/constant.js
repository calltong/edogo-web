const profile_origin = {
  type: '',
  image: '',
  name: '',
  surname: '',
  nickname: '',
  birthday: '',
  email: '',
  phone: '',
}

const member = {
  id: '',
  profile: profile_origin,
  teacher: {
    rate: undefined,
    about: '',
    lang_list: [],
    tutor_list: [],
    education_list: [],
    experience_list: [],
  },
}

export default {
  member,
}
