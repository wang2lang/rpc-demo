import uuid from './uuid-v4'

export class RequestPacket {
  constructor(method, params) {
    this.id = uuid()
    this.method = method
    this.params = params
    this.type = 'request'
  }
}

export class ResponsePacket {
  constructor(id, result, error) {
    this.id = id
    this.result = result
    this.error = error
    this.type = 'response'
  }
}
