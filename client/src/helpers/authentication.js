import axios from "axios";
import configBase from "../config";

const baseURL = `${configBase.RAILS_API_BASE_URL}/`;

export const axiosInstance = axios.create({
  baseURL
});

export const isAuthenticated = () => {
  if (window.localStorage.getItem("token")) {
    return true;
  }
  return false;
};

export class Api {
  static config() {
    try {
      const token = window.localStorage.getItem("jwt-token");
      return (
        token && {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );
    } catch (e) {
      return null;
    }
  }

  static get(url, params, conf) {
    const headers = this.config();
    const config = { ...headers, params, ...conf };
    return axiosInstance.get(url, config);
  }

  static post(url, data, conf) {
    const headers = this.config();
    const config = { ...headers, ...conf };
    return axiosInstance.post(url, data, config);
  }

  static put(url, data, conf) {
    const headers = this.config();
    const config = { ...headers, ...conf };
    return axiosInstance.put(url, data, config);
  }

  static delete(url, conf) {
    const headers = this.config();
    const config = { ...headers, ...conf };
    return axiosInstance.delete(url, config);
  }
}
