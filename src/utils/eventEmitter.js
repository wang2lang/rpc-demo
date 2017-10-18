export default class EventEmitter {
  constructor() {
    this._events = {}
  }
  on(type, handler) {
    this._events[type] = this._events[type] || []
    this._events[type].push(handler)
  }
  off(type, handler) {
    this._events[type] = this._events[type] || []
    if (!handler) {
      this._events[type] = []
    } else {
      let index = this._events[type].indexOf(handler)
      if (index > -1) {
        this._events[type].splice(index, 1)
      }
    }
  }
  emit(type) {
    const handlers = this._events[type]
    if (!handlers || !handlers.length) {
      return
    }
    var args = Array.prototype.slice.call(arguments, 1)
    handlers.forEach(handler => {
      handler.apply(this, args)
    })
  }
}
