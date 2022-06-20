function getMaxLength(strs) {
  let arr = strs.split(',')
  if (!strs.length || strs.length <= 2) {
    return 1
  }
  let res = {}
  const start = arr.indexOf('1')
  if (arr[0] === '0' && start > -1) {
    res[start] = [0, start]
    arr.splice(0, start - 1)
  } else if (arr[0] === '0' && start <= -1) {
    return Math.floor(arr.length)
  }
  //开头都是1了
  while (arr.length && arr.length >= 2) {
    const end = arr.slice(1).indexOf('1')
    if (end > -1) {
      res[(end + 1) / 2 > 1 ? Math.floor((end + 1) / 2) : 1] = [0, end]
      arr = end + 1 > arr.length ? [] : arr.slice(end + 1)
    } else {
      res[arr.length - 1] = [0, arr.length, 0]
      break
    }
  }

  console.log(res, strs.split(',').length)

  return Math.max(...Object.keys(res))
}

console.log(getMaxLength('0,0,1,1,1,1,1,1,1,1,1'))
