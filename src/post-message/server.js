/**
 * iframe container server
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

    window.addEventListener('message', event => {
      var packet = event.data
      event.source.postMessage(server.call(packet), event.origin)
    })
  }
}

export const server = new Server()
server.init(procedures)
