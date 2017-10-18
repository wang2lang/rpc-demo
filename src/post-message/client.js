/**
 * iframe client
 */
import { RequestPacket } from '../utils/packet'
var _requests = {}
const iframeWindow = document.querySelector('#iframe').contentWindow

window.addEventListener('message', function (event) {
  const { result, error, id } = event.data
  if (error) {
    _requests[id].reject(error)
  } else {
    _requests[id].resolve(result)
  }
  delete _requests[id]
}, true)

export function sendRequest(method, params) {
  const packet = new RequestPacket(method, params)
  const { id } = packet
  return new Promise(function (resolve, reject) {
    iframeWindow.postMessage(packet, '*')
    _requests[id] = { resolve, reject }
  })
}
