// while ((line = readline())) {
//   const strs1 = line.split('')
//   const strs2 = readline().split('')
//   const res = getMinLen(strs1, strs2)
// }

const strs1 =
  'zikwvkijajpkaicihcffiemzexmwjjlyrylxcuoewdmpivudhmgkuodjaurazdjnlgtpwz'.split(
    ''
  )
const strs2 =
  'wpnmubqfsnmapqpufmmsphqehjplwjkqspnnpywsvvjilxbcfsrygbelquaalenvkruyltiwqcpdrxgstywaja'.split(
    ''
  )
console.log('====', getMinLen(strs1, strs2))

function getMinLen(arr1, arr2) {
  if (!arr1.length || !arr2.length) {
    return arr1.length || arr2.length
  }
  const res = [...new Array(arr1.length + 1)]
  arr1.forEach((n, index) => {
    res[index] = [...new Array(arr2.length + 1)]
    res[index][0] = index
  })
  res[arr1.length] = [...new Array(arr2.length + 1)]
  res[arr1.length][0] = arr1.length
  arr2.forEach((n, index) => {
    res[0][index] = index
  })

  res[0][arr2.length] = arr2.length

  //   console.log(res)
  for (let i = 1; i <= arr1.length; i++) {
    for (let j = 1; j <= arr2.length; j++) {
      if (arr1[i - 1] == arr2[j - 1]) {
        res[i][j] = res[i - 1][j - 1]
      } else {
        res[i][j] =
          Math.min(res[i - 1][j], res[i][j - 1], res[i - 1][j - 1]) + 1
      }
    }
  }

  return res[arr1.length][arr2.length]
}

// console.log(res)
