import axios from 'axios'

const axiosConfig = axios.create({
    baseURL: 'http://localhost:8000/'
})

axiosConfig.interceptors.request.use(function (config) {
    return config;
  }, function (error) {
    return Promise.reject(error);
  });

export default axiosConfig