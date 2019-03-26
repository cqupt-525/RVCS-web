import { notification } from 'antd'
import { getSocket } from '@/services/socket'

export default {
  namespace: 'chat',

  state: {},

  effects: {
    *sendMessage({ payload }, { put }) {
      yield getSocket().emit('chatEvent', payload)
      yield put({
        type: 'pushMessage',
        payload: {
          target: payload.target,
          message: {
            username: payload.source,
            content: payload.message,
          }
        },
      })
    }
  },

  reducers: {
    pushMessage(state, { payload }) {
      const history = state[payload.target] || []
      return {
        ...state,
        [payload.target]: [
          ...history,
          payload.message,
        ]
      }
    }
  },

  subscriptions: {
    newMessage({ dispatch }) {
      getSocket().on('chatEvent', ({ message, source }) => {
        notification.info({
          message: `${source} 发来了新的消息`,
          description: message,
        })
        console.log(11111)
        dispatch({
          type: 'pushMessage',
          payload: {
            target: source,
            message: { username: source, content: message }
          }
        })
      })
    }
  },
}
