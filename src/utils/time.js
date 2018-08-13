// 每小时毫秒数
export const HOUR = 60 * 60 * 1000

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

// 一天时刻表
export const timesList = (function () {
  let arr = []
  for (let i = 8; i < 24; i++) {
    arr.push({
      value: i + ': 00',
      stamp: i * HOUR
    })
    arr.push({
      value: i + ': 30',
      stamp: (i + 0.5) * HOUR
    })
  }
  return arr
})()

export const datesList = (function (start = -5, end = 6) {
  let time = +new Date()
  let result = []
  const millisecond = 24 * HOUR
  for (let i = start; i < end; i++) {
    let temp = new Date(time + millisecond * i)
    let year = temp.getFullYear()
    let month = temp.getMonth() + 1
    let date = temp.getDate()
    result.push({
      value: `${month}月${date}日`,
      stamp: +new Date(`${year}.${month}.${date}`)
    })
  }
  return result
})()
