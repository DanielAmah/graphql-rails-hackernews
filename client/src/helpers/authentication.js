import axios from 'axios'
import { config } from '../config';
const jwtDecode = require('jwt-decode');

const baseURL =  `${config.RAILS_API_BASE_URL}/`;

export const axiosInstance = axios.create({
  baseURL: baseURL
});

export const isAuthenticated = (props) => {
  if(window.localStorage.getItem("jwt-token")){
    const token = window.localStorage.getItem("jwt-token")
    try {
      jwtDecode(token, {header: true})
      return true
    } catch(error) {
      return false
    }
    }else {
     return false
    }

}

export class Api {

  static config() {
    try {
      const token = window.localStorage.getItem('jwt-token')
      return(
        token && {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      )
    }
    catch(e){
      return null
    }
  }

  static get(url, params, conf) {
    const headers = this.config()
    const config = { ...headers, params, ...conf }
    return axiosInstance.get(url, config)
  }

  static post(url, data, conf) {
    const headers = this.config()
    const config = { ...headers, ...conf }
    return axiosInstance.post(url, data, config)
  }

  static put(url, data, conf) {
    const headers = this.config()
    const config = { ...headers, ...conf }
    return axiosInstance.put(url, data, config)
  }

  static delete(url, conf) {
    const headers = this.config()
    const config = { ...headers, ...conf }
    return axiosInstance.delete(url, config)
  }
}
