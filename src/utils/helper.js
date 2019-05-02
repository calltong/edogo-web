
export class Helper {
  sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms))
  }

  isNull(val) {
    return val === null || val === undefined
  }

  notNull(val) {
    return val !== null && val !== undefined
  }

  isValue(val) {
    return val !== null && val !== undefined && val !== ''
  }

  notValue(val) {
    return val === null || val === undefined || val === ''
  }

  async checkValue({ item, valid, list }) {
    let invalid = false
    console.log('item:', item)
    for (let it of list) {
      if (this.notValue(item[it])) {
        invalid = true
        valid[it] = true
      } else {
        valid[it] = false
      }
    }

    return { invalid, data: valid }
  }
}

export const helper = new Helper()
export default helper
