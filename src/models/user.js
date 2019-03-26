import { getUserInfo } from '@/services/api'
import { getSocket } from '@/services/socket'

export default {
  namespace: 'user',

  state: {
    id: '',
    username: '',
    email: '',
  },

  effects: {
    *getUserInfo(_, { call, put }) {
      const response = yield call(getUserInfo)
      yield getSocket().emit('start', { username: response.username })
      yield put({
        type: 'querySuccess',
        payload: { ...response },
      })
    },
  },

  reducers: {
    querySuccess(state, { payload }) {
      return {
        ...state,
        ...payload,
      }
    },
  },
}
