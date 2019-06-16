import axios from './request'
import qs from 'qs'
class ApiService {
  constructor() {

  }
  createHttps(type, url, params) {
    let config = {
      method: type,
      url
    }
    if (type === 'get') {
      config.params = params
    } else {
      config.data = qs.stringify(params)
    }
    return new Promise((resolve, reject) => {
      axios(config).then((res) => {
        resolve(res.data)
      }).catch((err) => {
        reject(err)
      })
    })
  }
  get(url, params = {}) {
    return this.createHttps('get', url, params)
  }
  post(url, params = {}) {
    return this.createHttps('post', url, params)
  }
}
export const apiServer = new ApiService()