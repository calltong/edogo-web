import redis from 'redis'
import { config } from '../config'
import { helper } from './helper'

class RedisDB {
  async connect() {
    let host = config.redis.host
    let port = config.redis.port
    let password = config.redis.password
    let client
    if (!password) client = redis.createClient(port, host)
    else {
      client = redis.createClient(port, host, {
        password: password,
        tls: {
          servername: host,
        },
      })
    }
    let res
    client.on('connect', function() {
      res = 'connected'
    })

    client.on('error', function() {
      res = 'error'
    })

    for (let index = 0; index < 20; index++) {
      if (res) break
      await helper.sleep(1000)
    }

    this.connection = client
    return res === 'connected'
  }

  process(cmd, params) {
    let client = this.connection
    let res = new Promise(async (resolve) => {
      client.send_command(cmd, params, function(err, data) {
        try {
          err = err === null ? undefined : err
          if (err === undefined && typeof data === 'string') data = JSON.parse(data)
        } catch (e) {}
        resolve({err, data})
      })
    })

    let promise = new Promise((resolve) => {
      res.then(function(data) {
        resolve(data)
      }).catch(function(err) {
        err = err === null ? undefined : err

        resolve({err})
      })
    })

    return promise === null ? undefined : promise
  }

  set(key, item, options = {}) {
    let val = `${JSON.stringify(item)}`

    if (options.expired) return this.connection.set(key, val, 'EX', options.expired)
    else return this.connection.set(key, val)
  }

  async get(key) {
    let client = this.connection
    return new Promise((resolve) => {
      client.get(key, function(err, data) {
        try {
          if (!err) {
            err = undefined
            data = JSON.parse(data)
          }
        } catch (e) { }
        resolve({err, data})
      })
    })
  }

  async addQ(key, item) {
    let val = `${JSON.stringify(item)}`
    let res = await this.process('lpush', [key, val])
    return res
  }

  async getQ(key) {
    // ต้องเป็น [key, 0, -1] หรือเปล่าพี่ถึงจะ get ได้?
    let res = await this.process('lrange', [key, 0, 1])
    let item
    if (res && res.length > 0) {
      try {
        item = JSON.parse(res[0])
      } catch (e) {
        item = res[0]
      }
    } else {
      item = []
    }
    return {data: item}
  }

  async popQ(key) {
    let res = await this.process('rpop', [key])
    return res
  }

  async zupsert(key, item) {
    // remove if exist
    const maxScore = item[0]
    const minScore = item[item.length - 2]
    const removeItem = [key, minScore, maxScore]
    let res = await this.process('zremrangebyscore', removeItem)
    item.unshift(key) // add key to the beginning of item
    res = await this.process('zadd', [ item ])
    return res
  }

  async zrangebyscore(key, item) {
    item.unshift(key) // add key to the beginning of item
    let res = await this.process('zrangebyscore', [item])
    let data = []
    for (var i = 0; i < res.data.length; i++) {
      data.push(JSON.parse(res.data[i]))
    }
    return { data }
  }
}

export const redisdb = new RedisDB()
