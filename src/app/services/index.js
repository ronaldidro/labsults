import axios from 'axios'

const apiConfig = axios.create({ baseURL: '/api' })

const request = (options = {}) => apiConfig.request({ ...options })

export default request
