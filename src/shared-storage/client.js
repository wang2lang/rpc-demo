/**
 * tab page client
 */
import { RequestPacket } from '../utils/packet'
import { sendStorageMessage, getStorageMessage } from '../utils/storage-message.js'
var _requests = {}

window.addEventListener('storage', function (event) {
  var packet = getStorageMessage(event, '_rpcClientPacket')
  if (packet) {
    const { result, error, id } = packet
    if (error) {
      _requests[id].reject(error)
    } else {
      _requests[id].resolve(result)
    }
    delete _requests[id]
  }
}, true)

export function sendRequest(method, params) {
  const packet = new RequestPacket(method, params)
  const { id } = packet
  return new Promise(function (resolve, reject) {
    sendStorageMessage('_rpcServerPacket', packet)
    _requests[id] = { resolve, reject }
  })
}
