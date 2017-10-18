/**
 * simulant-client server
 */

import Rpc from '../utils/rpc'
import procedures from '../utils/procedures'

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

window.__send_to_server = (packet) => {
  window.__send_to_client(server.call(packet))
}
