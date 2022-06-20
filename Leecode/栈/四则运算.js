/**
 * 
描述
输入一个表达式（用字符串表示），求这个表达式的值。
保证字符串中的有效字符包括[‘0’-‘9’],‘+’,‘-’, ‘*’,‘/’ ,‘(’， ‘)’,‘[’, ‘]’,‘{’ ,‘}’。且表达式一定合法。

数据范围：表达式计算结果和过程中满足 |val| \le 1000 \∣val∣≤1000  ，字符串长度满足 1 \le n \le 1000 \1≤n≤1000 

输入描述：
输入一个算术表达式

输出描述：
得到计算结果

示例1
输入：
3+2*{1+2*[-4/(8-6)+7]}
复制
输出：
25
*/

// while ((line = readline())) {
const arr = '5-3+9*6*(6-10-2)'.split(/(\d+)|([^\d]{1})/).filter((n) => n)
console.log('00000', arr)
console.log(getCalcData(arr))
// }

function getCalcData(arr) {
  if (!arr.length) {
    return 0
  }

  const queueOp = []
  const queueNum = []

  while (arr.length) {
    //3+2*{1+2*[-4/(8-6)+7]}
    const target = arr.shift()
    if (isNum(target)) {
      queueNum.push(target)
    } else if (target === '[' || target === '{' || target === '(') {
      if ((arr.length && arr[0] === '+') || (arr.length && arr[0] === '-')) {
        const [ch1, ch2] = arr.splice(0, 2)
        queueNum.push(ch1 + ch2)
      }
      queueOp.push(target)
    } else if (isEnd(target)) {
      // 判断是否是与之对应的括号，如果不是，就一直+-*/计算，
      // 直到遇到对应的括号，并清空，再继续看下一个节点
      // 只要优先级大，就入栈，不然就先出栈计算，然后继续比较，以直到大于入栈
      // 2+3*5+(10+8*6)
      let op = queueOp.pop()
      while (getOpen(target) !== op) {
        const [pre, aft] = queueNum.splice(-2, 2)
        queueNum.push(calcRes(pre, aft, op))
        op = queueOp.pop()
      }
    } else {
      // 只要优先级大，就入栈，不然就先出栈计算，然后继续比较，以直到大于入栈
      // 2+3*5+(10+8*6)
      while (!compare(target, queueOp[queueOp.length - 1])) {
        const op = queueOp.pop()
        const [pre, aft] = queueNum.splice(-2, 2)
        queueNum.push(calcRes(pre, aft, op))
      }
      queueOp.push(target)
    }
  }

  console.log('=====', queueNum, queueOp)
  if (queueNum.length === 1) {
    return queueNum[0]
  }
  let op = ''
  while ((op = queueOp.pop())) {
    const [pre, aft] = queueNum.splice(-2, 2)
    queueNum.push(calcRes(pre, aft, op))
    console.log('====11=', queueNum, queueOp)
  }

  return queueNum[0]
}

function calcRes(pre, aft, op) {
  console.log('mmmmmmmm', pre, op, aft)
  switch (op) {
    case '+':
      return Number(pre) + Number(aft)
    case '-':
      return Number(pre) - Number(aft)
    case '*':
      return Number(pre) * Number(aft)
    case '/':
      return Number(pre) / Number(aft)
  }
}

function compare(current, top) {
  switch (current) {
    case '+':
    case '-':
      return top !== '*' && top !== '/' && top !== '-' && top !== '+'
        ? true
        : false
    case '*':
    case '/':
      return true
    default:
      return true
  }
}

function isNum(val) {
  return /^\d+$/.test(val)
}
function isEnd(val) {
  return val === '}' || val === ']' || val === ')'
}

function getOpen(val) {
  switch (val) {
    case '}':
      return '{'
    case ')':
      return '('
    case ']':
      return '['
  }
}
