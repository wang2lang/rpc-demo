import { sendRequest } from './client'
import './server'

const $addControl = document.querySelector('#control > .add')
const $reduceControl = document.querySelector('#control > .reduce')

function init() {
  $addControl.addEventListener('click', function () {
    sendRequest('addNum').then(res => {
      console.info(res)
    })
  })

  $reduceControl.addEventListener('click', () => {
    sendRequest('reduceNum').then(res => {
      console.info(res)
    })
  })
}

/**
 * entry point
 */
init()
