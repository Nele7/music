import axios from 'axios'
import { baseURL } from '../config/'

let instance = axios.create({
  baseURL,
  withCredentials: true //关键
})
export default instance