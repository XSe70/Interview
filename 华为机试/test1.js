function isValid(num, strs) {
  strs = strs.map((n) => parseInt(n)).sort((a, b) => a - b)
  let flag = false
  //   for (let i = 0; i < num; i++) {
  //     for (let j = 0; j < num; j++) {
  //       for (let k = 0; k < num; k++) {
  //         const sum = strs[j] + 2 * strs[k]
  //         if (strs[i] === sum && i !== j && i !== j && j !== k) {
  //           console.log(`${strs[i]} ${strs[j]} ${strs[i]}`)
  //           flag = 1
  //         }
  //       }
  //     }
  //   }
  let i = 0
  for (i = 0; i < strs.length - 1; i++) {
    for (j = 0; j < strs.length - 1; j++) {
      if (i == j) {
        continue
      }
      const sum = strs[i] + strs[j] * 2
      if (sum > strs[strs.length - 1]) {
        break
      }
      const max = i > j ? i : j
      for (let k = max + 1; k < strs.length; k++) {
        if (sum == strs[k]) {
          console.log(strs[k] + ' ' + strs[i] + ' ' + strs[j])
          flag = true
          break
        }
      }
      if (flag) {
        break
      }
    }
  }
  if (!flag) {
    console.log(0)
  }
}

isValid(4, [2, 7, 3, 0])
