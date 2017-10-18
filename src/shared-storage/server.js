/**
 * tab page server
 */

import Rpc from '../utils/rpc'
import procedures from '../utils/procedures'
import { sendStorageMessage, getStorageMessage } from '../utils/storage-message'

class Server extends Rpc {
  constructor() {
    super()
  }

  init(procedures) {
    Object.keys(procedures).forEach(key => {
      this.add(key, procedures[key])
    })
  }
}

export const server = new Server()
server.init(procedures)

window.addEventListener('storage', event => {
  var packet = getStorageMessage(event, '_rpcServerPacket')
  if (packet) {
    sendStorageMessage('_rpcClientPacket', server.call(packet))
  }
})
