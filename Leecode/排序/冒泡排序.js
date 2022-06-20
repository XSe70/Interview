/**
 *
 * @param {} arr
 * 使用了贪心算法的思想
 * 最大的往后放
 */

function sort(arr) {
  for (let i = 0; i < arr.length - 1; i++) {
    for (let j = 0; j < arr.length - i - 1; j++) {
      if (arr[j] > arr[j + 1]) {
        const flag = arr[j + 1]
        arr[j] = arr[j + 1]
        arr[j + 1] = flag
      }
    }
  }
}
