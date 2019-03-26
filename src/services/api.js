import request from '@/utils/request'
import config from '@/config'

export async function accountLogin(params) {
  return request(`${config.domain}/api/user/login`, {
    method: 'POST',
    body: params,
  })
}
export async function accountRegister(params) {
  return request(`${config.domain}/api/user/register`, {
    method: 'POST',
    body: params,
  })
}
export async function getUserInfo() {
  return request(`${config.domain}/api/user/getInfo`)
}
export async function updateUserInfo(params) {
  return request(`${config.domain}/api/user/updateInfo`, {
    method: 'POST',
    body: params,
  })
}
export async function getFriendsList() {
  return request(`${config.domain}/api/user/getFriendsList`)
}
