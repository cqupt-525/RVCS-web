import { accountRegister } from '@/services/api'

export default {
  namespace: 'register',

  state: {
    status: undefined,
  },

  effects: {
    *submit({ payload }, { call, put }) {
      const response = yield call(accountRegister, payload)
      yield put({
        type: 'registerHandle',
        payload: response,
      })
    },
  },

  reducers: {
    initStatus() {
      return {
        status: undefined,
      }
    },
    registerHandle(state, { payload }) {
      return {
        ...state,
        ...payload,
      }
    },
  },
}
