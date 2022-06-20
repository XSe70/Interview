/**
 * @param {string} s
 * @return {boolean}
 */
var checkValidString = function (s) {
  const strs = s.split('')
  const left = []
  let right = []
  const len = strs.length
  if (!s.trim()) {
    return true
  }
  for (let i = 0; i < len; i++) {
    const target = strs.shift()
    if (target === '(') {
      left.push(i)
    }
    if (target === '*') {
      right.push(i)
    }

    if (target === ')') {
      if (left.length) {
        left.pop()
      } else if (right.length) {
        right.pop()
      } else {
        return false
      }
    }
  }

  if (left.length && left.length <= right.length) {
    right = right.slice(-left.length)
    for (let index in left) {
      if (left[index] > right[index]) {
        return false
      }
    }
    return true
  } else if (left.length) {
    return false
  }

  return true
}

console.log(
  checkValidString(
    '(((((*(()((((*((**(((()()*)()()()*((((**)())*)*)))))))(())(()))())((*()()(((()((()*(())*(()**)()(())'
  )
)
