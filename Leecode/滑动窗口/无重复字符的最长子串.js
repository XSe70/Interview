/**
 * @param {string} s
 * @return {number}
 *
 * 通过obj这个对象，来存储和当前right的字符相同的最近的index，
 * 将index和当前的left比较，更新left=大的那个值
 */
var lengthOfLongestSubstring = function (s) {
  let max = 0
  const obj = {}
  for (let l = 0, r = 0; r < s.length; r++) {
    l = Math.max(typeof obj[s[r]] === 'number' ? obj[s[r]] + 1 : 0, l)
    if (s.slice(l, r + 1).length > max) {
      max = s.slice(l, r + 1).length
    }
    obj[s[r]] = r
  }

  return max
}

console.log(lengthOfLongestSubstring('abcabcbb'))
