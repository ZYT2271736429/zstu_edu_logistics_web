import axios from 'axios'
import { Message } from 'element-ui'

// 请求拦截器
axios.interceptors.request.use(config => {
  // 如果存在token,请求携带这个token
  if (window.sessionStorage.getItem('tokenStr')) {
    config.headers.Authorization = window.sessionStorage.getItem('tokenStr')
  }
  config.headers['Content-Type'] = 'application/json;charset=UTF-8'
  return config
}, error => {
  console.log(error)
})

// 响应拦截器
axios.interceptors.response.use(success => {
  // 业务逻辑错误
  // eslint-disable-next-line eqeqeq
  if (success.status && success.status == 200) {
    // eslint-disable-next-line eqeqeq
    if (success.status && success.status == 500) {
      Message.error({ message: success.data.msg })
      return
    }
    if (success.data.msg) {
      Message.success({ message: success.data.msg })
    }
  }
  return success.data
// eslint-disable-next-line handle-callback-err
}, error => {
  // eslint-disable-next-line eqeqeq
/*  if (error.response.status == 504 || error.response.status == 404) {
    Message.error({ message: '服务器被吃了( ╯□╰ )' })
    // eslint-disable-next-line eqeqeq
  } else if (error.response.status == 403) {
    Message.error({ message: '权限不足，请联系管理员' })
    // eslint-disable-next-line eqeqeq
  } else if (error.response.status == 401) {
    Message.error({ message: error.response.data.msg ? error.response.data.msg : '尚未登录，请登录' })
    router.replace('/')
  } else {
    if (error.response.data.msg) {
      Message.error({ message: error.response.data.msg })
    } else {
      Message.error({ message: '未知错误!' })
    }
  } */
})

const base = 'http://localhost:8080'

/* export const postKeyValueRequest = (url, params) => {
  return axios({
    method: 'post',
    url: `${base}${url}`,
    data: params,
    transformRequest: [function (data) {
      let ret = ''
      for (const i in data) {
        ret += encodeURIComponent(i) + '=' + encodeURIComponent(data[i]) + '&'
      }
      return ret
    }],
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  })
} */
export const postRequest = (url, params) => {
  return axios({
    method: 'post',
    url: `${base}${url}`,
    data: params
  })
}
export const getRequest = (url, params) => {
  return axios({
    method: 'get',
    url: `${base}${url}`,
    data: params
  })
}
/* export const putRequest = (url, params) => {
  return axios({
    method: 'put',
    url: `${base}${url}`,
    data: params
  })
} */
/* export const deleteRequest = (url, params) => {
  return axios({
    method: 'delete',
    url: `${base}${url}`,
    params: params
  })
} */
