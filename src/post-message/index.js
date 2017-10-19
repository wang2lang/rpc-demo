import { sendRequest } from './client'

const $addControl = document.querySelector('#control > .add')
const $reduceControl = document.querySelector('#control > .reduce')

function init() {
  $addControl.addEventListener('click', async function () {
    var res = await sendRequest('addNum')
    console.log(res)
  })

  $reduceControl.addEventListener('click', async function () {
    var res = await sendRequest('reduceNum')
    console.info(res)
  })
}

/**
 * entry point
 */
init()
