/**
 * store datas by closure
 */
var _data = {
  token: '91349b0c45a99fc36cf2',
  num: 0
}
const $container = document.querySelector('#container')

/**
 * server procedures
 */
const procedures = {
  getToken(key) {
    return _data.token
  },
  setData(key, value) {
    _data[key] = value
    return 'set data success!'
  },
  addNum() {
    _data.num = _data.num + 1
    $container.innerHTML = `Current Number: ${_data.num}`
    return _data.num
  },
  reduceNum() {
    _data.num = _data.num - 1
    $container.innerHTML = `Current Number: ${_data.num}`
    return _data.num
  }
 }

export default procedures
