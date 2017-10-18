/**
 * simulant-webview client
 */
import { RequestPacket } from '../utils/packet'
var _requests = {}

window.__send_to_client = (packet) => {
  const { result, error, id } = packet
  if (error) {
    _requests[id].reject(error)
  } else {
    _requests[id].resolve(result)
  }
}

export function sendRequest(method, params) {
  const packet = new RequestPacket(method, params)
  const { id } = packet
  return new Promise(function (resolve, reject) {
    _requests[id] = { resolve, reject }
    window.__send_to_server(packet)
  })
}
