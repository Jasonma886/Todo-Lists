export const stamp2Time = function (time) {
  let result
  if (typeof time === 'number') {
    time = new Date(time)
  } else {
    time = new Date()
  }
  result = `${time.getFullYear()}-${time.getMonth() + 1}-${time.getDate()} ${time.getHours()}:${time.getMinutes()}:${time.getSeconds()}`
  return result
}
