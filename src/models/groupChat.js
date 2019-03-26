import { getSocket } from '@/services/socket'

export default {
  namespace: 'groupChat',

  state: {

  },

  effects: {
    
  },

  reducers: {
    
  },

  subscriptions: {
    newMessage() {
      getSocket().on('newGroupMessage', data => {
        console.log(data)
      })
    }
  },
}
