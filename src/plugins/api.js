import Vue from 'vue'
import axios from 'axios'
import store from '@/store'

const baseURL = process.env.VUE_APP_API_URL || 'http://localhost:3333/'

const RETRY = 2

const api = {
  install () {
    const axiosConfig = axios.create({ baseURL })

    axiosConfig.interceptors.request.use(
      (request) => {
        const { token } = store.getters.getUser

        if (token) {
          request.headers.Authorization = `Bearer ${token}`
        }

        return request
      },
      (err) => Promise.reject(err)
    )

    axiosConfig.interceptors.response.use(
      (response) => response,
      (error) => interceptResponseError(error)
    )

    const interceptResponseError = async (error) => {
      if (
        error.config &&
        error.response &&
        error.response.status === 500 &&
        (!error.config.numRetry || error.config.numRetry < RETRY)
      ) {
        error.config.numRetry = !error.config.numRetry
          ? 1
          : ++error.config.numRetry
        return await axiosConfig.request(error.config)
      }

      return Promise.reject(error)
    }

    Vue.prototype.$api = axiosConfig
  }
}

Vue.use(api)
