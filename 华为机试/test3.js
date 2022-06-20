function getRes(str) {
  let nums = []
  let chs = []
  let res = ''
  let num = 0

  const arr = str.split('')

  // 1[dhs2[dhjs32[hfjs]]]

  for (let i = 0; i < arr.length; i++) {
    if (/\d+/.test(arr[i])) {
      num = num * 10 + Number(arr[i])
    } else if (arr[i] === '[') {
      nums.push(num)
      num = 0
      chs.push(res)
      res = ''
    } else if (arr[i] === ']') {
      const n = nums.pop()
      res = chs.pop() + res.repeat(n)
    } else {
      res = res + arr[i]
    }

    // if (/\d+/.test(arr[i])) {
    //   num = num * 10 + Number(arr[i])
    // } else if (arr[i] == '[') {
    //   chs.push(res)
    //   res = ''
    //   nums.push(num)
    //   num = 0
    // } else if (arr[i] == ']') {
    //   const n = nums.pop()
    //   res = chs.pop() + res.repeat(n)
    // } else {
    //   res = res + arr[i]
    // }
  }
  console.log(res)
}

getRes('3[k]2[mn]')
