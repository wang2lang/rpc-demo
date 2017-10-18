import { isObject, isArray } from './help'
import { ResponsePacket } from './packet'

export default class Rpc {
  constructor() {
    this.procedures = {}
  }

  add(key, cb) {
    this.procedures[key] = cb
  }

  call(packet) {
    const { method, params, id } = packet
    const _params = parse(params)
    const _method = this.procedures[method]
    return _method
      ? new ResponsePacket(id, _method(..._params), null)
      : new ResponsePacket(id, null, `Cannot find method ${method} in server procedures!`)
  }

}

function parse(params) {
  return isObject(params)
    ? Object.values(params)
    : isArray(params)
      ? params
      : [ params ]
}
