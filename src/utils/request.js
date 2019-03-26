import fetch from 'dva/fetch'
import router from 'umi/router'
import hash from 'hash.js'
import { notification } from 'antd'
import { getAuthority } from './authority'

const codeMessage = {
  200: '服务器成功返回请求的数据。',
  201: '新建或修改数据成功。',
  202: '一个请求已经进入后台排队（异步任务）。',
  204: '删除数据成功。',
  400: '发出的请求有错误，服务器没有进行新建或修改数据的操作。',
  401: '用户没有权限（令牌、用户名、密码错误）。',
  403: '用户得到授权，但是访问是被禁止的。',
  404: '发出的请求针对的是不存在的记录，服务器没有进行操作。',
  406: '请求的格式不可得。',
  410: '请求的资源被永久删除，且不会再得到的。',
  422: '当创建一个对象时，发生一个验证错误。',
  500: '服务器发生错误，请检查服务器。',
  502: '网关错误。',
  503: '服务不可用，服务器暂时过载或维护。',
  504: '网关超时。',
}

function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response
  }
  const errortext = codeMessage[response.status] || response.statusText
  notification.error({
    message: `错误 ${response.status}: ${errortext}`,
    description: response.url,
  })
  const error = new Error(errortext)
  error.name = response.status
  error.response = response
  throw error
}

function cachedSave(response, hashcode) {

  /**
   * Clone a response data and store it in sessionStorage
   * Does not support data other than json, Cache only json
   */
  const contentType = response.headers.get('Content-Type')
  if (contentType && contentType.match(/application\/json/i)) {
    // All data is saved as text
    response
      .clone()
      .text()
      .then(content => {
        sessionStorage.setItem(hashcode, content)
        sessionStorage.setItem(`${hashcode}:timestamp`, Date.now())
      })
  }

  return response
}

/**
 * Requests a URL, returning a promise.
 *
 * @param  {string} url       The URL we want to request
 * @param  {object} [options] The options we want to pass to "fetch"
 * @return {object}           An object containing either "data" or "err"
 */
export default function request(url, options) {
  const newOptions = {
    expirys: false,
    headers: {},
    ...options,
  }

  /**
   * Add request headers
   */
  const token = getAuthority()
  if (token) {
    newOptions.headers['Authorization'] = `Bearer ${token}`
  }
  if (
    newOptions.method === 'POST' ||
    newOptions.method === 'PUT' ||
    newOptions.method === 'DELETE'
  ) {
    newOptions.headers['Accept'] = 'application/json'
    if (!(newOptions.body instanceof FormData)) {
      newOptions.headers['Content-Type'] = 'application/json; charset=utf-8'
      newOptions.body = JSON.stringify(newOptions.body)
    }
  }

  /**
   * Produce fingerprints based on url and parameters
   * Maybe url has the same parameters
   */
  const fingerprint = url + (newOptions.body ? JSON.stringify(newOptions.body) : '')
  const hashcode = hash
    .sha256()
    .update(fingerprint)
    .digest('hex')

  const expirys = newOptions.expirys && 60
  // options.expirys !== false, return the cache
  if (expirys) {
    const cached = sessionStorage.getItem(hashcode)
    const whenCached = sessionStorage.getItem(`${hashcode}:timestamp`)
    if (cached !== null && whenCached !== null) {
      const age = (Date.now() - whenCached) / 1000
      if (age < expirys) {
        const response = new Response(new Blob([cached]))
        return response.json()
      }
      sessionStorage.removeItem(hashcode)
      sessionStorage.removeItem(`${hashcode}:timestamp`)
    }
  }

  return fetch(url, newOptions)
    .then(checkStatus)
    .then(response => cachedSave(response, hashcode))
    .then(response => {
      // DELETE and 204 do not return data by default
      // using .json will report an error.
      if (newOptions.method === 'DELETE' || response.status === 204) {
        return response.text()
      }
      return response.json()
    })
    .catch(err => {
      const status = err.name
      if (status === 401) {
        window.g_app._store.dispatch({ type: 'login/logout' })
        return
      }
      if (status === 403) {
        router.push('/error/403')
        return
      }
      if (status >= 404 && status < 422) {
        router.push('/error/404')
        return
      }
      if (status >= 500 && status <= 504) {
        router.push('/error/500')
        return
      }
    })
}
