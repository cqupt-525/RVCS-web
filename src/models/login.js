import { routerRedux } from 'dva/router'
import { stringify } from 'qs'
import { getPageQuery } from '@/utils/utils'
import { setAuthority } from '@/utils/authority'
import { reloadAuthorized } from '@/utils/authorized'
import { accountLogin } from '@/services/api'

export default {
  namespace: 'login',

  state: {
    status: undefined,
  },

  effects: {
    *login({ payload }, { call, put }) {
      const { autoLogin, ...condition } = payload
      const response = yield call(accountLogin, condition)
      yield put({
        type: 'changeLoginStatus',
        payload: {
          ...response,
          saveLocal: autoLogin,
        },
      })
      if (response.status === 'ok') {
        reloadAuthorized()
        const urlParams = new URL(window.location.href)
        const params = getPageQuery()
        let { redirect } = params
        if (redirect) {
          const redirectUrlParams = new URL(redirect)
          if (redirectUrlParams.origin === urlParams.origin) {
            redirect = redirect.substr(urlParams.origin.length)
            if (redirect.match(/^\/.*#/)) {
              redirect = redirect.substr(redirect.indexOf('#') + 1)
            }
          } else {
            window.location.href = redirect
            return
          }
        }
        yield put(routerRedux.replace(redirect || '/'))
      }
    },
    *logout(_, { put }) {
      yield put({
        type: 'changeLoginStatus',
        payload: {
          token: '',
          saveLocal: true,
          status: false,
        },
      })
      reloadAuthorized()
      yield put(
        routerRedux.replace({
          pathname: '/login',
          search: stringify({
            redirect: window.location.href,
          }),
        })
      )
    },
  },

  reducers: {
    changeLoginStatus(state, { payload }) {
      const { token, saveLocal, status } = payload
      setAuthority(token, saveLocal)
      return {
        ...state,
        status,
      }
    },
  },
}
