import { notification } from 'antd'
import { getFriendsList } from '@/services/api'
import { getSocket } from '@/services/socket'

export default {
  namespace: 'friends',

  state: {
    friends: [],
  },

  effects: {
    *getFriendsList(_, { call, put }) {
      const response = yield call(getFriendsList)
      yield put({
        type: 'querySuccess',
        payload: { ...response },
      })
    },
    *addFriend({ payload }) {
      yield getSocket().emit('addFriend', payload)
    },
  },

  reducers: {
    querySuccess(state, { payload }) {
      return {
        ...state,
        ...payload,
      }
    },
    pushFriend(state, { payload }) {
      return {
        ...state,
        friends: [
          ...state.friends,
          payload,
        ],
      }
    },
  },

  subscriptions: {
    addFriend({ dispatch }) {
      getSocket().on('addFriend', data => {
        notification.info({
          message: `您已添加的好友: ${data.username}`,
        })
        dispatch({
          type: 'pushFriend',
          payload: data,
        })
      })
    }
  },
}
