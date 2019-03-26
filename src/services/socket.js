import io from 'socket.io-client'
import config from '@/config'

let socket = io(config.socket)

export function getSocket() {
  if (socket.disconnected) {
    return socket.open()
  }
  return socket
}
