/**
 * @param {string} s
 * @return {string}
 */
var longestPalindrome = function (s) {
  if (!s.length || s.length === 1) {
    return s
  }

  if (s.length === 2) {
    return s[0] === s[1] ? s : s[0]
  }
  const res = { 1: s[0] }
  for (let i = 1; i < s.length - 1; i++) {
    let left = i - 1,
      right = i + 1

    //当前的字符处于中间，奇数
    while (left >= 0 && right < s.length) {
      const target = s.slice(left, right + 1)
      if (target !== target.split('').reverse().join('')) {
        break
      }
      res[target.length] = target
      //   res.push(target)
      left--
      right++
    }

    //当前的回文偶数
    ;(left = i), (right = i + 1)
    while (left >= 0 && right < s.length) {
      const target = s.slice(left, right + 1)
      if (target !== target.split('').reverse().join('')) {
        break
      }
      res[target.length] = target
      left--
      right++
    }
  }

  const keys = Object.keys(res)
  return keys.length ? res[keys[keys.length - 1]] : ''
}

console.log(longestPalindrome('cbbd'))
