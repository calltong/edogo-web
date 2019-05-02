
export class Response {
  process(res = {}) {
    if (res.statusCode !== 200 && res.statusCode !== 204) {
      let msg = ''
      if (res.statusCode === 404) msg = 'Service is down, please try again.'
      else if (res.body.message) msg = res.body.message
      else msg = res.body

      return { err: msg }
    } else {
      return { data: res.body }
    }
  }

  success(res = { body: '' }) {
    return { data: res.body }
  }

  error(message) {
    return { err: message }
  }

  catcher(e = {}) {
    return { err: e.message }
  }
}

export const resp = new Response()
export default resp
